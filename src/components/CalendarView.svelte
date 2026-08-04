<script lang="ts">
  import type { HabitCard } from '../types';
  import { getMonthlyCalendarData, type CalendarDayStat } from '../lib/habitHistory';
  import WeeklyHabitChart from './WeeklyHabitChart.svelte';
  import { popIn, popOut, overlayFade } from '../lib/modalTransitions';

  interface Props {
    habits: HabitCard[];
    userLevel: number;
  }

  let { habits, userLevel }: Props = $props();

  const now = new Date();
  let currentYear = $state(now.getFullYear());
  let currentMonth = $state(now.getMonth()); // 0-indexed

  let selectedDay = $state<CalendarDayStat | null>(null);

  let calendarData = $derived(
    getMonthlyCalendarData(currentYear, currentMonth, habits, userLevel)
  );

  const prevMonth = () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear -= 1;
    } else {
      currentMonth -= 1;
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }
  };

  const resetToToday = () => {
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
  };

  const WEEKDAY_NAMES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
</script>

<div class="flex flex-col gap-6 max-w-2xl mx-auto pb-16 select-none">
  <!-- Header & Navigation -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-black pb-3 gap-3">
    <div>
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-3xl text-black">calendar_month</span>
        <h2 class="font-headline text-3xl md:text-4xl text-black font-extrabold tracking-tight leading-none">
          Calendario Vintage
        </h2>
      </div>
      <p class="text-xs text-neutral-600 font-bold mt-1">
        Rastrea tus rachas de hábitos con marcos alquímicos y sellos de cera
      </p>
    </div>

    <!-- Month Selector Controls -->
    <div class="flex items-center gap-1.5 self-end sm:self-auto">
      <button
        type="button"
        onclick={prevMonth}
        class="w-9 h-9 bg-white text-black border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-neutral-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center font-bold cursor-pointer transition-all"
        title="Mes anterior"
      >
        <span class="material-symbols-outlined">chevron_left</span>
      </button>

      <span class="font-headline text-base font-black px-3 py-1 bg-black text-white border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] min-w-[130px] text-center uppercase tracking-wider">
        {calendarData.monthName} {calendarData.year}
      </span>

      <button
        type="button"
        onclick={nextMonth}
        class="w-9 h-9 bg-white text-black border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-neutral-100 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center font-bold cursor-pointer transition-all"
        title="Mes siguiente"
      >
        <span class="material-symbols-outlined">chevron_right</span>
      </button>

      <button
        type="button"
        onclick={resetToToday}
        class="px-2.5 py-1.5 bg-amber-300 text-black border-[2px] border-black font-mono-label text-xs font-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-amber-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ml-1"
        title="Ir a hoy"
      >
        Hoy
      </button>
    </div>
  </div>

  <!-- Racha & Monthly Stats Vintage Panel -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
    <!-- Current Streak -->
    <div class="bg-white border-[3px] border-black p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
      <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase tracking-wider">Racha Actual</span>
      <div class="flex items-center gap-1.5 mt-1">
        <span class="material-symbols-outlined text-2xl text-amber-500 font-bold">local_fire_department</span>
        <span class="font-headline text-2xl font-black text-black">{calendarData.currentStreak} días</span>
      </div>
    </div>

    <!-- Max Streak -->
    <div class="bg-white border-[3px] border-black p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
      <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase tracking-wider">Mejor Racha</span>
      <div class="flex items-center gap-1.5 mt-1">
        <span class="material-symbols-outlined text-2xl text-black font-bold">military_tech</span>
        <span class="font-headline text-2xl font-black text-black">{calendarData.maxStreak} días</span>
      </div>
    </div>

    <!-- Monthly Rate -->
    <div class="bg-white border-[3px] border-black p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
      <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase tracking-wider">Cumplimiento Mes</span>
      <div class="flex items-center gap-1.5 mt-1">
        <span class="material-symbols-outlined text-2xl text-black font-bold">pie_chart</span>
        <span class="font-headline text-2xl font-black text-black">{calendarData.completionRateMonth}%</span>
      </div>
    </div>

    <!-- Completed Count -->
    <div class="bg-white border-[3px] border-black p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
      <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase tracking-wider">Total Hábitos</span>
      <div class="flex items-center gap-1.5 mt-1">
        <span class="material-symbols-outlined text-2xl text-black font-bold">verified</span>
        <span class="font-headline text-2xl font-black text-black">{calendarData.totalCompletedInMonth}</span>
      </div>
    </div>
  </div>

  <!-- Vintage Stamp Legend -->
  <div class="bg-[#f3f3f4] border-[2px] border-black p-2.5 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-wrap items-center justify-around gap-2 text-xs font-mono font-bold">
    <div class="flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 bg-amber-300 border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)] inline-block"></span>
      <span>100% Sello de Oro</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 bg-black border border-black inline-block"></span>
      <span class="text-black">70%+ Tinta</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 bg-neutral-300 border border-black inline-block"></span>
      <span>40%+ Parcial</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 bg-white border border-dashed border-black inline-block"></span>
      <span class="text-neutral-500">Sin progreso</span>
    </div>
  </div>

  <!-- Calendar Grid Container with Vintage Frame -->
  <div class="bg-white border-[3px] border-black p-3 sm:p-5 shadow-[5px_5px_0_0_rgba(0,0,0,1)]">
    <!-- Weekday Labels -->
    <div class="grid grid-cols-7 gap-1.5 mb-2 text-center">
      {#each WEEKDAY_NAMES as dayName}
        <div class="font-mono-label text-xs font-black uppercase tracking-wider text-black bg-[#f0f0f0] border border-black py-1">
          {dayName}
        </div>
      {/each}
    </div>

    <!-- Calendar Days Grid -->
    <div class="grid grid-cols-7 gap-1.5 sm:gap-2">
      {#each calendarData.days as day (day.dateKey)}
        {@const isGold = day.isCurrentMonth && day.percentage >= 100}
        {@const isNoir = day.isCurrentMonth && day.percentage >= 70 && day.percentage < 100}
        {@const isPartial = day.isCurrentMonth && day.percentage >= 30 && day.percentage < 70}
        {@const isLow = day.isCurrentMonth && day.percentage > 0 && day.percentage < 30}
        {@const isZero = day.isCurrentMonth && day.percentage === 0 && !day.isFuture}

        <button
          type="button"
          onclick={() => day.isCurrentMonth && (selectedDay = day)}
          disabled={!day.isCurrentMonth}
          class="aspect-square relative p-1 border-[2.5px] transition-all flex flex-col justify-between cursor-pointer select-none group text-left {
            !day.isCurrentMonth
              ? 'bg-neutral-100 border-neutral-300 opacity-40 cursor-default shadow-none'
              : day.isToday
              ? 'ring-2 ring-black ring-offset-2 border-black font-extrabold shadow-[4px_4px_0_0_rgba(0,0,0,1)] -translate-y-0.5'
              : 'border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)]'
          } {
            isGold
              ? 'bg-amber-300 text-black'
              : isNoir
              ? 'bg-black text-white'
              : isPartial
              ? 'bg-neutral-200 text-black'
              : isLow
              ? 'bg-neutral-100 text-black'
              : isZero
              ? 'bg-white text-neutral-400 border-dashed'
              : 'bg-white text-black'
          }"
        >
          <!-- Vintage Stamp Top Serrated Accent -->
          <div class="flex justify-between items-start w-full">
            <span class="font-mono text-xs sm:text-sm font-black leading-none">
              {day.dayNumber}
            </span>

            {#if day.isToday}
              <span class="text-[8px] font-mono font-bold uppercase px-1 bg-black text-white border border-white">
                HOY
              </span>
            {/if}
          </div>

          <!-- Vintage Badge / Stamp Seal inside frame -->
          <div class="my-auto flex flex-col items-center justify-center">
            {#if isGold}
              <span class="material-symbols-outlined text-lg sm:text-2xl text-black font-extrabold animate-pulse" title="¡Transmutado al 100%!">
                verified
              </span>
              <span class="text-[8px] font-mono font-bold uppercase tracking-tight text-black hidden sm:block">
                100%
              </span>
            {:else if isNoir}
              <span class="material-symbols-outlined text-lg sm:text-2xl text-amber-300 font-bold" title="Racha Noir activa">
                local_fire_department
              </span>
              <span class="text-[8px] font-mono font-bold uppercase tracking-tight text-amber-300 hidden sm:block">
                {day.percentage}%
              </span>
            {:else if isPartial}
              <span class="material-symbols-outlined text-sm sm:text-base text-black font-bold">
                star_half
              </span>
              <span class="text-[8px] font-mono font-bold uppercase tracking-tight text-black hidden sm:block">
                {day.percentage}%
              </span>
            {:else if isLow}
              <span class="text-[9px] font-mono font-bold text-neutral-600">
                {day.percentage}%
              </span>
            {:else if isZero}
              <span class="material-symbols-outlined text-xs text-neutral-300">
                remove
              </span>
            {/if}
          </div>

          <!-- Bottom Micro Progress indicator bar -->
          {#if day.isCurrentMonth && !day.isFuture}
            <div class="w-full bg-neutral-300 h-1 border border-black overflow-hidden mt-0.5">
              <div
                class="h-full {isGold ? 'bg-black' : isNoir ? 'bg-amber-300' : 'bg-black'}"
                style="width: {day.percentage}%"
              ></div>
            </div>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- Weekly Performance Chart -->
  <WeeklyHabitChart {habits} {userLevel} />

  <!-- Day Detail Modal -->
  {#if selectedDay}
    <div
      in:overlayFade
      out:overlayFade
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        in:popIn
        out:popOut
        class="bg-white border-[3px] border-black p-5 sm:p-6 shadow-[5px_5px_0_0_rgba(0,0,0,1)] max-w-md w-full relative wobbly-border text-black max-h-[90vh] overflow-y-auto"
      >
        <!-- Close button -->
        <button
          type="button"
          onclick={() => (selectedDay = null)}
          class="absolute top-3 right-3 w-8 h-8 bg-black text-white border-[2px] border-black flex items-center justify-center font-bold text-lg hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          ✕
        </button>

        <div class="flex items-center gap-3 border-b-[3px] border-black pb-3 mb-4">
          <div class="w-12 h-12 border-[2px] border-black {selectedDay.percentage >= 100 ? 'bg-amber-300 text-black' : 'bg-black text-white'} flex items-center justify-center font-bold text-xl shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <span class="material-symbols-outlined text-2xl">
              {selectedDay.percentage >= 100 ? 'verified' : 'calendar_today'}
            </span>
          </div>
          <div>
            <span class="font-mono-label text-xs uppercase text-neutral-600 font-bold block">
              Detalle del Día
            </span>
            <h3 class="font-headline text-xl font-extrabold uppercase tracking-tight">
              {selectedDay.dateKey}
            </h3>
          </div>
        </div>

        <!-- Metric Details -->
        <div class="space-y-3 mb-5">
          <div class="flex justify-between items-center p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span class="font-mono text-xs font-bold uppercase">Cumplimiento:</span>
            <span class="font-headline text-lg font-black bg-black text-white px-2 py-0.5">
              {selectedDay.percentage}%
            </span>
          </div>

          <div class="flex justify-between items-center p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span class="font-mono text-xs font-bold uppercase">Hábitos Completados:</span>
            <span class="font-mono text-sm font-extrabold text-black">
              {selectedDay.completedCount} / {selectedDay.totalCount}
            </span>
          </div>

          <div class="flex justify-between items-center p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span class="font-mono text-xs font-bold uppercase">Recompensas Reclamadas:</span>
            <span class="font-mono text-xs font-extrabold text-black bg-white border border-black px-1.5 py-0.5">
              +{selectedDay.xpEarned} XP
            </span>
          </div>
        </div>

        <button
          type="button"
          onclick={() => (selectedDay = null)}
          class="w-full py-2.5 bg-black text-white border-[2px] border-black font-headline text-sm font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-800 cursor-pointer transition-all"
        >
          CERRAR MARCO
        </button>
      </div>
    </div>
  {/if}
</div>
