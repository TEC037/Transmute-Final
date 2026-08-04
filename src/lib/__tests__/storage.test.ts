import { describe, it, expect, beforeEach } from 'vitest';
import { getClaimedBonusDate, setClaimedBonusDate, mergeClaimedBonusDate } from '../storage';

describe('storage — daily bonus (multi-device)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns local claim when the cloud has none', () => {
    setClaimedBonusDate('2026-08-03');
    expect(mergeClaimedBonusDate(undefined)).toBe('2026-08-03');
    expect(getClaimedBonusDate()).toBe('2026-08-03');
  });

  it('adopts the cloud claim when local has none', () => {
    expect(mergeClaimedBonusDate('2026-08-04')).toBe('2026-08-04');
    expect(getClaimedBonusDate()).toBe('2026-08-04');
  });

  it('keeps the later date when local is newer than the cloud', () => {
    setClaimedBonusDate('2026-08-04');
    expect(mergeClaimedBonusDate('2026-08-02')).toBe('2026-08-04');
    expect(getClaimedBonusDate()).toBe('2026-08-04');
  });

  it('adopts the later date when the cloud is newer than local', () => {
    setClaimedBonusDate('2026-08-02');
    expect(mergeClaimedBonusDate('2026-08-04')).toBe('2026-08-04');
    expect(getClaimedBonusDate()).toBe('2026-08-04');
  });

  it('ignores malformed cloud values', () => {
    setClaimedBonusDate('2026-08-03');
    expect(mergeClaimedBonusDate(1700000000000)).toBe('2026-08-03');
    expect(mergeClaimedBonusDate('not-a-date')).toBe('2026-08-03');
    expect(getClaimedBonusDate()).toBe('2026-08-03');
  });

  it('returns empty string when there is no claim anywhere', () => {
    expect(mergeClaimedBonusDate(undefined)).toBe('');
    expect(getClaimedBonusDate()).toBeNull();
  });
});
