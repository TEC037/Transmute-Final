<script lang="ts">
  import type { HabitCard } from '../types';

  interface Props {
    habits: HabitCard[];
    userLevel: number;
    onToggleHabit: (id: string) => void;
    onIncrementCounter: (id: string) => void;
    onOpenNewHabitModal: () => void;
    onEditHabitRequest: (habit: HabitCard) => void;
    onDeleteHabit: (id: string) => void;
    onOpenDailySummary: () => void;
  }

  let {
    habits,
    userLevel,
    onToggleHabit,
    onIncrementCounter,
    onOpenNewHabitModal,
    onEditHabitRequest,
    onDeleteHabit,
    onOpenDailySummary,
  }: Props = $props();

  let activeHabits = $derived(habits.filter((h) => h.minLevel <= userLevel));
  let completedHabits = $derived(activeHabits.filter((h) => h.completed));

  let completionPercent = $derived(
    activeHabits.length > 0
      ? Math.round((completedHabits.length / activeHabits.length) * 100)
      : 0
  );
</script>

<div class="flex flex-col gap-6 max-w-xl mx-auto pb-16">
  <!-- Top Daily Progress Banner -->
  <section class="bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] wobbly-border flex justify-between items-center gap-4">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 border-[2.5px] border-black bg-amber-300 text-black flex items-center justify-center shrink-0 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span class="material-symbols-outlined text-2xl">calendar_today</span>
      </div>
      <div>
        <h3 class="font-headline text-lg md:text-xl font-extrabold text-black leading-tight">
          Avance de Hoy ({completionPercent}%)
        </h3>
        <p class="font-mono-label text-[11px] text-neutral-600 font-bold">
          {completedHabits.length} DE {activeHabits.length} HÁBITOS COMPLETADOS
        </p>
      </div>
    </div>

    <button
      type="button"
      onclick={onOpenDailySummary}
      class="px-3.5 py-2 bg-black text-white border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
    >
      <span class="material-symbols-outlined text-base text-amber-300">analytics</span>
      RESUMEN DIARIO
    </button>
  </section>

  <!-- Section Header -->
  <div class="flex justify-between items-end border-b-2 border-black pb-2">
    <div>
      <h2 class="font-headline text-3xl md:text-4xl text-black font-extrabold rotate-[-1deg] leading-tight">
        Mazo de Hábitos
      </h2>
      <p class="text-xs text-neutral-600 font-medium">
        Tarjetas de hábitos diarios para transmutar tu rutina
      </p>
    </div>
    <div class="flex flex-col items-end gap-1">
      <span class="font-mono-label text-xs font-bold text-neutral-600 uppercase">
        {activeHabits.length}/{habits.length} CARDS
      </span>
      <button
        type="button"
        onclick={onOpenNewHabitModal}
        class="bg-white border-[2.5px] border-black px-3 py-1.5 font-headline text-xs font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 transition-all cursor-pointer flex items-center gap-1"
      >
        <span class="material-symbols-outlined text-base">add_circle</span>
        Nuevo Hábito
      </button>
    </div>
  </div>

  <!-- Habit Cards Stack -->
  <div class="flex flex-col gap-5">
    {#each habits as habit (habit.id)}
      {@const isLocked = habit.minLevel > userLevel}

      {#if isLocked}
        <div
          class="relative bg-neutral-200 border-[3px] border-black p-4 wobbly-border opacity-75 group overflow-hidden grayscale select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
                    BLOQUEADO
                  </span>
                  <span class="font-mono-label text-[11px] text-neutral-700 font-bold">
                    Nivel {habit.minLevel} requerido
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center rotate-[4deg]">
              <span class="material-symbols-outlined text-3xl">lock</span>
              <span class="font-mono-label text-[10px] font-bold">LVL {habit.minLevel}</span>
            </div>
          </div>
        </div>

      {:else}
        <div
          class="group bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] wobbly-border relative overflow-hidden transition-all hover:rotate-[0.5deg] {habit.completed ? 'bg-neutral-50/90' : ''}"
        >
          <!-- Action controls header -->
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

            <div class="flex items-center gap-2">
              <!-- Edit & Delete options (Appear on card hover) -->
              <div class="flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 focus-within:opacity-100">
                <button
                  type="button"
                  onclick={() => onEditHabitRequest(habit)}
                  class="w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  title="Editar hábito"
                >
                  <span class="material-symbols-outlined text-base">edit</span>
                </button>

                <button
                  type="button"
                  onclick={() => onDeleteHabit(habit.id)}
                  class="w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center hover:bg-red-100 text-red-700 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  title="Eliminar hábito"
                >
                  <span class="material-symbols-outlined text-base">delete</span>
                </button>
              </div>

              <!-- Checkbox Toggle -->
              <button
                type="button"
                onclick={() => onToggleHabit(habit.id)}
                class="w-12 h-12 border-[3px] border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer {habit.completed ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'}"
                title={habit.completed ? 'Marcar como pendiente' : '¡Completar hábito!'}
              >
                <span class="material-symbols-outlined text-2xl font-bold">
                  {habit.completed ? 'done_all' : 'check'}
                </span>
              </button>
            </div>
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
      {/if}
    {/each}
  </div>
</div>
