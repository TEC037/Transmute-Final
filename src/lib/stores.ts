import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { UserProfile, HabitCard, AlbumCard, ShopItem } from '../types';

// Core domain stores
export const userStore: Writable<UserProfile> = writable({
  name: 'Alquimista Novato',
  level: 1,
  currentXp: 0,
  maxXp: 100,
  totalXp: 0,
  inkDrops: 0,
  quote: '',
  avatarUrl: '',
  attributes: { strength: 10, focus: 10, vitality: 10 },
  availablePoints: 0,
  activeBuffs: [],
});

export const habitsStore: Writable<HabitCard[]> = writable([]);
export const cardsStore: Writable<AlbumCard[]> = writable([]);
export const shopStore: Writable<ShopItem[]> = writable([]);

// UI / navigation store
export type TabType = 'deck' | 'collection' | 'calendar' | 'studio' | 'shop' | 'me';
export const uiStore = writable({
  activeTab: 'deck' as TabType,
  selectedHabitId: undefined as string | undefined,
  modals: {
    onboarding: false,
    auth: false,
    booster: false,
    levelInfo: false,
  },
  filters: {
    timeRange: { type: 'week' as const },
  },
});

// Reward / event bus (ephemeral)
export interface RewardEvent {
  source: 'habit' | 'dailyBonus' | 'shop' | 'card';
  habitId?: string;
  xp: number;
  ink: number;
  levelUp?: {
    oldLevel: number;
    newLevel: number;
    gainedPoints: number;
  };
  timestamp: string;
}

export const rewardEventStore: Writable<RewardEvent | null> = writable(null);

// Derived values
export const userXpPercent = derived(userStore, ($user) =>
  Math.min(100, Math.round(($user.currentXp / Math.max(1, $user.maxXp)) * 100))
);
