import { get } from 'svelte/store';
import { userStore, habitsStore, cardsStore, rewardEventStore } from './stores';
import type { HabitCard } from '../types';

// Synchronous helper to check level up
function checkLevelUp(currentXp: number, maxXp: number, level: number, user: any) {
  if (currentXp >= maxXp) {
    const newXp = currentXp - maxXp;
    const newLevel = level + 1;
    const newMaxXp = Math.round(maxXp * 1.25);
    return {
      currentXp: newXp,
      maxXp: newMaxXp,
      level: newLevel,
      availablePoints: (user.availablePoints || 0) + 2,
    };
  }
  return null;
}

export const addXp = (amount: number, inkAmount?: number) => {
  const user = get(userStore);
  const updatedTotalXp = (user.totalXp || 0) + amount;
  const updatedCurrentXp = (user.currentXp || 0) + amount;
  const inkGained = inkAmount ?? Math.max(5, Math.round(amount / 5));
  const updatedInk = (user.inkDrops || 0) + inkGained;

  const levelUpData = checkLevelUp(updatedCurrentXp, user.maxXp, user.level, user);

  if (levelUpData) {
    userStore.set({
      ...user,
      totalXp: updatedTotalXp,
      currentXp: levelUpData.currentXp,
      maxXp: levelUpData.maxXp,
      level: levelUpData.level,
      availablePoints: levelUpData.availablePoints,
      inkDrops: updatedInk,
    });

    rewardEventStore.set({
      source: 'habit',
      xp: amount,
      ink: inkGained,
      levelUp: {
        oldLevel: user.level,
        newLevel: levelUpData.level,
        gainedPoints: levelUpData.availablePoints - (user.availablePoints || 0),
      },
      timestamp: new Date().toISOString(),
    });
  } else {
    userStore.set({ ...user, totalXp: updatedTotalXp, currentXp: updatedCurrentXp, inkDrops: updatedInk });
    rewardEventStore.set({
      source: 'habit',
      xp: amount,
      ink: inkGained,
      timestamp: new Date().toISOString(),
    });
  }
};

export const toggleHabit = (id: string) => {
  const list = get(habitsStore);
  const updated = list.map((h) => {
    if (h.id === id) {
      const nextCompleted = !h.completed;
      if (nextCompleted) {
        const inkBonus = h.inkReward || Math.max(5, Math.round(h.xpReward / 5));
        addXp(h.xpReward, inkBonus);
      }
      return { ...h, completed: nextCompleted, streak: nextCompleted ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 0) - 1) } as HabitCard;
    }
    return h;
  });
  habitsStore.set(updated);
  // TODO: enqueue persistence to sync module
};

export const incrementHabitCounter = (id: string) => {
  const list = get(habitsStore);
  const updated = list.map((h) => {
    if (h.id === id) {
      const nextCount = (h.currentCount || 0) + 1;
      const reachedTarget = nextCount >= (h.targetCount || 1);
      if (reachedTarget && (h.currentCount || 0) < (h.targetCount || 1)) {
        const inkBonus = h.inkReward || Math.max(5, Math.round(h.xpReward / 5));
        addXp(h.xpReward, inkBonus);
      }
      return { ...h, currentCount: nextCount, completed: reachedTarget } as HabitCard;
    }
    return h;
  });
  habitsStore.set(updated);
  // TODO: enqueue persistence to sync module
};

export const saveHabit = (habitData: Partial<HabitCard>, id?: string) => {
  const list = get(habitsStore);
  if (id) {
    const updated = list.map((h) => (h.id === id ? ({ ...h, ...habitData } as HabitCard) : h));
    habitsStore.set(updated);
  } else {
    const newHabit: HabitCard = {
      title: habitData.title || 'Nuevo Hábito',
      category: habitData.category || 'Diario',
      icon: habitData.icon || 'fitness_center',
      streak: 0,
      targetType: (habitData.targetType as any) || 'checkbox',
      currentCount: 0,
      targetCount: habitData.targetCount || 1,
      unit: habitData.unit || 'veces',
      completed: false,
      minLevel: habitData.minLevel || 1,
      xpReward: habitData.xpReward || 20,
      tags: habitData.tags || ['General'],
      id: `habit-${Date.now()}`,
    };
    habitsStore.set([newHabit, ...list]);
  }
};

export const deleteHabit = (id: string) => {
  const list = get(habitsStore);
  habitsStore.set(list.filter((h) => h.id !== id));
};
