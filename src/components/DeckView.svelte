<script lang="ts">
  import type { HabitCard } from '../types';

  interface Props {
    habits: HabitCard[];
    userLevel: number;
    onToggleHabit: (id: string) => void;
    onIncrementCounter: (id: string) => void;
    onOpenNewHabitModal: () => void;
  }

  let {
    habits,
    userLevel,
    onToggleHabit,
    onIncrementCounter,
    onOpenNewHabitModal,
  }: Props = $props();

  let activeCardsCount = $derived(habits.filter(h => h.minLevel <= userLevel).length);
  let totalCardsCount = $derived(habits.length);
</script>

<div class="flex flex-col gap-6 max-w-xl mx-auto">
  <!-- Section Header -->
  <div class="flex justify-between items-end border-b-2 border-black pb-2">
    <div>
      <h2 class="font-headline text-3xl md:text-4xl text-black font-extrabold rotate-[-1deg] leading-tight">
        Your Deck
      </h2>
      <p class="text-xs text-neutral-600 font-medium">
        Tarjetas de hábitos diarios para transmutar tu rutina
      </p>
    </div>
    <div class="flex flex-col items-end gap-1">
      <span class="font-mono-label text-xs font-bold text-neutral-600 uppercase">
        {activeCardsCount}/{totalCardsCount} CARDS
      </span>
      <button
        type="button"
        onclick={onOpenNewHabitModal}
        class="bg-white border-[2px] border-black px-2.5 py-1 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-neutral-100 transition-all cursor-pointer flex items-center gap-1"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        Nuevo Cromo
      </button>
    </div>
  </div>

  <!-- Habit Cards Stack -->
  <div class="flex flex-col gap-5">
    {#each habits as habit (habit.id)}
      {@const isLocked = habit.minLevel > userLevel}

      {#if isLocked}
        <div
          class="relative bg-neutral-200 border-[3px] border-black p-4 wobbly-border opacity-75 group overflow-hidden grayscale select-none"
        >
          <div class="absolute inset-0 halftone-bg z-0 pointer-events-none"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div class="flex gap-4 items-center">
              <div class="w-14 h-14 border-[3px] border-black bg-neutral-300 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-3xl opacity-60">
                  {habit.icon || 'lock'}
                </span>
              </div>
              <div>
                <h3 class="font-headline text-xl font-bold leading-tight text-neutral-700">
                  {habit.title}
                </h3>
                <div class="mt-1 flex items-center gap-2">
                  <span class="font-mono-label text-[10px] bg-black text-white px-2 py-0.5 uppercase font-bold tracking-wider">
                    LOCKED
                  </span>
                  <span class="font-mono-label text-[11px] text-neutral-700 font-bold">
                    Nivel {habit.minLevel} requerido
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center rotate-[4deg] group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-4xl">lock</span>
              <span class="font-mono-label text-[10px] font-bold">LVL {habit.minLevel}</span>
            </div>
          </div>
        </div>

      {:else if habit.targetType === 'checkbox'}
        <div
          class="group bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] wobbly-border relative overflow-hidden transition-all hover:rotate-[0.5deg] {habit.completed ? 'bg-neutral-50/90' : ''}"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex gap-3.5 items-center">
              <div class="w-14 h-14 border-[3px] border-black bg-[#f3f3f4] flex items-center justify-center rotate-[-3deg] group-hover:rotate-[2deg] transition-transform shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span
                  class="material-symbols-outlined text-3xl text-black {habit.completed ? 'fill-1' : ''}"
                >
                  {habit.icon || 'visibility'}
                </span>
              </div>
              <div>
                <h3
                  class="font-headline text-xl md:text-2xl font-extrabold leading-none {habit.completed ? 'line-through text-neutral-600' : 'text-black'}"
                >
                  {habit.title}
                </h3>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <span class="material-symbols-outlined text-sm fill-1 text-black">
                    local_fire_department
                  </span>
                  <span class="font-mono-label text-xs font-bold text-black">
                    {habit.streak}-DÍAS RACHA
                  </span>
                  <span class="text-xs font-bold text-neutral-600 ml-1">
                    (+{habit.xpReward} XP)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onclick={() => onToggleHabit(habit.id)}
              class="w-13 h-13 border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer {habit.completed ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'}"
              title={habit.completed ? 'Marcar como pendiente' : '¡Completar hábito!'}
            >
              <span class="material-symbols-outlined text-3xl font-bold">
                {habit.completed ? 'done_all' : 'check'}
              </span>
            </button>
          </div>

          <!-- Tags -->
          <div class="mt-3.5 flex flex-wrap gap-2">
            {#each habit.tags as tag, idx (idx)}
              <span
                class="bg-neutral-200 text-black px-2 py-0.5 font-mono-label text-[10px] font-bold uppercase border-[2px] border-black"
              >
                {tag}
              </span>
            {/each}
          </div>
        </div>

      {:else}
        <!-- Counter Habit -->
        {@const progressPercent = Math.min(100, Math.round((habit.currentCount / habit.targetCount) * 100))}
        <div
          class="group bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] wobbly-border relative overflow-hidden transition-all hover:-translate-y-0.5"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex gap-3.5 items-center">
              <div class="w-14 h-14 border-[3px] border-black bg-[#f3f3f4] flex items-center justify-center rotate-[2deg] group-hover:rotate-[-3deg] transition-transform shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span class="material-symbols-outlined text-3xl text-black">
                  {habit.icon || 'water_drop'}
                </span>
              </div>
              <div>
                <h3 class="font-headline text-xl md:text-2xl font-extrabold leading-none text-black">
                  {habit.title}
                </h3>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <span class="material-symbols-outlined text-sm fill-1 text-black">
                    local_fire_department
                  </span>
                  <span class="font-mono-label text-xs font-bold text-black">
                    {habit.streak}-DÍAS RACHA
                  </span>
                  <span class="text-xs font-bold text-neutral-600 ml-1">
                    (+{habit.xpReward} XP)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onclick={() => onIncrementCounter(habit.id)}
              class="w-13 h-13 bg-white border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-black hover:text-white transition-all cursor-pointer"
              title="Añadir 1 {habit.unit}"
            >
              <span class="material-symbols-outlined text-3xl font-bold">add</span>
            </button>
          </div>

          <!-- Progress Bar & Counter -->
          <div class="mt-4">
            <div class="flex justify-between items-center mb-1">
              <div class="flex gap-1.5">
                {#each habit.tags as tag, idx (idx)}
                  <span
                    class="bg-neutral-200 text-black px-1.5 py-0.5 font-mono-label text-[10px] font-bold uppercase border-[1.5px] border-black"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
              <span class="font-mono-label text-xs font-bold text-black">
                {habit.currentCount}/{habit.targetCount} {habit.unit}
              </span>
            </div>

            <div class="w-full h-4 border-[3px] border-black bg-neutral-200 relative overflow-hidden">
              <div
                class="h-full bg-black transition-all duration-300 halftone"
                style="width: {progressPercent}%;"
              ></div>
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>
