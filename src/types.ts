export type CardCategory = 'mental' | 'physical' | 'alchemy' | 'mystic' | 'daily';

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface AlbumCard {
  id: string;
  title: string;
  category: CardCategory;
  rarity: CardRarity;
  icon: string;
  imageUrl: string;
  status: 'unlocked' | 'locked' | 'empty';
  levelReq: number;
  maxLevel: number;
  currentLevel: number;
  description: string;
  lore: string;
  slotNumber: number;
}

export interface HabitCard {
  id: string;
  title: string;
  category: string; // e.g. 'Mental', 'Daily', 'Fitness', 'Hydration'
  icon: string;
  streak: number;
  targetType: 'checkbox' | 'counter';
  currentCount: number;
  targetCount: number;
  unit: string;
  completed: boolean;
  minLevel: number;
  xpReward: number;
  inkReward?: number;
  tags: string[];
  lastCompletedDate?: string;
}

export interface UserBuff {
  id: string;
  name: string;
  icon: string;
  description: string;
  active: boolean;
  durationHours: number;
}

export interface UserProfile {
  uid?: string;
  email?: string;
  name: string;
  level: number;
  currentXp: number;
  maxXp: number;
  totalXp: number;
  inkDrops?: number;
  quote: string;
  avatarUrl: string;
  customApiKey?: string;
  attributes: {
    strength: number; // e.g., 85
    focus: number;    // e.g., 60
    vitality: number; // e.g., 92
  };
  availablePoints: number;
  activeBuffs: UserBuff[];
}

export interface UserGeneratedImage {
  id?: string;
  userId: string;
  prompt: string;
  imageUrl: string;
  aspectRatio?: string;
  style?: string;
  cardTitle?: string;
  createdAt?: string;
}

export interface ShopItem {
  id: string;
  title: string;
  category: 'pack' | 'buff' | 'cosmetic';
  priceXp?: number;
  priceInk?: number;
  icon: string;
  description: string;
  imageUrl?: string;
  packRarity?: 'classic' | 'rare' | 'legendary';
}
