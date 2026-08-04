import type { HabitCard, UserProfile } from '../types';

const LOCAL_KEYS = {
  USER: 'transmute_user',
  HABITS: 'transmute_habits',
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
