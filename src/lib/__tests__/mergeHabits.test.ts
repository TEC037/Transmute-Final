import { describe, it, expect } from 'vitest';
import { mergeHabits, isUntouchedDefaults, resolveHydration } from '../mergeHabits';
import { INITIAL_HABITS } from '../../data/initialData';
import type { HabitCard } from '../../types';

function habit(overrides: Partial<HabitCard> & { id: string }): HabitCard {
  return {
    title: 'Hábito',
    category: 'Diario',
    streak: 0,
    targetType: 'checkbox',
    currentCount: 0,
    targetCount: 1,
    unit: 'veces',
    completed: false,
    minLevel: 1,
    xpReward: 20,
    ...overrides,
  };
}

describe('mergeHabits', () => {
  it('appends remote-only habits at the end, preserving local order', () => {
    const local = [habit({ id: 'a', title: 'A' }), habit({ id: 'b', title: 'B' })];
    const remote = [habit({ id: 'c', title: 'C', updatedAt: '2026-08-01T00:00:00.000Z' })];
    const merged = mergeHabits(local, remote);

    expect(merged.map((h) => h.id)).toEqual(['a', 'b', 'c']);
    expect(merged[2].updatedAt).toBe('2026-08-01T00:00:00.000Z');
  });

  it('keeps the local version when it was updated more recently', () => {
    const local = [habit({ id: 'a', title: 'Local nuevo', updatedAt: '2026-08-04T10:00:00.000Z' })];
    const remote = [habit({ id: 'a', title: 'Cloud viejo', updatedAt: '2026-08-01T10:00:00.000Z' })];
    const merged = mergeHabits(local, remote);

    expect(merged).toHaveLength(1);
    expect(merged[0].title).toBe('Local nuevo');
  });

  it('adopts the remote version when it was updated more recently', () => {
    const local = [habit({ id: 'a', title: 'Local viejo', updatedAt: '2026-08-01T10:00:00.000Z' })];
    const remote = [habit({ id: 'a', title: 'Cloud nuevo', completed: true, updatedAt: '2026-08-04T10:00:00.000Z' })];
    const merged = mergeHabits(local, remote);

    expect(merged).toHaveLength(1);
    expect(merged[0].title).toBe('Cloud nuevo');
    expect(merged[0].completed).toBe(true);
  });

  it('treats a missing updatedAt as the oldest possible version', () => {
    const local = [habit({ id: 'a', title: 'Sin fecha', streak: 3 })];
    const remote = [habit({ id: 'a', title: 'Cloud', updatedAt: '2026-08-04T10:00:00.000Z' })];
    const merged = mergeHabits(local, remote);

    expect(merged[0].title).toBe('Cloud');
  });

  it('suppresses a remote habit tombstoned by a newer local delete', () => {
    const local = [habit({ id: 'a', title: 'A' })];
    const remote = [
      habit({ id: 'a', title: 'A', updatedAt: '2026-08-01T10:00:00.000Z' }),
      habit({ id: 'b', title: 'B', updatedAt: '2026-08-01T10:00:00.000Z' }),
    ];
    const merged = mergeHabits(local, remote, { a: '2026-08-04T10:00:00.000Z' });

    expect(merged.map((h) => h.id)).toEqual(['a', 'b']);
  });

  it('does not suppress a remote habit whose version is newer than the tombstone', () => {
    const local = [habit({ id: 'a', title: 'A' })];
    const remote = [habit({ id: 'a', title: 'A editado en la nube', updatedAt: '2026-08-05T10:00:00.000Z' })];
    const merged = mergeHabits(local, remote, { a: '2026-08-04T10:00:00.000Z' });

    expect(merged[0].title).toBe('A editado en la nube');
  });

  it('coerces and sanitizes remote docs into HabitCard shape', () => {
    const remote = [
      { id: 'x', title: 'Raro', targetType: 'counter', currentCount: '3', ownerUid: 'u', updatedAt: '2026-08-04T10:00:00.000Z' },
    ];
    const merged = mergeHabits([], remote as unknown as HabitCard[]);

    expect(merged[0]).toMatchObject({
      id: 'x',
      targetType: 'counter',
      currentCount: 3,
    });
    expect((merged[0] as any).ownerUid).toBeUndefined();
  });
});

describe('isUntouchedDefaults', () => {
  it('returns true for the pristine seed deck', () => {
    expect(isUntouchedDefaults(INITIAL_HABITS)).toBe(true);
  });

  it('returns false once any habit is completed, failed, or modified', () => {
    const touched = INITIAL_HABITS.map((h, i) =>
      i === 0 ? { ...h, completed: true } : h
    );
    expect(isUntouchedDefaults(touched)).toBe(false);
  });

  it('returns false when the deck length differs', () => {
    expect(isUntouchedDefaults([habit({ id: 'x' })])).toBe(false);
  });
});

describe('resolveHydration', () => {
  const staleRemote = INITIAL_HABITS.map((h) => ({
    ...h,
    completed: true,
    streak: 12,
    updatedAt: '2026-08-01T10:00:00.000Z',
  }));

  it('treats a pristine deck as a fresh install when there are no tombstones', () => {
    const resolved = resolveHydration(INITIAL_HABITS, staleRemote);

    expect(resolved.map((h) => h.id)).toEqual(staleRemote.map((h) => h.id));
    expect(resolved[0].completed).toBe(true);
    expect(resolved[0].streak).toBe(12);
  });

  it('does NOT revert a "reset to zero" when tombstones exist', () => {
    const tombstones = Object.fromEntries(
      INITIAL_HABITS.map((h) => [h.id, '2026-08-04T10:00:00.000Z'])
    );
    const resolved = resolveHydration(INITIAL_HABITS, staleRemote, tombstones);

    // The pristine (reset) deck wins; stale cloud habits are suppressed.
    expect(resolved.map((h) => h.id)).toEqual(INITIAL_HABITS.map((h) => h.id));
    expect(resolved.some((h) => h.completed)).toBe(false);
    expect(resolved.some((h) => h.streak > 0)).toBe(false);
  });

  it('keeps cloud habits created after the reset when tombstones exist', () => {
    const freshCloud = habit({ id: 'new-after-reset', title: 'Nuevo', updatedAt: '2026-08-05T10:00:00.000Z' });
    const tombstones = Object.fromEntries(
      INITIAL_HABITS.map((h) => [h.id, '2026-08-04T10:00:00.000Z'])
    );
    const resolved = resolveHydration(INITIAL_HABITS, [freshCloud], tombstones);

    expect(resolved.map((h) => h.id)).toEqual([...INITIAL_HABITS.map((h) => h.id), 'new-after-reset']);
    expect(resolved[resolved.length - 1].title).toBe('Nuevo');
  });
});
