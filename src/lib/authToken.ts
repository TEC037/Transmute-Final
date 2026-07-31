// In-memory auth token with optional encrypted localStorage persistence (decrypt via passphrase)
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
  } catch (err) {
    // ignore
    // eslint-disable-next-line no-console
    console.warn('BroadcastChannel init failed', err);
    bc = null;
  }
}

// Encrypted persistence key (only used if explicitly requested via encryptAndPersistToken)
const ENC_KEY = 'transmute_auth_token_enc_v1';

function bufToBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let str = '';
  for (let i = 0; i < bytes.byteLength; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str);
}

function base64ToBuf(b64: string) {
  const str = atob(b64);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes.buffer;
}

async function deriveKey(passphrase: string, salt: Uint8Array) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 150_000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export function isEncryptedTokenPresent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return !!localStorage.getItem(ENC_KEY);
  } catch {
    return false;
  }
}

// Encrypt token with passphrase and persist ciphertext in localStorage
export async function encryptAndPersistToken(token: string, passphrase: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);
  const enc = new TextEncoder();
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(token)
  );
  const payload = JSON.stringify({ v: 1, salt: bufToBase64(salt.buffer), iv: bufToBase64(iv.buffer), ct: bufToBase64(ct) });
  try {
    localStorage.setItem(ENC_KEY, payload);
  } catch (err) {
    // ignore write errors
    // eslint-disable-next-line no-console
    console.warn('Failed to persist encrypted token', err);
  }
}

// Attempt to decrypt the persisted token with passphrase. On success sets token in memory and broadcasts it.
export async function decryptWithPassphrase(passphrase: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(ENC_KEY);
  } catch (err) {
    return false;
  }
  if (!raw) return false;
  try {
    const obj = JSON.parse(raw) as { v: number; salt: string; iv: string; ct: string };
    if (!obj || !obj.salt || !obj.iv || !obj.ct) return false;
    const saltBuf = new Uint8Array(base64ToBuf(obj.salt));
    const ivBuf = new Uint8Array(base64ToBuf(obj.iv));
    const ctBuf = base64ToBuf(obj.ct);
    const key = await deriveKey(passphrase, saltBuf);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, ctBuf);
    const dec = new TextDecoder().decode(decrypted);
    // set in-memory and broadcast
    _authToken = dec;
    try {
      if (bc) bc.postMessage({ type: 'set', token: _authToken });
    } catch (err) {
      // ignore
    }
    return true;
  } catch (err) {
    // decryption failed
    return false;
  }
}

export function removePersistedEncryptedToken() {
  try {
    localStorage.removeItem(ENC_KEY);
  } catch (err) {
    // ignore
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
