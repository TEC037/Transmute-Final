<script lang="ts">
  import type { HabitCard } from '../types';
  import { getWeeklyStats } from '../lib/habitHistory';

  interface Props {
    habits: HabitCard[];
    userLevel?: number;
  }

  let { habits, userLevel = 1 }: Props = $props();

  type ChartType = 'bar' | 'area' | 'line';
  let chartType = $state<ChartType>('bar');
  let selectedCategory = $state('all');
  let hoveredIndex = $state<number | null>(null);
  let tooltipX = $state(0);
  let tooltipY = $state(0);

  // Categories from habits
  const categories = $derived(() => {
    const cats = new Set(habits.map(h => h.category?.toLowerCase()));
    return ['all', ...Array.from(cats).filter(Boolean)];
  });

  // Filtered habits
  const filteredHabits = $derived(
    selectedCategory === 'all'
      ? habits
      : habits.filter(h => h.category?.toLowerCase() === selectedCategory.toLowerCase())
  );

  // Weekly stats
  const stats = $derived(getWeeklyStats(filteredHabits, userLevel));

  // Date range for display
  const dateRange = $derived(() => {
    if (stats.length === 0) return '';
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 6);
    const formatDate = (d: Date) => `${d.getDate()} ${d.toLocaleString('es', { month: 'short' })}`;
    return `${formatDate(weekAgo)} — ${formatDate(now)}`;
  });

  // KPI metrics
  const avgPercentage = $derived(
    stats.length === 0 ? 0 : Math.round(stats.reduce((acc, s) => acc + s.percentage, 0) / stats.length)
  );

  const bestDay = $derived(() => {
    if (stats.length === 0) return '-';
    const sorted = [...stats].sort((a, b) => b.percentage - a.percentage);
    return `${sorted[0].dayLabel.replace(' (Hoy)', '')} (${sorted[0].percentage}%)`;
  });

  const totalWeeklyCompleted = $derived(
    stats.reduce((acc, s) => acc + s.completedCount, 0)
  );

  const totalWeeklyTarget = $derived(
    stats.reduce((acc, s) => acc + s.totalCount, 0)
  );

  // SVG chart dimensions
  const CHART_W = 600;
  const CHART_H = 220;
  const PADDING = { top: 25, right: 20, bottom: 30, left: 45 };
  const plotW = CHART_W - PADDING.left - PADDING.right;
  const plotH = CHART_H - PADDING.top - PADDING.bottom;

  // X positions for each data point
  function xPos(i: number): number {
    const barW = plotW / Math.max(1, stats.length);
    return PADDING.left + barW * i + barW / 2;
  }

  // Y position for a percentage value
  function yPos(pct: number): number {
    return PADDING.top + plotH - (pct / 100) * plotH;
  }

  // Bar color based on percentage
  function barFill(pct: number): string {
    if (pct >= 80) return '#000000';
    if (pct >= 50) return '#404040';
    return '#888888';
  }

  // Area/line path
  const linePath = $derived(() => {
    if (stats.length === 0) return '';
    return stats.map((s, i) => `${i === 0 ? 'M' : 'L'}${xPos(i)},${yPos(s.percentage)}`).join(' ');
  });

  const areaPath = $derived(() => {
    if (stats.length === 0) return '';
    const line = stats.map((s, i) => `${i === 0 ? 'M' : 'L'}${xPos(i)},${yPos(s.percentage)}`).join(' ');
    return `${line} L${xPos(stats.length - 1)},${yPos(0)} L${xPos(0)},${yPos(0)} Z`;
  });

  // Y-axis ticks
  const yTicks = [0, 25, 50, 75, 100];

  // Grid lines
  const gridLines = $derived(
    yTicks.map(t => ({ y: yPos(t), label: `${t}%` }))
  );

  // Reference line at 80%
  const refLineY = $derived(yPos(80));

  function handleBarHover(e: MouseEvent, index: number) {
    hoveredIndex = index;
    const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    if (rect) {
      tooltipX = e.clientX - rect.left;
      tooltipY = e.clientY - rect.top - 10;
    }
  }

  function handleBarLeave() {
    hoveredIndex = null;
  }
</script>

<div class="w-full bg-white border-[3px] border-black p-4 sm:p-5 shadow-[5px_5px_0_0_rgba(0,0,0,1)] text-black select-none">
  <!-- Header & Title -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-[3px] border-black pb-3 mb-4">
    <div>
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-2xl text-black font-bold">analytics</span>
        <h3 class="font-headline text-xl sm:text-2xl font-extrabold uppercase tracking-tight">
          Rendimiento Semanal Noir
        </h3>
      </div>
      <p class="text-xs text-neutral-600 font-bold mt-0.5">
        Porcentaje de hábitos completados en los últimos 7 días
      </p>
      <p class="text-[10px] text-neutral-500 font-mono font-bold mt-0.5">
        {dateRange()}
      </p>
    </div>

    <!-- Chart View Selector Controls -->
    <div class="flex items-center gap-1.5 self-start sm:self-auto">
      {#each [
        { type: 'bar' as ChartType, label: 'Barras' },
        { type: 'area' as ChartType, label: 'Área' },
        { type: 'line' as ChartType, label: 'Línea' },
      ] as btn}
        <button
          type="button"
          onclick={() => (chartType = btn.type)}
          class="px-2.5 py-1 text-xs font-mono font-bold uppercase border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer {chartType === btn.type
            ? 'bg-black text-white'
            : 'bg-white text-black hover:bg-neutral-100'}"
        >
          {btn.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- KPI Cards -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
    <div class="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <span class="text-[10px] font-mono font-bold text-neutral-600 uppercase block">Promedio Semanal</span>
      <div class="flex items-baseline gap-1 mt-0.5">
        <span class="font-headline text-2xl font-black">{avgPercentage}%</span>
        <span class="text-[10px] font-bold text-green-700">Meta: 80%</span>
      </div>
    </div>

    <div class="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <span class="text-[10px] font-mono font-bold text-neutral-600 uppercase block">Día Top</span>
      <span class="font-headline text-lg sm:text-xl font-black mt-0.5 block break-words">
        {bestDay()}
      </span>
    </div>

    <div class="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <span class="text-[10px] font-mono font-bold text-neutral-600 uppercase block">Hábitos Logrados</span>
      <span class="font-headline text-xl font-black mt-0.5 block">
        {totalWeeklyCompleted} / {totalWeeklyTarget}
      </span>
    </div>

    <div class="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <span class="text-[10px] font-mono font-bold text-neutral-600 uppercase block">Estado Racha</span>
      <span class="font-headline text-lg font-black mt-0.5 text-black flex items-center gap-1">
        <span class="material-symbols-outlined text-sm text-black">local_fire_department</span>
        {avgPercentage >= 70 ? 'Alquimia Viva' : 'En Crecimiento'}
      </span>
    </div>
  </div>

  <!-- Category filter -->
  <div class="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
    <span class="text-xs font-mono font-bold uppercase shrink-0">Filtrar:</span>
    {#each categories() as cat}
      <button
        type="button"
        onclick={() => (selectedCategory = cat)}
        class="px-2 py-0.5 text-[11px] font-mono font-bold uppercase border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)] cursor-pointer whitespace-nowrap {selectedCategory === cat
          ? 'bg-black text-white'
          : 'bg-white text-black hover:bg-neutral-200'}"
      >
        {cat === 'all' ? 'Todos los Hábitos' : cat}
      </button>
    {/each}
  </div>

  <!-- SVG Chart -->
  <div class="w-full relative" style="aspect-ratio: {CHART_W}/{CHART_H};">
    <svg
      viewBox="0 0 {CHART_W} {CHART_H}"
      class="w-full h-full"
      role="img"
      aria-label="Gráfico semanal de rendimiento de hábitos"
    >
      <!-- Grid lines -->
      {#each gridLines as gl}
        <line
          x1={PADDING.left}
          y1={gl.y}
          x2={CHART_W - PADDING.right}
          y2={gl.y}
          stroke="#e0e0e0"
          stroke-dasharray="3 3"
        />
        <text
          x={PADDING.left - 6}
          y={gl.y + 4}
          text-anchor="end"
          class=""
          fill="#000000"
          font-size="10"
          font-weight="bold"
          font-family="monospace"
        >
          {gl.label}
        </text>
      {/each}

      <!-- Reference line at 80% -->
      <line
        x1={PADDING.left}
        y1={refLineY}
        x2={CHART_W - PADDING.right}
        y2={refLineY}
        stroke="#000000"
        stroke-dasharray="4 4"
        stroke-width="1.5"
      />
      <text
        x={CHART_W - PADDING.right + 4}
        y={refLineY + 3}
        fill="#000"
        font-size="9"
        font-weight="bold"
        font-family="monospace"
      >
        Meta 80%
      </text>

      <!-- X-axis line -->
      <line
        x1={PADDING.left}
        y1={PADDING.top + plotH}
        x2={CHART_W - PADDING.right}
        y2={PADDING.top + plotH}
        stroke="#000000"
        stroke-width="2"
      />
      <!-- Y-axis line -->
      <line
        x1={PADDING.left}
        y1={PADDING.top}
        x2={PADDING.left}
        y2={PADDING.top + plotH}
        stroke="#000000"
        stroke-width="2"
      />

      <!-- Bar Chart -->
      {#if chartType === 'bar'}
        {#each stats as entry, i}
          {@const barW = Math.min(32, (plotW / stats.length) * 0.6)}
          {@const barH = (entry.percentage / 100) * plotH}
          {@const bx = xPos(i) - barW / 2}
          {@const by = yPos(entry.percentage)}
          <rect
            x={bx}
            y={by}
            width={barW}
            height={barH}
            fill={barFill(entry.percentage)}
            stroke="#000000"
            stroke-width="2"
            rx="0"
            class="chart-bar"
            onmouseenter={(e) => handleBarHover(e, i)}
            onmouseleave={handleBarLeave}
            role="presentation"
          />
        {/each}
      {/if}

      <!-- Area Chart -->
      {#if chartType === 'area'}
        <defs>
          <linearGradient id="noirGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stop-color="#000000" stop-opacity="0.8" />
            <stop offset="95%" stop-color="#000000" stop-opacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={areaPath()}
          fill="url(#noirGradient)"
          class="chart-area"
        />
        <path
          d={linePath()}
          fill="none"
          stroke="#000000"
          stroke-width="3"
          class="chart-line"
        />
        {#each stats as entry, i}
          <circle
            cx={xPos(i)}
            cy={yPos(entry.percentage)}
            r={hoveredIndex === i ? 6 : 4}
            fill="#000000"
            stroke="#ffffff"
            stroke-width="2"
            onmouseenter={(e) => handleBarHover(e, i)}
            onmouseleave={handleBarLeave}
            class="chart-dot"
            role="presentation"
          />
        {/each}
      {/if}

      <!-- Line Chart -->
      {#if chartType === 'line'}
        <path
          d={linePath()}
          fill="none"
          stroke="#000000"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="chart-line"
        />
        {#each stats as entry, i}
          <circle
            cx={xPos(i)}
            cy={yPos(entry.percentage)}
            r={hoveredIndex === i ? 7 : 5}
            fill="#000000"
            stroke="#ffffff"
            stroke-width="2"
            onmouseenter={(e) => handleBarHover(e, i)}
            onmouseleave={handleBarLeave}
            class="chart-dot"
            role="presentation"
          />
        {/each}
      {/if}

      <!-- X-axis labels -->
      {#each stats as entry, i}
        <text
          x={xPos(i)}
          y={PADDING.top + plotH + 18}
          text-anchor="middle"
          fill="#000000"
          font-size="10"
          font-weight="bold"
          font-family="monospace"
          onmouseenter={(e) => handleBarHover(e, i)}
          onmouseleave={handleBarLeave}
          role="presentation"
        >
          {entry.dayLabel}
        </text>
      {/each}

      <!-- Invisible hit areas for tooltip (for all chart types) -->
      {#each stats as entry, i}
        {@const hitW = plotW / stats.length}
        <rect
          x={PADDING.left + hitW * i}
          y={PADDING.top}
          width={hitW}
          height={plotH}
          fill="transparent"
          onmouseenter={(e) => handleBarHover(e, i)}
          onmouseleave={handleBarLeave}
          role="presentation"
        />
      {/each}
    </svg>

    <!-- Tooltip -->
    {#if hoveredIndex !== null && stats[hoveredIndex]}
      {@const entry = stats[hoveredIndex]}
      <div
        class="absolute z-10 pointer-events-none bg-white border-[3px] border-black p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] text-black"
        style="left: {Math.min(tooltipX, CHART_W * 0.55)}px; top: {Math.max(0, tooltipY - 80)}px;"
      >
        <p class="font-mono text-xs font-bold uppercase border-b-2 border-black pb-1 mb-1.5 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">calendar_month</span>
          {entry.dayLabel} ({entry.date})
        </p>
        <div class="space-y-1 text-xs">
          <p class="font-extrabold text-sm flex items-center justify-between gap-4">
            <span>Cumplimiento:</span>
            <span class="bg-black text-white px-1.5 py-0.5 font-mono">{entry.percentage}%</span>
          </p>
          <p class="font-medium text-neutral-700 flex justify-between gap-4">
            <span>Completados:</span>
            <span class="font-bold">{entry.completedCount} / {entry.totalCount}</span>
          </p>
          <p class="font-medium text-neutral-700 flex justify-between gap-4">
            <span>XP Ganado:</span>
            <span class="font-bold text-amber-700">+{entry.xpEarned} XP</span>
          </p>
        </div>
      </div>
    {/if}
  </div>

  <!-- Footer hint -->
  <div class="mt-3 border-t-2 border-black pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-700 font-bold">
    <span class="flex items-center gap-1">
      <span class="material-symbols-outlined text-xs">dark_mode</span>
      Estética Noir Brutalista
    </span>
    <span>Haz hover o tap en cada día para ver detalles</span>
  </div>
</div>

<style>
  .chart-bar {
    transition: opacity 0.15s ease;
  }
  .chart-bar:hover {
    opacity: 0.8;
  }
  .chart-dot {
    transition: r 0.15s ease;
    cursor: pointer;
  }
  .chart-line {
    transition: stroke-width 0.2s ease;
  }
  .chart-area {
    transition: opacity 0.2s ease;
  }
</style>
