import type { HabitCard, UserProfile } from '../types';

const LOCAL_KEYS = {
  USER: 'transmute_user',
  HABITS: 'transmute_habits',
  DELETED_HABITS: 'transmute_deleted_habit_ids',
  BONUS_DATE: 'transmute_daily_bonus_date',
};

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (err) {
    console.warn(`LocalStorage read error for ${key}:`, err);
    return null;
  }
}

function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`LocalStorage write error for ${key}:`, err);
  }
}

export function saveHabitsLocal(habits: HabitCard[]): void {
  writeJSON(LOCAL_KEYS.HABITS, habits);
}

export function loadHabitsLocal(): HabitCard[] | null {
  return readJSON<HabitCard[]>(LOCAL_KEYS.HABITS);
}

export function saveUserProfileLocal(user: UserProfile): void {
  writeJSON(LOCAL_KEYS.USER, user);
}

export function loadUserProfileLocal(): UserProfile | null {
  return readJSON<UserProfile>(LOCAL_KEYS.USER);
}

// Deleted-habit tombstones: id -> ISO timestamp of local deletion. Used when
// merging cloud habits so a habit deleted on this device doesn't resurrect
// from an older remote copy.
export function getDeletedHabitIds(): Record<string, string> {
  return readJSON<Record<string, string>>(LOCAL_KEYS.DELETED_HABITS) || {};
}

export function markHabitDeleted(id: string): void {
  const ids = getDeletedHabitIds();
  ids[id] = new Date().toISOString();
  writeJSON(LOCAL_KEYS.DELETED_HABITS, ids);
}

export function unmarkHabitDeleted(id: string): void {
  const ids = getDeletedHabitIds();
  if (id in ids) {
    delete ids[id];
    writeJSON(LOCAL_KEYS.DELETED_HABITS, ids);
  }
}

// Daily bonus: store the local date (YYYY-MM-DD) it was last claimed.
export function getClaimedBonusDate(): string | null {
  try {
    return localStorage.getItem(LOCAL_KEYS.BONUS_DATE);
  } catch {
    return null;
  }
}

export function setClaimedBonusDate(date: string): void {
  try {
    localStorage.setItem(LOCAL_KEYS.BONUS_DATE, date);
  } catch {
    // ignore storage errors
  }
}

// Multi-device: resolve the latest daily-bonus claim between this device and
// the cloud. Dates are YYYY-MM-DD, so string comparison is chronological.
// Adopts the winning date locally and returns it ('' when there is none).
export function mergeClaimedBonusDate(cloudDate: unknown): string {
  const local = getClaimedBonusDate();
  const cloud =
    typeof cloudDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(cloudDate) ? cloudDate : '';
  const latest = local && cloud ? (local > cloud ? local : cloud) : cloud || local;
  if (latest && latest !== local) setClaimedBonusDate(latest);
  return latest || '';
}
