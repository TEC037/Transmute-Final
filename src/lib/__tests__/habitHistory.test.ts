import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getWeeklyStats,
  getMonthlyCalendarData,
  persistTodayHistory,
} from '../habitHistory';
import type { HabitCard } from '../../types';

const HISTORY_KEY = 'transmute_weekly_history_v1';

function makeHabit(overrides: Partial<HabitCard> = {}): HabitCard {
  return {
    id: '1',
    title: 'Test Habit',
    category: 'Diario',
    streak: 0,
    targetType: 'checkbox',
    currentCount: 0,
    targetCount: 1,
    unit: 'veces',
    completed: false,
    minLevel: 1,
    xpReward: 10,
    ...overrides,
  };
}

describe('habitHistory', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.setSystemTime(new Date(2026, 7, 4, 10, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getWeeklyStats', () => {
    it('returns 7 days with today marked as (Hoy) using the local date key', () => {
      const stats = getWeeklyStats([makeHabit({ completed: true })], 1);
      expect(stats).toHaveLength(7);
      const today = stats.find((s) => s.dayLabel.includes('(Hoy)'));
      expect(today).toBeDefined();
      expect(today!.date).toBe('2026-08-04');
      expect(today!.completedCount).toBe(1);
    });

    it('does not write to localStorage (pure: safe to call from $derived)', () => {
      const setItem = vi.spyOn(Storage.prototype, 'setItem');
      getWeeklyStats([makeHabit()], 1);
      expect(setItem).not.toHaveBeenCalled();
      setItem.mockRestore();
    });
  });

  describe('persistTodayHistory', () => {
    it('records today under the local-time key', () => {
      persistTodayHistory(
        [makeHabit({ completed: true }), makeHabit({ id: '2', completed: false })],
        1
      );
      const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
      expect(raw['2026-08-04']).toEqual({ completedCount: 1, totalCount: 2, xpEarned: 10 });
    });

    it('skips redundant writes when today is already up to date', () => {
      persistTodayHistory([makeHabit({ completed: true })], 1);
      const setItem = vi.spyOn(Storage.prototype, 'setItem');
      persistTodayHistory([makeHabit({ completed: true })], 1);
      expect(setItem).not.toHaveBeenCalled();
      setItem.mockRestore();
    });
  });

  describe('getMonthlyCalendarData', () => {
    it('computes a current streak that continues across the month boundary', () => {
      // Consecutive 100% days: Jul 30-31 and Aug 1-4.
      const full = (d: string) => ({ completedCount: 2, totalCount: 2, xpEarned: 20 });
      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify({
          '2026-07-30': full('2026-07-30'),
          '2026-07-31': full('2026-07-31'),
          '2026-08-01': full('2026-08-01'),
          '2026-08-02': full('2026-08-02'),
          '2026-08-03': full('2026-08-03'),
          '2026-08-04': full('2026-08-04'),
        })
      );
      const habits = [makeHabit({ id: '1', completed: true }), makeHabit({ id: '2', completed: true })];
      const data = getMonthlyCalendarData(2026, 7, habits, 1);
      // Streak must span the month boundary (Jul 30 → Aug 4), not reset on Aug 1.
      expect(data.currentStreak).toBe(6);
      // "Mejor Racha" stays month-scoped: only Aug 1-4 qualify in this view.
      expect(data.maxStreak).toBe(4);
    });

    it('breaks the streak on a day below 50% completion', () => {
      const full = { completedCount: 2, totalCount: 2, xpEarned: 20 };
      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify({
          '2026-07-31': { ...full, completedCount: 0 },
          '2026-08-01': full,
          '2026-08-02': full,
          '2026-08-03': full,
          '2026-08-04': full,
        })
      );
      const habits = [makeHabit({ id: '1', completed: true }), makeHabit({ id: '2', completed: true })];
      const data = getMonthlyCalendarData(2026, 7, habits, 1);
      expect(data.currentStreak).toBe(4);
    });
  });
});
