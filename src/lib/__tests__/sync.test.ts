import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  enqueueSync,
  getSyncPending,
  subscribeSyncDropped,
  reconcileHabitQueue,
} from '../sync';

vi.mock('../firebase', () => ({ auth: { currentUser: null } }));
vi.mock('../authToken', () => ({
  getAuthToken: vi.fn(() => 'test-token'),
  setAuthToken: vi.fn(),
}));

const QUEUE_KEY = 'transmute_sync_queue_v1';

function queueContents() {
  return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
}

describe('sync', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('ignores tasks without an id (prevents docId "undefined")', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    enqueueSync({ entity: 'user', action: 'update', id: undefined as any, payload: {} });
    expect(getSyncPending()).toBe(0);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('removes a task from the queue after a successful delivery', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }));
    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: {} });
    await vi.waitFor(() => expect(getSyncPending()).toBe(0));
    const syncCalls = fetchMock.mock.calls.filter((c) =>
      String(c[0]).includes('/api/sync')
    );
    expect(syncCalls).toHaveLength(1);
    const body = JSON.parse((syncCalls[0][1] as RequestInit).body as string);
    expect(body.id).toBe('h1');
  });

  it('surfaces permanently-rejected tasks instead of dropping them silently', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input: any) => {
      const url = typeof input === 'string' ? input : String(input);
      if (url.includes('/api/health')) return new Response('{"status":"ok"}', { status: 200 });
      return new Response('{"error":"Forbidden"}', { status: 403 });
    });
    const dropped = vi.fn();
    const unsub = subscribeSyncDropped(dropped);
    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: {} });
    await vi.waitFor(() => expect(getSyncPending()).toBe(0));
    expect(dropped).toHaveBeenCalledTimes(1);
    unsub();
  });

  it('retains tasks while the API is down (no silent eviction) and delivers on reconnect', async () => {
    vi.useFakeTimers();
    let apiUp = false;
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input: any) => {
      const url = typeof input === 'string' ? input : String(input);
      if (url.includes('/api/health')) {
        if (!apiUp) throw new TypeError('offline');
        return new Response('{"status":"ok"}', { status: 200 });
      }
      return new Response('{}', { status: 200 });
    });

    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: {} });
    await vi.runAllTicks();
    expect(getSyncPending()).toBe(1);

    // Long offline stretch: the task survives and no attempts are burned
    // (the API is probed, not hammered).
    await vi.advanceTimersByTimeAsync(120_000);
    expect(getSyncPending()).toBe(1);
    expect(queueContents()[0].attempts).toBe(0);

    // Back online: the retry probe picks it up and delivers it.
    apiUp = true;
    await vi.runAllTimersAsync();
    expect(getSyncPending()).toBe(0);
  });

  it('evicts a task after MAX_ATTEMPTS when the server keeps failing, and warns', async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input: any) => {
      const url = typeof input === 'string' ? input : String(input);
      if (url.includes('/api/health')) return new Response('{"status":"ok"}', { status: 200 });
      return new Response('{"error":"boom"}', { status: 500 });
    });
    const dropped = vi.fn();
    const unsub = subscribeSyncDropped(dropped);

    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: {} });
    await vi.runAllTimersAsync();

    expect(getSyncPending()).toBe(0);
    expect(dropped).toHaveBeenCalledTimes(1);
    unsub();
  });

  it('coalesces rapid updates for the same entity+id into a single task', () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: { title: 'v1' } });
    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: { title: 'v2' } });
    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: { title: 'v3' } });

    expect(queueContents()).toHaveLength(1);
    expect(queueContents()[0].payload.title).toBe('v3');
  });

  it('keeps only the create when a pending delete is undone', () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
    enqueueSync({ entity: 'habit', action: 'delete', id: 'h1', payload: null });
    enqueueSync({ entity: 'habit', action: 'create', id: 'h1', payload: { title: 'resurrected' } });

    expect(queueContents()).toHaveLength(1);
    expect(queueContents()[0].action).toBe('create');
    expect(queueContents()[0].payload.title).toBe('resurrected');
  });

  it('does not coalesce tasks for different ids', () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: {} });
    enqueueSync({ entity: 'habit', action: 'update', id: 'h2', payload: {} });

    expect(queueContents()).toHaveLength(2);
  });

  describe('reconcileHabitQueue', () => {
    it('replaces a pending habit payload with a newer merged state', () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
      enqueueSync({
        entity: 'habit',
        action: 'update',
        id: 'h1',
        payload: { title: 'viejo', updatedAt: '2026-08-01T00:00:00.000Z' },
      });

      reconcileHabitQueue([
        { id: 'h1', title: 'nuevo', updatedAt: '2026-08-04T00:00:00.000Z' } as any,
      ]);

      expect(queueContents()[0].payload.title).toBe('nuevo');
      expect(queueContents()[0].payload.updatedAt).toBe('2026-08-04T00:00:00.000Z');
    });

    it('keeps a queued payload that is newer than the current state', () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
      enqueueSync({
        entity: 'habit',
        action: 'update',
        id: 'h1',
        payload: { title: 'nuevo', updatedAt: '2026-08-04T00:00:00.000Z' },
      });

      reconcileHabitQueue([
        { id: 'h1', title: 'viejo', updatedAt: '2026-08-01T00:00:00.000Z' } as any,
      ]);

      expect(queueContents()[0].payload.title).toBe('nuevo');
    });

    it('leaves delete and other-entity tasks untouched', () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
      enqueueSync({ entity: 'habit', action: 'delete', id: 'h1', payload: null });
      enqueueSync({ entity: 'user', action: 'update', id: 'u1', payload: { level: 5 } });

      reconcileHabitQueue([]);

      expect(queueContents()).toHaveLength(2);
    });
  });
});
