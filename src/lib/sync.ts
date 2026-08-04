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
async function deliverTask(task: SyncTask): Promise<boolean> {
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

    let token = getAuthToken() || localStorage.getItem('authToken');
    let res = await makeFetch(token);

    if (res.ok) return true;

    // If 401 Unauthorized, try to refresh ID token once (if firebase auth is available)
    if (res.status === 401) {
      try {
        if (auth && (auth as any).currentUser) {
          const refreshed = await (auth as any).currentUser.getIdToken(true);
          if (refreshed) {
            setAuthToken(refreshed);
            // retry once with refreshed token
            res = await makeFetch(refreshed);
            if (res.ok) return true;
          }
        }
      } catch (err) {
        console.warn('Failed to refresh ID token after 401', err);
      }
      // If we got a 401 and refresh didn't help, treat as transient to retry later
      const text401 = await res.text().catch(() => '');
      console.warn('Sync task unauthorized after refresh; will retry later', res.status, text401);
      return false;
    }

    // For client errors (4xx) except 429 Too Many Requests, treat as non-retriable and drop the task
    if (res.status >= 400 && res.status < 500 && res.status !== 429) {
      const text = await res.text().catch(() => '');
      console.warn('Sync task dropped due to client error', res.status, text);
      return true; // mark as success so it is removed from queue
    }

    const text = await res.text().catch(() => '');
    console.warn('Sync task delivery failed, will retry', res.status, text);
    return false;
  } catch (err) {
    // network or other unexpected error - keep for retry
    // keep console logging for debugging
    // eslint-disable-next-line no-console
    console.warn('Sync deliverTask network error or exception', err);
    return false;
  }
}

let processing = false;

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

export function enqueueSync(task: Omit<SyncTask, 'attempts' | 'createdAt' | 'lastAttemptAt'>) {
  const q = readQueue();
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

async function processQueue() {
  if (processing) return;
  processing = true;
  try {
    let q = readQueue();
    if (!q.length) return;
    // iterate copy to allow mutation
    for (let i = 0; i < q.length; i++) {
      const task = q[i];
      // skip tasks that exceeded attempts
      if ((task.attempts || 0) >= MAX_ATTEMPTS) continue;

      // attempt delivery
      task.attempts = (task.attempts || 0) + 1;
      task.lastAttemptAt = new Date().toISOString();
      writeQueue(q);

      const ok = await deliverTask(task).catch(() => false);
      if (ok) {
        // remove task from queue
        q = readQueue().filter((t) => t.id !== task.id || t.createdAt !== task.createdAt);
        writeQueue(q);
        notifyPending();
        // continue to next
        i--; // because queue shrank
        continue;
      } else {
        // schedule next attempt with backoff
        const delay = nextBackoff(task.attempts || 1);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  } finally {
    processing = false;
    notifyPending();
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

function stopSyncLoop() {
  if (loopHandle != null) {
    clearInterval(loopHandle);
    loopHandle = null;
  }
}

function getQueue(): SyncTask[] {
  return readQueue();
}
