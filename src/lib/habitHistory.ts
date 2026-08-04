import type { HabitCard } from '../types';

export interface DailyHabitStat {
  date: string; // YYYY-MM-DD
  dayLabel: string; // 'Lun', 'Mar', etc.
  completedCount: number;
  totalCount: number;
  percentage: number;
  xpEarned: number;
}

const HISTORY_KEY = 'transmute_weekly_history_v1';

const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

/**
 * Get date string YYYY-MM-DD for a given Date, in LOCAL time.
 * (Using toISOString() here keys completions by UTC, which mislabels
 * anything done between local midnight and 02:00 as the previous day.)
 */
function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Inverse of formatDateKey: local-time date from a YYYY-MM-DD key. */
function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

type HistoryEntry = { completedCount: number; totalCount: number; xpEarned: number };
type RawHistory = Record<string, HistoryEntry>;

function readHistory(): RawHistory {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? (JSON.parse(saved) as RawHistory) : {};
  } catch (err) {
    console.warn('Could not read habit history:', err);
    return {};
  }
}

/**
 * Record today's live state into persisted history.
 * Must be called from an effect/handler (never inside a $derived).
 * Skips the write when today's entry is already up to date.
 */
export function persistTodayHistory(habits: HabitCard[], userLevel: number) {
  const activeHabits = habits.filter((h) => h.minLevel <= userLevel);
  const entry: HistoryEntry = {
    completedCount: activeHabits.filter((h) => h.completed).length,
    totalCount: Math.max(1, activeHabits.length),
    xpEarned: activeHabits.filter((h) => h.completed).reduce((sum, h) => sum + h.xpReward, 0),
  };
  try {
    const raw = readHistory();
    const existing = raw[todayKey()];
    if (existing && existing.completedCount === entry.completedCount && existing.xpEarned === entry.xpEarned) {
      return;
    }
    raw[todayKey()] = entry;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(raw));
  } catch (err) {
    console.warn('Could not save habit history:', err);
  }
}

export function todayKey(): string {
  return formatDateKey(new Date());
}

/**
 * Get the last 7 days array (from 6 days ago to today)
 */
function getLast7Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }
  return days;
}

/** Percentage for a given day, falling back to the deterministic mock used by the calendar. */
function dayPercentage(rawHistory: RawHistory, date: Date, totalActive: number): number {
  const key = formatDateKey(date);
  const entry = rawHistory[key];
  if (entry) {
    return Math.round((entry.completedCount / Math.max(1, entry.totalCount || totalActive)) * 100);
  }
  const seed = date.getFullYear() * 31 + date.getMonth() * 12 + date.getDate();
  return Math.min(100, Math.max(30, 60 + (seed % 5) * 10));
}

/**
 * Current streak ending today, continuous across month boundaries.
 * Uses the same >=50% completion rule as the calendar rendering, but only
 * counts days that have real recorded data: a missing day breaks the streak
 * (the mock baseline is chart filler, not something to build a streak on).
 */
function computeCurrentStreak(rawHistory: RawHistory, startKey: string, totalActive: number): number {
  let streak = 0;
  const d = parseDateKey(startKey);
  // Safety cap: a realistic streak is far below a full year.
  for (let i = 0; i < 400; i++) {
    const key = formatDateKey(d);
    const entry = rawHistory[key];
    if (!entry) break;
    const pct = Math.round((entry.completedCount / Math.max(1, entry.totalCount || totalActive)) * 100);
    if (pct < 50) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/**
 * Load or initialize weekly completion history
 */
export function getWeeklyStats(habits: HabitCard[], userLevel: number): DailyHabitStat[] {
  const activeHabits = habits.filter((h) => h.minLevel <= userLevel);
  const totalActive = Math.max(1, activeHabits.length);

  const rawHistory = readHistory();

  const days = getLast7Days();
  const todayKeyVal = todayKey();

  // Count currently completed habits for today
  const todayCompleted = activeHabits.filter((h) => h.completed).length;
  const todayXp = activeHabits.filter((h) => h.completed).reduce((sum, h) => sum + h.xpReward, 0);

  // Update today's entry in rawHistory (in-memory only; persisted elsewhere)
  rawHistory[todayKeyVal] = {
    completedCount: todayCompleted,
    totalCount: totalActive,
    xpEarned: todayXp,
  };

  // Build 7-day stats
  const stats: DailyHabitStat[] = days.map((dayDate) => {
    const key = formatDateKey(dayDate);
    const dayName = DAY_NAMES[dayDate.getDay()];
    const isToday = key === todayKeyVal;

    if (rawHistory[key]) {
      const entry = rawHistory[key];
      const pct = Math.round((entry.completedCount / Math.max(1, entry.totalCount)) * 100);
      return {
        date: key,
        dayLabel: isToday ? `${dayName} (Hoy)` : dayName,
        completedCount: entry.completedCount,
        totalCount: entry.totalCount,
        percentage: pct,
        xpEarned: entry.xpEarned,
      };
    } else {
      // Baseline mock estimation based on average streaks if no record exists for past days
      const avgStreak = activeHabits.length > 0
        ? Math.round(activeHabits.reduce((acc, h) => acc + (h.streak || 0), 0) / activeHabits.length)
        : 1;
      
      // Calculate realistic baseline (e.g., 60-90% range with slight variation)
      const dateSeed = dayDate.getDate();
      const mockPct = Math.min(100, Math.max(40, 65 + (dateSeed % 4) * 10 + (avgStreak > 2 ? 10 : 0)));
      const mockCompleted = Math.round((mockPct / 100) * totalActive);

      return {
        date: key,
        dayLabel: dayName,
        completedCount: mockCompleted,
        totalCount: totalActive,
        percentage: mockPct,
        xpEarned: mockCompleted * 15,
      };
    }
  });

  return stats;
}

/**
 * Monthly calendar day status
 */
export interface CalendarDayStat {
  dateKey: string; // YYYY-MM-DD
  dayNumber: number;
  dayOfWeek: number; // 0 = Sun, 1 = Mon ...
  isCurrentMonth: boolean;
  isToday: boolean;
  isFuture: boolean;
  completedCount: number;
  totalCount: number;
  percentage: number;
  xpEarned: number;
  streakActive: boolean;
}

/**
 * Get monthly stats for a full calendar grid (including leading padding days from previous month)
 */
export function getMonthlyCalendarData(
  year: number,
  month: number, // 0-indexed: 0 = Jan, 6 = Jul
  habits: HabitCard[],
  userLevel: number
): {
  days: CalendarDayStat[];
  monthName: string;
  year: number;
  currentStreak: number;
  maxStreak: number;
  totalCompletedInMonth: number;
  completionRateMonth: number;
} {
  const activeHabits = habits.filter((h) => h.minLevel <= userLevel);
  const totalActive = Math.max(1, activeHabits.length);

  const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const rawHistory = readHistory();

  const today = new Date();
  const todayKeyVal = todayKey();

  // Update today's entry in rawHistory dynamically (in-memory only)
  const todayCompleted = activeHabits.filter((h) => h.completed).length;
  const todayXp = activeHabits.filter((h) => h.completed).reduce((sum, h) => sum + h.xpReward, 0);

  rawHistory[todayKeyVal] = {
    completedCount: todayCompleted,
    totalCount: totalActive,
    xpEarned: todayXp,
  };

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Get Monday-first starting index (0 = Mon, 6 = Sun)
  let startDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6;

  const calendarDays: CalendarDayStat[] = [];

  // Previous month padding days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const pDay = prevMonthLastDay - i;
    const pDate = new Date(year, month - 1, pDay);
    const key = formatDateKey(pDate);

    calendarDays.push({
      dateKey: key,
      dayNumber: pDay,
      dayOfWeek: pDate.getDay(),
      isCurrentMonth: false,
      isToday: key === todayKeyVal,
      isFuture: pDate > today,
      completedCount: 0,
      totalCount: totalActive,
      percentage: 0,
      xpEarned: 0,
      streakActive: false,
    });
  }

  let totalCompletedInMonth = 0;
  let maxStreak = 0;
  let runningStreak = 0;

  // Days in selected month
  for (let d = 1; d <= daysInMonth; d++) {
    const dDate = new Date(year, month, d);
    const key = formatDateKey(dDate);
    const isToday = key === todayKeyVal;
    const isFuture = dDate > today;

    let completedCount = 0;
    let totalCount = totalActive;
    let xpEarned = 0;
    let percentage = 0;

    if (rawHistory[key]) {
      completedCount = rawHistory[key].completedCount;
      totalCount = rawHistory[key].totalCount || totalActive;
      xpEarned = rawHistory[key].xpEarned || 0;
      percentage = Math.round((completedCount / Math.max(1, totalCount)) * 100);
    } else if (!isFuture) {
      // Deterministic realistic estimation based on habits streaks for historical days
      const dateSeed = (year * 31 + month * 12 + d);
      const mockPct = Math.min(100, Math.max(30, 60 + (dateSeed % 5) * 10));
      completedCount = Math.round((mockPct / 100) * totalActive);
      percentage = mockPct;
      xpEarned = completedCount * 15;
    }

    if (!isFuture) {
      totalCompletedInMonth += completedCount;
      if (percentage >= 50) {
        runningStreak++;
        if (runningStreak > maxStreak) maxStreak = runningStreak;
      } else {
        runningStreak = 0;
      }
    }

    calendarDays.push({
      dateKey: key,
      dayNumber: d,
      dayOfWeek: dDate.getDay(),
      isCurrentMonth: true,
      isToday,
      isFuture,
      completedCount,
      totalCount,
      percentage,
      xpEarned,
      streakActive: percentage >= 50 && !isFuture,
    });
  }

  // Trailing padding days to fill grid
  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let t = 1; t <= remainingCells; t++) {
    const tDate = new Date(year, month + 1, t);
    const key = formatDateKey(tDate);
    calendarDays.push({
      dateKey: key,
      dayNumber: t,
      dayOfWeek: tDate.getDay(),
      isCurrentMonth: false,
      isToday: key === todayKeyVal,
      isFuture: tDate > today,
      completedCount: 0,
      totalCount: totalActive,
      percentage: 0,
      xpEarned: 0,
      streakActive: false,
    });
  }

  // "Racha Actual" must be continuous across month boundaries (a streak does
  // not reset on the 1st). Walk backwards from today applying the same
  // >=50% completion rule used to render each calendar day.
  const currentStreak = computeCurrentStreak(rawHistory, todayKeyVal, totalActive);

  const daysPassedInMonth = Math.min(daysInMonth, today.getMonth() === month && today.getFullYear() === year ? today.getDate() : daysInMonth);
  const totalPossible = totalActive * daysPassedInMonth;
  const completionRateMonth = Math.round((totalCompletedInMonth / Math.max(1, totalPossible)) * 100);

  return {
    days: calendarDays,
    monthName: MONTH_NAMES[month],
    year,
    currentStreak,
    maxStreak,
    totalCompletedInMonth,
    completionRateMonth,
  };
}
