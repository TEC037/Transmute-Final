import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  enqueueSync,
  getSyncPending,
  subscribeSyncDropped,
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
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.id).toBe('h1');
  });

  it('surfaces permanently-rejected tasks instead of dropping them silently', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('{"error":"Forbidden"}', { status: 403 })
    );
    const dropped = vi.fn();
    const unsub = subscribeSyncDropped(dropped);
    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: {} });
    await vi.waitFor(() => expect(getSyncPending()).toBe(0));
    expect(dropped).toHaveBeenCalledTimes(1);
    unsub();
  });

  it('keeps the task and retries with backoff on transient failures, then evicts after MAX_ATTEMPTS', async () => {
    vi.useFakeTimers();
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new TypeError('network down'));

    enqueueSync({ entity: 'habit', action: 'update', id: 'h1', payload: {} });
    await vi.runAllTicks();
    expect(getSyncPending()).toBe(1);
    expect(queueContents()[0].attempts).toBe(1);

    await vi.runAllTimersAsync();
    // 6 attempts then the exhausted task is evicted so the queue can never wedge.
    expect(fetchMock).toHaveBeenCalledTimes(6);
    expect(getSyncPending()).toBe(0);
  });
});
