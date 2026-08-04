export interface HabitCard {
  id: string;
  title: string;
  category: string;
  streak: number;
  targetType: 'checkbox' | 'counter';
  currentCount: number;
  targetCount: number;
  unit: string;
  completed: boolean;
  failed?: boolean;
  minLevel: number;
  xpReward: number;
}

export interface UserProfile {
  uid?: string;
  email?: string;
  name: string;
  level: number;
  currentXp: number;
  maxXp: number;
  totalXp: number;
  quote: string;
  avatarUrl: string;
  attributes: {
    strength: number; // e.g., 85
    focus: number;    // e.g., 60
    vitality: number; // e.g., 92
  };
  availablePoints: number;
}
