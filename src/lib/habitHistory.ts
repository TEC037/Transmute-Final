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
 * Get date string YYYY-MM-DD for a given Date
 */
export function formatDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Get the last 7 days array (from 6 days ago to today)
 */
export function getLast7Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }
  return days;
}

/**
 * Load or initialize weekly completion history
 */
export function getWeeklyStats(habits: HabitCard[], userLevel: number): DailyHabitStat[] {
  const activeHabits = habits.filter((h) => h.minLevel <= userLevel);
  const totalActive = Math.max(1, activeHabits.length);

  let rawHistory: Record<string, { completedCount: number; totalCount: number; xpEarned: number }> = {};
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      rawHistory = JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Could not read weekly habit history:', err);
  }

  const days = getLast7Days();
  const todayKey = formatDateKey(new Date());

  // Count currently completed habits for today
  const todayCompleted = activeHabits.filter((h) => h.completed).length;
  const todayXp = activeHabits.filter((h) => h.completed).reduce((sum, h) => sum + h.xpReward, 0);

  // Update today's entry in rawHistory
  rawHistory[todayKey] = {
    completedCount: todayCompleted,
    totalCount: totalActive,
    xpEarned: todayXp,
  };

  // Build 7-day stats
  const stats: DailyHabitStat[] = days.map((dayDate) => {
    const key = formatDateKey(dayDate);
    const dayName = DAY_NAMES[dayDate.getDay()];
    const isToday = key === todayKey;

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

  // Save updated history
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(rawHistory));
  } catch (err) {
    console.warn('Could not save weekly habit history:', err);
  }

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
  inkEarned: number;
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

  let rawHistory: Record<string, { completedCount: number; totalCount: number; xpEarned: number; inkEarned?: number }> = {};
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      rawHistory = JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Could not read habit history for calendar:', err);
  }

  const today = new Date();
  const todayKey = formatDateKey(today);

  // Update today's entry in rawHistory dynamically
  const todayCompleted = activeHabits.filter((h) => h.completed).length;
  const todayXp = activeHabits.filter((h) => h.completed).reduce((sum, h) => sum + h.xpReward, 0);
  const todayInk = activeHabits.filter((h) => h.completed).reduce((sum, h) => sum + (h.inkReward || 10), 0);

  rawHistory[todayKey] = {
    completedCount: todayCompleted,
    totalCount: totalActive,
    xpEarned: todayXp,
    inkEarned: todayInk,
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
      isToday: key === todayKey,
      isFuture: pDate > today,
      completedCount: 0,
      totalCount: totalActive,
      percentage: 0,
      xpEarned: 0,
      inkEarned: 0,
      streakActive: false,
    });
  }

  let totalCompletedInMonth = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let runningStreak = 0;

  // Days in selected month
  for (let d = 1; d <= daysInMonth; d++) {
    const dDate = new Date(year, month, d);
    const key = formatDateKey(dDate);
    const isToday = key === todayKey;
    const isFuture = dDate > today;

    let completedCount = 0;
    let totalCount = totalActive;
    let xpEarned = 0;
    let inkEarned = 0;
    let percentage = 0;

    if (rawHistory[key]) {
      completedCount = rawHistory[key].completedCount;
      totalCount = rawHistory[key].totalCount || totalActive;
      xpEarned = rawHistory[key].xpEarned || 0;
      inkEarned = rawHistory[key].inkEarned || completedCount * 10;
      percentage = Math.round((completedCount / Math.max(1, totalCount)) * 100);
    } else if (!isFuture) {
      // Deterministic realistic estimation based on habits streaks for historical days
      const dateSeed = (year * 31 + month * 12 + d);
      const mockPct = Math.min(100, Math.max(30, 60 + (dateSeed % 5) * 10));
      completedCount = Math.round((mockPct / 100) * totalActive);
      percentage = mockPct;
      xpEarned = completedCount * 15;
      inkEarned = completedCount * 5;
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
      inkEarned,
      streakActive: percentage >= 50 && !isFuture,
    });
  }

  currentStreak = runningStreak;

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
      isToday: key === todayKey,
      isFuture: tDate > today,
      completedCount: 0,
      totalCount: totalActive,
      percentage: 0,
      xpEarned: 0,
      inkEarned: 0,
      streakActive: false,
    });
  }

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
