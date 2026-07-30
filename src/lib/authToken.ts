let _authToken: string | null = null;

// BroadcastChannel for cross-tab token propagation
const CHANNEL_NAME = 'transmute-auth-token';
let bc: BroadcastChannel | null = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    bc = new BroadcastChannel(CHANNEL_NAME);
    bc.onmessage = (ev) => {
      const msg = ev.data as { type: string; token?: string | null } | undefined;
      if (!msg) return;
      if (msg.type === 'set') {
        _authToken = msg.token ?? null;
      } else if (msg.type === 'clear') {
        _authToken = null;
      }
    };
  } catch (err) {
    // ignore BroadcastChannel errors (e.g., insecure contexts)
    // eslint-disable-next-line no-console
    console.warn('BroadcastChannel init failed', err);
    bc = null;
  }
}

export function setAuthToken(token: string | null) {
  _authToken = token;
  try {
    if (bc) bc.postMessage({ type: 'set', token });
  } catch (err) {
    // ignore
  }
}

export function getAuthToken(): string | null {
  return _authToken;
}

export function clearAuthToken() {
  _authToken = null;
  try {
    if (bc) bc.postMessage({ type: 'clear' });
  } catch (err) {
    // ignore
  }
}
