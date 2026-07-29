import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from 'recharts';
import type { HabitCard } from '../types';
import { getWeeklyStats, type DailyHabitStat } from '../lib/habitHistory';

interface Props {
  habits: HabitCard[];
  userLevel: number;
}

type ChartType = 'bar' | 'area' | 'line';

// Custom Noir Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data: DailyHabitStat = payload[0].payload;
    return (
      <div className="bg-white border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
        <p className="font-mono text-xs font-bold uppercase border-b-2 border-black pb-1 mb-1.5">
          📅 {label} ({data.date})
        </p>
        <div className="space-y-1 text-xs">
          <p className="font-extrabold text-sm flex items-center justify-between gap-4">
            <span>Cumplimiento:</span>
            <span className="bg-black text-white px-1.5 py-0.5 rounded-none font-mono">
              {data.percentage}%
            </span>
          </p>
          <p className="font-medium text-neutral-700 flex justify-between gap-4">
            <span>Completados:</span>
            <span className="font-bold">{data.completedCount} / {data.totalCount}</span>
          </p>
          <p className="font-medium text-neutral-700 flex justify-between gap-4">
            <span>XP Ganado:</span>
            <span className="font-bold text-amber-700">+{data.xpEarned} XP</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const WeeklyHabitChartReact: React.FC<Props> = ({ habits, userLevel }) => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter habits if category selected
  const filteredHabits = useMemo(() => {
    if (selectedCategory === 'all') return habits;
    return habits.filter(
      (h) => h.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [habits, selectedCategory]);

  // Compute stats
  const stats = useMemo(() => {
    return getWeeklyStats(filteredHabits, userLevel);
  }, [filteredHabits, userLevel]);

  // Derived metrics
  const avgPercentage = useMemo(() => {
    if (stats.length === 0) return 0;
    const sum = stats.reduce((acc, s) => acc + s.percentage, 0);
    return Math.round(sum / stats.length);
  }, [stats]);

  const bestDay = useMemo(() => {
    if (stats.length === 0) return '-';
    const sorted = [...stats].sort((a, b) => b.percentage - a.percentage);
    return `${sorted[0].dayLabel} (${sorted[0].percentage}%)`;
  }, [stats]);

  const totalWeeklyCompleted = useMemo(() => {
    return stats.reduce((acc, s) => acc + s.completedCount, 0);
  }, [stats]);

  const totalWeeklyTarget = useMemo(() => {
    return stats.reduce((acc, s) => acc + s.totalCount, 0);
  }, [stats]);

  return (
    <div className="w-full bg-white border-[3px] border-black p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black select-none">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-[3px] border-black pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-black font-bold">
              analytics
            </span>
            <h3 className="font-headline text-xl sm:text-2xl font-extrabold uppercase tracking-tight">
              Rendimiento Semanal Noir
            </h3>
          </div>
          <p className="text-xs text-neutral-600 font-bold mt-0.5">
            Porcentaje de hábitos completados en los últimos 7 días
          </p>
        </div>

        {/* Chart View Selector Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
            title="Gráfico de Barras"
          >
            Barras
          </button>
          <button
            type="button"
            onClick={() => setChartType('area')}
            className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
              chartType === 'area'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
            title="Gráfico de Área"
          >
            Área
          </button>
          <button
            type="button"
            onClick={() => setChartType('line')}
            className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
              chartType === 'line'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
            title="Línea de Tendencia"
          >
            Línea
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <div className="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase block">
            Promedio Semanal
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-headline text-2xl font-black">{avgPercentage}%</span>
            <span className="text-[10px] font-bold text-green-700">Meta: 80%</span>
          </div>
        </div>

        <div className="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase block">
            Día Top
          </span>
          <span className="font-headline text-lg sm:text-xl font-black mt-0.5 block truncate">
            {bestDay}
          </span>
        </div>

        <div className="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase block">
            Hábitos Logrados
          </span>
          <span className="font-headline text-xl font-black mt-0.5 block">
            {totalWeeklyCompleted} / {totalWeeklyTarget}
          </span>
        </div>

        <div className="p-2.5 bg-[#f3f3f4] border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase block">
            Estado Racha
          </span>
          <span className="font-headline text-lg font-black mt-0.5 text-black flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-black">local_fire_department</span>
            {avgPercentage >= 70 ? 'Alquimia Viva 🔥' : 'En Crecimiento'}
          </span>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <span className="text-xs font-mono font-bold uppercase shrink-0">Filtrar:</span>
        {['all', 'mental', 'salud', 'rutina', 'daily'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-2 py-0.5 text-[11px] font-mono font-bold uppercase border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {cat === 'all' ? 'Todos los Hábitos' : cat}
          </button>
        ))}
      </div>

      {/* Recharts Render Container */}
      <div className="w-full h-56 sm:h-64 pt-2 pb-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis
                dataKey="dayLabel"
                tick={{ fill: '#000000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#000000', strokeWidth: 2 }}
                tickLine={{ stroke: '#000000' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#000000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#000000', strokeWidth: 2 }}
                tickLine={{ stroke: '#000000' }}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={80} stroke="#000000" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Meta 80%', fill: '#000', fontSize: 10, fontWeight: 'bold', position: 'top' }} />
              <Bar dataKey="percentage" radius={[4, 4, 0, 0]} barSize={28}>
                {stats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.percentage >= 80 ? '#000000' : entry.percentage >= 50 ? '#404040' : '#888888'}
                    stroke="#000000"
                    strokeWidth={2}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : chartType === 'area' ? (
            <AreaChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="noirGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis
                dataKey="dayLabel"
                tick={{ fill: '#000000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#000000', strokeWidth: 2 }}
                tickLine={{ stroke: '#000000' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#000000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#000000', strokeWidth: 2 }}
                tickLine={{ stroke: '#000000' }}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={80} stroke="#000000" strokeDasharray="4 4" strokeWidth={1.5} />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#000000"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#noirGradient)"
              />
            </AreaChart>
          ) : (
            <LineChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis
                dataKey="dayLabel"
                tick={{ fill: '#000000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#000000', strokeWidth: 2 }}
                tickLine={{ stroke: '#000000' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#000000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' }}
                axisLine={{ stroke: '#000000', strokeWidth: 2 }}
                tickLine={{ stroke: '#000000' }}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={80} stroke="#000000" strokeDasharray="4 4" strokeWidth={1.5} />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#000000"
                strokeWidth={3.5}
                dot={{ r: 5, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#000000', stroke: '#000000', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer hint */}
      <div className="mt-3 border-t-2 border-black pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-700 font-bold">
        <span>🖤 Estética Noir Brutalista</span>
        <span>Haz hover o tap en cada día para ver detalles</span>
      </div>
    </div>
  );
};

export default WeeklyHabitChartReact;
