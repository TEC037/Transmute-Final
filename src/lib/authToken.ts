let _authToken: string | null = null;

// BroadcastChannel for cross-tab token propagation
const CHANNEL_NAME = 'transmute-auth-token';
const LS_KEY = 'transmute_auth_token'; // fallback key in localStorage for older browsers / processes
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

// Storage event fallback for older browsers / contexts without BroadcastChannel
if (typeof window !== 'undefined' && !bc && 'addEventListener' in window) {
  window.addEventListener('storage', (ev: StorageEvent) => {
    try {
      if (ev.key === LS_KEY || ev.key === 'authToken') {
        _authToken = ev.newValue ?? null;
      }
    } catch (err) {
      // ignore
    }
  });
}

// Initialize from localStorage fallback if available
if (typeof window !== 'undefined') {
  try {
    const initial = localStorage.getItem(LS_KEY) || localStorage.getItem('authToken');
    if (initial) _authToken = initial;
  } catch (err) {
    // ignore localStorage access errors
  }
}

export function setAuthToken(token: string | null) {
  _authToken = token;
  try {
    if (bc) bc.postMessage({ type: 'set', token });
  } catch (err) {
    // ignore
  }
  try {
    if (typeof window !== 'undefined') {
      if (token) localStorage.setItem(LS_KEY, token);
      else localStorage.removeItem(LS_KEY);
      // also keep legacy key for compatibility
      if (token) localStorage.setItem('authToken', token);
      else localStorage.removeItem('authToken');
    }
  } catch (err) {
    // ignore localStorage write errors
  }
}

export function getAuthToken(): string | null {
  // If in-memory is empty, attempt reading fallback localStorage (last resort)
  if (!_authToken && typeof window !== 'undefined') {
    try {
      _authToken = localStorage.getItem(LS_KEY) || localStorage.getItem('authToken');
    } catch (err) {
      // ignore
    }
  }
  return _authToken;
}

export function clearAuthToken() {
  _authToken = null;
  try {
    if (bc) bc.postMessage({ type: 'clear' });
  } catch (err) {
    // ignore
  }
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LS_KEY);
      localStorage.removeItem('authToken');
    }
  } catch (err) {
    // ignore
  }
}
