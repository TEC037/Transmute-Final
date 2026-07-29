import type { HabitCard, UserProfile, AlbumCard } from '../types';

const DB_NAME = 'TransmuteDB';
const DB_VERSION = 1;

export const LOCAL_KEYS = {
  USER: 'transmute_user',
  HABITS: 'transmute_habits',
  CARDS: 'transmute_cards',
};

// Open or initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported in this browser environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('habits')) {
        db.createObjectStore('habits', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('cards')) {
        db.createObjectStore('cards', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('appState')) {
        db.createObjectStore('appState');
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Save habits to IndexedDB with automatic LocalStorage backup.
 */
export async function saveHabitsLocal(habits: HabitCard[]): Promise<void> {
  // Always update LocalStorage for immediate fallback
  try {
    localStorage.setItem(LOCAL_KEYS.HABITS, JSON.stringify(habits));
  } catch (err) {
    console.warn('LocalStorage error while saving habits:', err);
  }

  // Update IndexedDB
  try {
    const db = await openDB();
    const tx = db.transaction('habits', 'readwrite');
    const store = tx.objectStore('habits');

    // Clear existing
    store.clear();

    // Insert all
    for (const habit of habits) {
      store.put(habit);
    }

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB write error for habits, fallback to LocalStorage active:', err);
  }
}

/**
 * Load habits from IndexedDB (or LocalStorage fallback).
 */
export async function loadHabitsLocal(): Promise<HabitCard[] | null> {
  try {
    const db = await openDB();
    const tx = db.transaction('habits', 'readonly');
    const store = tx.objectStore('habits');
    const request = store.getAll();

    const habits: HabitCard[] = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    if (habits && habits.length > 0) {
      return habits;
    }
  } catch (err) {
    console.warn('IndexedDB read error for habits, reading from LocalStorage fallback:', err);
  }

  // Fallback to LocalStorage
  try {
    const raw = localStorage.getItem(LOCAL_KEYS.HABITS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('LocalStorage read error for habits:', err);
  }

  return null;
}

/**
 * Save user profile to IndexedDB and LocalStorage.
 */
export async function saveUserProfileLocal(user: UserProfile): Promise<void> {
  try {
    localStorage.setItem(LOCAL_KEYS.USER, JSON.stringify(user));
  } catch (err) {
    console.warn('LocalStorage error for user profile:', err);
  }

  try {
    const db = await openDB();
    const tx = db.transaction('appState', 'readwrite');
    const store = tx.objectStore('appState');
    store.put(user, 'userProfile');

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB write error for user profile:', err);
  }
}

/**
 * Load user profile from IndexedDB (or LocalStorage fallback).
 */
export async function loadUserProfileLocal(): Promise<UserProfile | null> {
  try {
    const db = await openDB();
    const tx = db.transaction('appState', 'readonly');
    const store = tx.objectStore('appState');
    const request = store.get('userProfile');

    const user = await new Promise<UserProfile | null>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });

    if (user) return user;
  } catch (err) {
    console.warn('IndexedDB read error for user profile:', err);
  }

  try {
    const raw = localStorage.getItem(LOCAL_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('LocalStorage read error for user:', err);
  }

  return null;
}

/**
 * Save cards to IndexedDB and LocalStorage.
 */
export async function saveCardsLocal(cards: AlbumCard[]): Promise<void> {
  try {
    localStorage.setItem(LOCAL_KEYS.CARDS, JSON.stringify(cards));
  } catch (err) {
    console.warn('LocalStorage error for cards:', err);
  }

  try {
    const db = await openDB();
    const tx = db.transaction('cards', 'readwrite');
    const store = tx.objectStore('cards');
    store.clear();
    for (const card of cards) {
      store.put(card);
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB write error for cards:', err);
  }
}

/**
 * Load cards from IndexedDB (or LocalStorage fallback).
 */
export async function loadCardsLocal(): Promise<AlbumCard[] | null> {
  try {
    const db = await openDB();
    const tx = db.transaction('cards', 'readonly');
    const store = tx.objectStore('cards');
    const request = store.getAll();

    const cards: AlbumCard[] = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    if (cards && cards.length > 0) return cards;
  } catch (err) {
    console.warn('IndexedDB read error for cards:', err);
  }

  try {
    const raw = localStorage.getItem(LOCAL_KEYS.CARDS);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('LocalStorage read error for cards:', err);
  }

  return null;
}
