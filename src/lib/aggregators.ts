import type { HabitCard } from '../types';

// Placeholder aggregators for charts and stats. Expand with real time-bucket logic.

export function aggregateHabitsByRange(habitHistory: HabitCard[], range: { type: string; from?: string; to?: string }) {
  // Return a basic series grouped by day for the last 7 days when type='week'.
  // Caller should replace with full aggregation against a stats history store.
  const days = 7;
  const series = Array.from({ length: days }, (_, i) => ({ label: `D-${i}`, value: Math.floor(Math.random() * 5) }));
  return series;
}

export function aggregateXpByRange(statsHistory: any[], range: { type: string; from?: string; to?: string }) {
  const days = range.type === 'week' ? 7 : 30;
  const series = Array.from({ length: days }, (_, i) => ({ label: `D-${i}`, value: Math.floor(Math.random() * 200) }));
  return series;
}
