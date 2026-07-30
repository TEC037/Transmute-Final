// Minimal sync queue scaffold (offline-first).
// - Persists the queue in localStorage (simple, no external deps).
// - expose enqueueSync(task) to add jobs.
// - startSyncLoop() will try to deliver jobs using a provided deliverer (stub).
// Replace the deliverer implementation with Firestore / your backend SDK.

export type SyncTask = {
  id: string; // unique id (e.g. habit-123 or user-uid + ts)
  entity: 'habit' | 'user' | 'card' | 'shop' | string;
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

// Simple pluggable deliverer: replace with Firestore / HTTP calls.
async function deliverTask(task: SyncTask): Promise<boolean> {
  // TODO: Replace this stub with real sync:
  // - Firestore: doc(...).set/merge/delete
  // - OR call your API endpoint with fetch and auth
  // For now, simulate success after a short delay.
  await new Promise((r) => setTimeout(r, 200));
  // Return true = success, false = transient failure
  return true;
}

let processing = false;

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
  // start processor (async, non-blocking)
  void processQueue();
}

export async function processQueue() {
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
  }
}

// Lightweight loop to periodically try again (in case of transient failures)
let loopHandle: number | null = null;
export function startSyncLoop(intervalMs = 30_000) {
  if (loopHandle != null) return;
  loopHandle = window.setInterval(() => {
    void processQueue();
  }, intervalMs);
  // try immediately
  void processQueue();
}

export function stopSyncLoop() {
  if (loopHandle != null) {
    clearInterval(loopHandle);
    loopHandle = null;
  }
}

// Expose for diagnostics / testing
export function getQueue(): SyncTask[] {
  return readQueue();
}
