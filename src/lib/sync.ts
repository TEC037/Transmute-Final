// Minimal sync queue scaffold (offline-first).
// - Persists the queue in localStorage (simple, no external deps).
// - expose enqueueSync(task) to add jobs.
// - startSyncLoop() will try to deliver jobs using a server-side endpoint (/api/sync).
// The server should accept the task payload and perform Firestore writes using admin credentials.

import { auth } from './firebase';
import { getAuthToken, setAuthToken } from './authToken';

type SyncTask = {
  id: string; // unique id (e.g. habit-123 or user-uid + ts)
  entity: 'habit' | 'user' | string;
  action: 'create' | 'update' | 'delete' | string;
  payload: any | null;
  attempts?: number;
  createdAt?: string;
  lastAttemptAt?: string | null;
};

type DeliveryResult = 'ok' | 'retry' | 'drop';

const STORAGE_KEY = 'transmute_sync_queue_v1';
const MAX_ATTEMPTS = 6;
const BASE_DELAY_MS = 1000; // base for exponential backoff

function readQueue(): SyncTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SyncTask[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(q: SyncTask[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(q));
  } catch {
    // ignore storage errors in low-space environments
  }
}

function nextBackoff(attempts = 0) {
  // jittered exponential backoff
  const base = Math.min(30, Math.pow(2, attempts)) * BASE_DELAY_MS;
  const jitter = Math.floor(Math.random() * BASE_DELAY_MS);
  return base + jitter;
}

// Deliverer: POST to server-side endpoint /api/sync which should perform Firestore operations
async function deliverTask(task: SyncTask): Promise<DeliveryResult> {
  try {
    const url = '/api/sync';

    const makeFetch = async (token?: string) => {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(task),
        credentials: 'include',
      });
    };

    let token = getAuthToken();
    let res = await makeFetch(token);

    if (res.ok) return 'ok';

    // If 401 Unauthorized, try to refresh ID token once (if firebase auth is available)
    if (res.status === 401) {
      try {
        const user = auth?.currentUser;
        if (user) {
          const refreshed = await user.getIdToken(true);
          if (refreshed) {
            setAuthToken(refreshed);
            // retry once with refreshed token
            res = await makeFetch(refreshed);
            if (res.ok) return 'ok';
          }
        }
      } catch (err) {
        console.warn('Failed to refresh ID token after 401', err);
      }
      // If we got a 401 and refresh didn't help, treat as transient to retry later
      const text401 = await res.text().catch(() => '');
      console.warn('Sync task unauthorized after refresh; will retry later', res.status, text401);
      return 'retry';
    }

    // 429 and 5xx are transient: keep the task and retry with backoff.
    if (res.status === 429 || res.status >= 500) {
      const text = await res.text().catch(() => '');
      console.warn('Sync task delivery failed, will retry', res.status, text);
      return 'retry';
    }

    // Other 4xx are permanent client errors: evict the task (never block the
    // queue) but surface it so the caller can warn the user.
    const text = await res.text().catch(() => '');
    console.warn('Sync task rejected as invalid, dropping', res.status, text);
    return 'drop';
  } catch (err) {
    // network or other unexpected error - keep for retry
    // keep console logging for debugging
    // eslint-disable-next-line no-console
    console.warn('Sync deliverTask network error or exception', err);
    return 'retry';
  }
}

let processing = false;
let retryHandle: ReturnType<typeof setTimeout> | null = null;

export type SyncPendingListener = (pending: number) => void;
const pendingListeners = new Set<SyncPendingListener>();

export function getSyncPending(): number {
  return readQueue().length;
}

function notifyPending() {
  const pending = getSyncPending();
  pendingListeners.forEach((cb) => {
    try {
      cb(pending);
    } catch {
      // ignore listener errors
    }
  });
}

// Subscribe to sync queue changes (for skeleton/loading UI).
export function subscribeSyncPending(cb: SyncPendingListener): () => void {
  pendingListeners.add(cb);
  cb(getSyncPending());
  return () => {
    pendingListeners.delete(cb);
  };
}

export type SyncDroppedListener = (task: SyncTask, reason: string) => void;
const droppedListeners = new Set<SyncDroppedListener>();

function notifyDropped(task: SyncTask, reason: string) {
  droppedListeners.forEach((cb) => {
    try {
      cb(task, reason);
    } catch {
      // ignore listener errors
    }
  });
}

// Surface permanently-rejected tasks (e.g. 403 while signed out) so the UI
// can warn the user instead of losing their change silently.
export function subscribeSyncDropped(cb: SyncDroppedListener): () => void {
  droppedListeners.add(cb);
  return () => {
    droppedListeners.delete(cb);
  };
}

export function enqueueSync(task: Omit<SyncTask, 'attempts' | 'createdAt' | 'lastAttemptAt'>) {
  // Guard against malformed tasks (e.g. user updates with no uid while logged
  // out) that would otherwise be written as docId "undefined" and rejected.
  if (!task.id) {
    console.warn('sync: task without id ignored', task);
    return;
  }
  // Coalesce: a newer task for the same entity+id supersedes the previous one.
  // Rapid toggles (complete/undo/complete) collapse to a single delivery, and
  // a pending delete followed by an undo (re-create) keeps only the create.
  let q = readQueue().filter((t) => !(t.entity === task.entity && t.id === task.id));
  const enqueued: SyncTask = {
    ...task,
    attempts: 0,
    createdAt: new Date().toISOString(),
    lastAttemptAt: null,
  };
  q.push(enqueued);
  writeQueue(q);
  notifyPending();
  // start processor (async, non-blocking)
  void processQueue();
}

function scheduleRetry(delay: number) {
  if (retryHandle != null) clearTimeout(retryHandle);
  retryHandle = setTimeout(() => {
    retryHandle = null;
    void processQueue();
  }, delay);
}

async function processQueue() {
  if (processing) return;
  processing = true;
  try {
    for (;;) {
      let q = readQueue();
      if (!q.length) return;
      const task = q[0];

      // Evict tasks that exhausted their retries so they can't wedge the queue.
      if ((task.attempts || 0) >= MAX_ATTEMPTS) {
        q = q.slice(1);
        writeQueue(q);
        notifyPending();
        continue;
      }

      task.attempts = (task.attempts || 0) + 1;
      task.lastAttemptAt = new Date().toISOString();
      writeQueue(q);

      const result = await deliverTask(task);

      // The queue may have changed while awaiting delivery.
      q = readQueue();
      if (!q.some((t) => t.id === task.id && t.createdAt === task.createdAt)) continue;

      if (result === 'ok') {
        q = q.filter((t) => !(t.id === task.id && t.createdAt === task.createdAt));
        writeQueue(q);
        notifyPending();
        continue;
      }

      if (result === 'drop') {
        q = q.filter((t) => !(t.id === task.id && t.createdAt === task.createdAt));
        writeQueue(q);
        notifyPending();
        notifyDropped(task, `La sincronización no pudo aplicar un cambio (${task.entity}).`);
        continue;
      }

      // Transient failure: stop blocking the rest of the queue and retry the
      // whole queue later with backoff (non-blocking).
      scheduleRetry(nextBackoff(task.attempts || 1));
      return;
    }
  } finally {
    processing = false;
    notifyPending();
    // Lost-wakeup guard: pick up tasks enqueued while this pass was running.
    if (readQueue().length > 0 && retryHandle == null) {
      void processQueue();
    }
  }
}

// Lightweight loop to periodically try again (in case of transient failures)
let loopHandle: number | null = null;

// Probe the API before delivering so we don't hammer the proxy while the
// backend is still booting (dev:full starts Vite and the API in parallel).
async function isApiAvailable(timeoutMs = 3000): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch('/api/health', { signal: ctrl.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

export function startSyncLoop(intervalMs = 30_000) {
  if (loopHandle != null) return;
  loopHandle = window.setInterval(async () => {
    // Only probe the API when there is something queued to deliver.
    // This avoids pointless proxy requests (and Vite proxy errors) when idle.
    if (readQueue().length > 0 && (await isApiAvailable())) {
      await processQueue();
    }
  }, intervalMs);
  // Delay the first attempt so the backend has time to finish booting.
  setTimeout(async () => {
    if (readQueue().length > 0 && (await isApiAvailable())) {
      await processQueue();
    }
  }, 3000);
}
