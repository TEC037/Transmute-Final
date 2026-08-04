import type { HabitCard } from '../types';
import { INITIAL_HABITS } from '../data/initialData';

const EPOCH = '1970-01-01T00:00:00.000Z';

/** Strip server-only fields and coerce a raw remote doc into a HabitCard. */
function toHabit(raw: any): HabitCard {
  return {
    id: String(raw.id ?? ''),
    title: String(raw.title ?? ''),
    category: String(raw.category ?? 'Diario'),
    streak: Number(raw.streak ?? 0),
    targetType: raw.targetType === 'counter' ? 'counter' : 'checkbox',
    currentCount: Number(raw.currentCount ?? 0),
    targetCount: Number(raw.targetCount ?? 1),
    unit: String(raw.unit ?? 'veces'),
    completed: Boolean(raw.completed),
    failed: Boolean(raw.failed),
    minLevel: Number(raw.minLevel ?? 1),
    xpReward: Number(raw.xpReward ?? 20),
    ...(raw.updatedAt ? { updatedAt: String(raw.updatedAt) } : {}),
  };
}

function timeOf(h?: HabitCard | null): string {
  return h?.updatedAt || EPOCH;
}

/**
 * Merge local habits with the cloud copy using last-write-wins by updatedAt.
 * - Remote-only habits are appended (unless tombstoned by a newer local delete).
 * - For ids present on both sides, the newer updatedAt wins.
 * - Local ordering is preserved; cloud-only habits are appended at the end.
 */
export function mergeHabits(
  local: HabitCard[],
  remote: HabitCard[],
  tombstones: Record<string, string> = {}
): HabitCard[] {
  const byId = new Map<string, HabitCard>();
  for (const h of local) byId.set(h.id, h);

  for (const r of remote) {
    const rTime = timeOf(r);
    if (tombstones[r.id] && tombstones[r.id] >= rTime) continue;
    const existing = byId.get(r.id);
    if (!existing) {
      byId.set(r.id, toHabit(r));
    } else if (timeOf(existing) < rTime) {
      byId.set(r.id, toHabit(r));
    }
  }

  const merged = local.filter((h) => byId.has(h.id)).map((h) => byId.get(h.id)!);
  const seen = new Set(merged.map((h) => h.id));
  for (const h of byId.values()) {
    if (!seen.has(h.id)) merged.push(h);
  }
  return merged;
}

/**
 * True when the deck is still the untouched seed (fresh install / reset).
 * In that case a non-empty cloud copy is treated as authoritative instead of
 * union-merged, so a reinstall doesn't resurrect habits the user deleted.
 */
export function isUntouchedDefaults(habits: HabitCard[]): boolean {
  if (habits.length !== INITIAL_HABITS.length) return false;
  const byId = new Map(habits.map((h) => [h.id, h]));
  return INITIAL_HABITS.every((d) => {
    const h = byId.get(d.id);
    return (
      h &&
      h.title === d.title &&
      !h.completed &&
      !h.failed &&
      h.currentCount === 0 &&
      h.streak === 0
    );
  });
}
