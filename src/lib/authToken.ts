// In-memory auth token with cross-tab synchronization via BroadcastChannel
let _authToken: string | null = null;

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
  } catch {
    bc = null;
  }
}

export function setAuthToken(token: string | null) {
  _authToken = token;
  try {
    if (bc) bc.postMessage({ type: 'set', token });
  } catch {
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
  } catch {
    // ignore
  }
}
