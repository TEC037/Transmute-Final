
<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { HabitCard } from '../types';
  import Tooltip from './Tooltip.svelte';
  import ConfirmModal from './ConfirmModal.svelte';

  interface Props {
    habits: HabitCard[];
    userLevel: number;
    onToggleHabit: (id: string) => void;
    onFailHabit: (id: string) => void;
    onRestoreHabit: (id: string) => void;
    onIncrementCounter: (id: string) => void;
    onOpenNewHabitModal: () => void;
    onEditHabitRequest: (habit: HabitCard) => void;
    onDeleteHabit: (id: string) => void;
    onOpenDailyShare: () => void;
  }

  let {
    habits,
    userLevel,
    onToggleHabit,
    onFailHabit,
    onRestoreHabit,
    onIncrementCounter,
    onOpenNewHabitModal,
    onEditHabitRequest,
    onDeleteHabit,
    onOpenDailyShare,
  }: Props = $props();

  // Derived helpers for display
  const activeHabits = $derived(habits.filter((h) => h.minLevel <= 9999));
  const completedHabits = $derived(activeHabits.filter((h) => h.completed));
  const failedHabits = $derived(activeHabits.filter((h) => h.failed));
  const pendingHabits = $derived(activeHabits.filter((h) => !h.completed && !h.failed));
  const lockedHabits = $derived(habits.filter((h) => h.minLevel > 9999));
  const completionPercent = $derived(
    activeHabits.length > 0 ? Math.round((completedHabits.length / activeHabits.length) * 100) : 0
  );

  // Swipe deck (Tinder-style)
  const SWIPE_THRESHOLD = 120;
  const MAX_ANGLE = 28;
  const MAX_FAN = 5;
  const FAN_ANGLES = [0, 2.5, -2.5, 4.5, -4.5];

  const deckCards = $derived(pendingHabits.slice(0, MAX_FAN));

  let dragId = $state<string | null>(null);
  let dragX = $state(0);
  let dragY = $state(0);
  let startX = $state(0);
  let startY = $state(0);
  let leaving = $state<{ id: string; dir: 'left' | 'right' } | null>(null);
  let leaveTimer: number | undefined;

  const dragRotate = $derived(
    Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, (dragX / SWIPE_THRESHOLD) * MAX_ANGLE))
  );

  // Failure acknowledgment modal
  let habitToFail = $state<HabitCard | null>(null);

  // Delete confirmation modal
  let habitToDelete = $state<HabitCard | null>(null);

  // Restore animation tracking
  let prevCompletedIds = $derived(new Set(habits.filter((h) => h.completed).map((h) => h.id)));
  let prevFailedIds = $derived(new Set(habits.filter((h) => h.failed).map((h) => h.id)));
  let restoreFlashId = $state<string | null>(null);
  let flashTimer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    const completed = new Set(habits.filter((h) => h.completed).map((h) => h.id));
    const failed = new Set(habits.filter((h) => h.failed).map((h) => h.id));

    for (const id of prevCompletedIds) {
      if (!completed.has(id)) {
        const h = habits.find((h) => h.id === id);
        if (h && !h.completed && !h.failed) {
          restoreFlashId = id;
          if (flashTimer) clearTimeout(flashTimer);
          flashTimer = setTimeout(() => { restoreFlashId = null; }, 600);
        }
      }
    }
    for (const id of prevFailedIds) {
      if (!failed.has(id)) {
        const h = habits.find((h) => h.id === id);
        if (h && !h.completed && !h.failed) {
          restoreFlashId = id;
          if (flashTimer) clearTimeout(flashTimer);
          flashTimer = setTimeout(() => { restoreFlashId = null; }, 600);
        }
      }
    }
  });

  onDestroy(() => {
    if (leaveTimer) clearTimeout(leaveTimer);
  });

  const resetDrag = () => {
    dragId = null;
    dragX = 0;
    dragY = 0;
    startX = 0;
    startY = 0;
  };

  const startDrag = (e: PointerEvent, habit: HabitCard) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (habit.completed || habit.failed || leaving) return;
    dragId = habit.id;
    startX = e.clientX;
    startY = e.clientY;
    dragX = 0;
    dragY = 0;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* jsdom / unsupported */
    }
  };

  const onDragMove = (e: PointerEvent) => {
    if (!dragId) return;
    dragX = e.clientX - startX;
    dragY = e.clientY - startY;
  };

  const commitSwipe = (habitId: string, dir: 'left' | 'right', commit: (id: string) => void) => {
    leaving = { id: habitId, dir };
    dragId = null;
    if (leaveTimer) clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => {
      commit(habitId);
      leaving = null;
    }, 320);
  };

  const endDrag = () => {
    if (!dragId) return;
    const habit = habits.find((h) => h.id === dragId);
    if (!habit) {
      resetDrag();
      return;
    }
    if (dragX >= SWIPE_THRESHOLD) {
      if (habit.targetType === 'counter' && habit.currentCount + 1 < habit.targetCount) {
        onIncrementCounter(habit.id);
        resetDrag();
      } else {
        const commit = habit.targetType === 'counter' ? onIncrementCounter : onToggleHabit;
        commitSwipe(habit.id, 'right', commit);
      }
    } else if (dragX <= -SWIPE_THRESHOLD) {
      habitToFail = habit;
    } else {
      resetDrag();
    }
  };

  const confirmFail = () => {
    const habit = habitToFail;
    if (!habit) return;
    habitToFail = null;
    commitSwipe(habit.id, 'left', onFailHabit);
  };

  const cancelFail = () => {
    habitToFail = null;
    resetDrag();
  };

  function cardStyle(habit: HabitCard, i: number): string {
    const isTop = i === 0;
    const isDragged = isTop && dragId === habit.id;
    const leavingCard = leaving?.id === habit.id;

    if (leavingCard && leaving) {
      const dir = leaving.dir === 'right' ? 1 : -1;
      return `translate(${dir * 720}px, ${dragY}px) rotate(${dir * MAX_ANGLE}deg) scale(1.02)`;
    }
    if (isDragged) {
      return `translate(${dragX}px, ${dragY}px) rotate(${dragRotate}deg) scale(1.02)`;
    }
    const fanOpen = dragId ? Math.min(1, Math.abs(dragX) / SWIPE_THRESHOLD) : 0;
    const angle = FAN_ANGLES[i % FAN_ANGLES.length];
    const spreadX = i % 2 ? 6 : -6;
    const scale = Math.max(0.82, 1 - i * 0.045);
    const y = i * 14 + fanOpen * i * 5;
    const rot = angle + fanOpen * (i % 2 ? 5 : -5);
    return `translate(${spreadX * (1 + fanOpen)}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
  }
</script>

<div class="flex flex-col gap-6 max-w-5xl mx-auto pb-16">
  <!-- Top Daily Progress Banner -->
  <section class="bg-white border-[3px] border-black p-4 shadow-[5px_5px_0_0_rgba(0,0,0,1)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 border-[2px] border-black bg-amber-300 text-black flex items-center justify-center shrink-0 font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
        <span class="material-symbols-outlined text-2xl">calendar_today</span>
      </div>
      <div>
        <h3 class="font-headline text-lg md:text-xl font-extrabold text-black leading-tight">
          Avance de Hoy ({completionPercent}%)
        </h3>
        <p class="font-mono-label text-[11px] text-neutral-600 font-bold">
          {completedHabits.length} REALIZADOS · {failedHabits.length} NO REALIZADOS · {pendingHabits.length} PENDIENTES
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2 self-end sm:self-auto">
      <button
        type="button"
        onclick={onOpenDailyShare}
        class="px-3.5 py-2 bg-black text-white border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
      >
        <span class="material-symbols-outlined text-base text-amber-300">share</span>
        COMPARTIR
      </button>
    </div>
  </section>

  <!-- Section Header -->
  <div class="flex justify-between items-end border-b-2 border-black pb-2">
    <div>
      <h2 class="font-headline text-3xl md:text-4xl text-black font-extrabold leading-tight">
        Mazo de Hábitos
      </h2>
      <p class="text-xs text-neutral-600 font-medium">
        Desliza cada hábito del mazo: a la derecha para completar · a la izquierda para reconocer el fallo
      </p>
    </div>
    <div class="flex flex-col items-end gap-1">
      <span class="font-mono-label text-xs font-bold text-neutral-600 uppercase">
        {activeHabits.length}/{habits.length} CARDS
      </span>
      <button
        type="button"
        onclick={onOpenNewHabitModal}
        class="bg-white border-[2px] border-black px-3 py-1.5 font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
      >
        <span class="material-symbols-outlined text-base">add_circle</span>
        Nuevo Hábito
      </button>
    </div>
  </div>

  <!-- Three-Block Board (mobile-first: deck on top, piles below; 3 columns on md+) -->
  <div class="pb-4 -mx-1 px-1">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">

      <!-- LEFT: No Realizados (Fallos reconocidos) -->
      <section class="flex flex-col gap-3 order-3 md:order-1">
        <div class="flex items-center gap-2 border-b-[3px] border-red-700 pb-2">
          <span class="material-symbols-outlined text-red-700 fill-1">heart_broken</span>
          <h3 class="font-headline text-sm font-extrabold text-red-700 uppercase tracking-wide">
            No Realizados
          </h3>
          <span class="font-mono-label text-[10px] font-extrabold text-white bg-red-700 border border-red-700 px-1.5 py-0.5 ml-auto">
            {failedHabits.length}
          </span>
        </div>

        {#if failedHabits.length === 0}
          <div class="border-[2px] border-dashed border-neutral-300 p-3 text-center">
            <p class="font-mono-label text-[10px] font-bold text-neutral-400 uppercase">
              Sin fallos reconocidos hoy
            </p>
          </div>
        {:else}
          <div class="flex flex-col gap-3">
            {#each failedHabits as habit (habit.id)}
              <div class="bg-neutral-100 border-[3px] border-red-700 p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
                <div class="flex items-start gap-2">
                  <div class="w-8 h-8 border-[2px] border-red-700 bg-white text-red-700 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-base">close</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="font-headline text-sm font-extrabold line-through text-neutral-500 break-words leading-snug">
                      {habit.title}
                    </h4>
                    <span class="font-mono-label text-[10px] font-bold text-red-700 uppercase">
                      Fallo reconocido · Racha {habit.streak}
                    </span>
                  </div>
                  <button
                    type="button"
                    onclick={() => onRestoreHabit(habit.id)}
                    class="w-7 h-7 border-[2px] border-black bg-white flex items-center justify-center shrink-0 hover:bg-neutral-200 transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                    title="Volver a pendientes"
                  >
                    <span class="material-symbols-outlined text-sm">undo</span>
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </section>

      <!-- CENTER: Hábitos del Día (Swipe deck) -->
      <section class="flex flex-col gap-3 order-1 md:order-2">
        <div class="flex items-center gap-2 border-b-[3px] border-black pb-2">
          <span class="material-symbols-outlined text-black fill-1">layers</span>
          <h3 class="font-headline text-sm font-extrabold text-black uppercase tracking-wide">
            Hábitos del Día
          </h3>
          <span class="font-mono-label text-[10px] font-extrabold text-black bg-neutral-200 border border-black px-1.5 py-0.5 ml-auto">
            {pendingHabits.length}
          </span>
        </div>

        {#if pendingHabits.length === 0}
          <div class="border-[2px] border-dashed border-neutral-300 p-3 text-center">
            <p class="font-mono-label text-[10px] font-bold text-neutral-400 uppercase">
              Todos los hábitos están resueltos
            </p>
          </div>
        {:else}
          <div class="relative h-[360px]">
            {#each deckCards as habit, i (habit.id)}
              {@const isTop = i === 0}
              {@const isDragged = isTop && dragId === habit.id}
              {@const isLeaving = leaving?.id === habit.id}

              <div
                data-habit-card
                role="button"
                tabindex="0"
                aria-label="Desliza {habit.title} para completar o reconocer fallo"
                class="absolute inset-x-0 top-0 mx-2 h-[250px] bg-white border-[3px] border-black p-4 shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none transition-transform duration-300 ease-out {restoreFlashId === habit.id ? 'animate-restore' : ''}"
                style:transform={cardStyle(habit, i)}
                style:z-index={deckCards.length - i + 10}
                style:opacity={isTop || isLeaving ? 1 : Math.max(0.55, 1 - i * 0.12)}
                style:pointer-events={isTop || isLeaving ? 'auto' : 'none'}
                style:transition={isDragged ? 'none' : undefined}
                onpointerdown={(e) => {
                  if (isTop) startDrag(e, habit);
                }}
                onpointermove={onDragMove}
                onpointerup={endDrag}
                onpointercancel={endDrag}
              >
                {#if isTop}
                  <!-- Tinder direction stamps -->
                  <div
                    class="absolute top-3 left-3 rotate-[-12deg] border-[3px] border-green-700 px-2.5 py-1 font-headline text-base font-extrabold uppercase text-green-700 bg-white/90 pointer-events-none"
                    style:opacity={dragX > 0 ? Math.min(1, dragX / 80) : 0}
                  >
                    Completar
                  </div>
                  <div
                    class="absolute top-3 right-3 rotate-[12deg] border-[3px] border-red-700 px-2.5 py-1 font-headline text-base font-extrabold uppercase text-red-700 bg-white/90 pointer-events-none"
                    style:opacity={dragX < 0 ? Math.min(1, -dragX / 80) : 0}
                  >
                    Fallo
                  </div>
                {/if}

                <div class="flex flex-col h-full">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5 shrink-0">
                      <span class="font-mono-label text-[9px] font-extrabold bg-black text-white px-1.5 py-0.5 uppercase tracking-wider">
                        {habit.category || 'Diario'}
                      </span>
                      {#if isTop}
                        <button
                          type="button"
                          onclick={() => onEditHabitRequest(habit)}
                          class="w-7 h-7 border-[2px] border-black bg-white flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                          title="Editar hábito"
                        >
                          <span class="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          type="button"
                          onclick={() => (habitToDelete = habit)}
                          class="w-7 h-7 border-[2px] border-black bg-white flex items-center justify-center hover:bg-red-100 text-red-700 transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                          title="Eliminar hábito"
                        >
                          <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                      {/if}
                    </div>
                  </div>

                  <h4 class="mt-2.5 font-headline text-2xl font-extrabold text-black leading-snug break-words">
                    {habit.title}
                  </h4>

                  <div class="mt-2 flex items-center gap-2 flex-wrap">
                    <span class="inline-flex items-center gap-1 border-[2px] border-black bg-neutral-50 px-1.5 py-0.5">
                      <span class="material-symbols-outlined text-xs fill-1 text-black">local_fire_department</span>
                      <Tooltip term="Racha" content="Días consecutivos completando al menos un hábito.">
                        <span class="font-mono-label text-[10px] font-bold text-black">{habit.streak} DÍAS</span>
                      </Tooltip>
                    </span>
                    <span class="inline-flex items-center border-[2px] border-black bg-amber-300 px-1.5 py-0.5">
                      <Tooltip term="XP" content="Recompensa de experiencia al completar el hábito.">
                        <span class="font-mono-label text-[10px] font-bold text-black">+{habit.xpReward} XP</span>
                      </Tooltip>
                    </span>
                  </div>

                  {#if habit.targetType === 'counter'}
                    <div class="mt-3 border-[2px] border-black bg-neutral-50 p-2">
                      <div class="flex items-center justify-between gap-2">
                        <span class="font-mono-label text-[10px] font-bold text-black">
                          {habit.currentCount}/{habit.targetCount} {habit.unit}
                        </span>
                        {#if habit.currentCount >= habit.targetCount}
                          <span class="font-mono-label text-[9px] font-extrabold text-green-700 bg-green-100 border border-green-700 px-1.5 py-0.5 uppercase">
                            ¡Meta alcanzada!
                          </span>
                        {:else}
                          <span class="font-mono-label text-[9px] font-bold text-neutral-500 uppercase">
                            Desliza → +1
                          </span>
                        {/if}
                      </div>
                      <div class="mt-1.5 w-full h-2 border border-black bg-neutral-200 overflow-hidden">
                        <div
                          class="h-full transition-all duration-300 {habit.currentCount >= habit.targetCount ? 'bg-green-700' : 'bg-black'}"
                          style="width: {Math.min(100, Math.round((habit.currentCount / Math.max(1, habit.targetCount)) * 100))}%;"
                        ></div>
                      </div>
                    </div>
                  {/if}

                  <div class="mt-auto flex items-center justify-between gap-2 border-[2px] border-dashed border-neutral-300 bg-neutral-50 px-2.5 py-1.5">
                    <span class="material-symbols-outlined text-sm text-neutral-400">swap_horiz</span>
                    <span class="font-mono-label text-[9px] font-bold text-neutral-500 uppercase text-center">
                      {habit.targetType === 'counter' ? 'Desliza a la derecha para +1 rep' : 'Desliza → Completar · ← Fallo'}
                    </span>
                    <span class="material-symbols-outlined text-sm text-neutral-400">swap_horiz</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          {#if pendingHabits.length > deckCards.length}
            <div class="border-[2px] border-dashed border-neutral-300 p-2 text-center">
              <p class="font-mono-label text-[10px] font-bold text-neutral-500 uppercase">
                +{pendingHabits.length - deckCards.length} más en el mazo
              </p>
            </div>
          {/if}
        {/if}

        {#each lockedHabits as habit (habit.id)}
          <div class="relative bg-neutral-200 border-[3px] border-black p-3 opacity-75 group overflow-hidden grayscale select-none shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <div class="relative z-10 flex items-center justify-between gap-2">
              <div class="flex gap-2.5 items-center min-w-0">
                <div class="min-w-0">
                  <h4 class="font-headline text-sm font-bold leading-tight text-neutral-700 break-words">
                    {habit.title}
                  </h4>
                  <span class="font-mono-label text-[9px] bg-black text-white px-1.5 py-0.5 uppercase font-bold tracking-wider inline-block mt-1">
                    BLOQUEADO · Nivel {habit.minLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </section>

      <!-- RIGHT: Realizados (Completados) -->
      <section class="flex flex-col gap-3 order-2 md:order-3">
        <div class="flex items-center gap-2 border-b-[3px] border-green-700 pb-2">
          <span class="material-symbols-outlined text-green-700 fill-1">verified</span>
          <h3 class="font-headline text-sm font-extrabold text-green-700 uppercase tracking-wide">
            Realizados
          </h3>
          <span class="font-mono-label text-[10px] font-extrabold text-white bg-green-700 border border-green-700 px-1.5 py-0.5 ml-auto">
            {completedHabits.length}
          </span>
        </div>

        {#if completedHabits.length === 0}
          <div class="border-[2px] border-dashed border-neutral-300 p-3 text-center">
            <p class="font-mono-label text-[10px] font-bold text-neutral-400 uppercase">
              Completa hábitos para verlos aquí
            </p>
          </div>
        {:else}
          <div class="flex flex-col gap-3">
            {#each completedHabits as habit (habit.id)}
              <div class="bg-white border-[3px] border-green-700 p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
                <div class="flex items-start gap-2">
                  <div class="w-8 h-8 border-[2px] border-black bg-black text-white flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-base fill-1">done</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="font-headline text-sm font-extrabold line-through text-neutral-600 break-words leading-snug">
                      {habit.title}
                    </h4>
                    <span class="font-mono-label text-[10px] font-bold text-green-700 uppercase">
                      Completado · +{habit.xpReward} XP
                    </span>
                  </div>
                  <button
                    type="button"
                    onclick={() => onRestoreHabit(habit.id)}
                    class="w-7 h-7 border-[2px] border-black bg-white flex items-center justify-center shrink-0 hover:bg-neutral-200 transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                    title="Deshacer completado"
                  >
                    <span class="material-symbols-outlined text-sm">undo</span>
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </section>

    </div>
  </div>
</div>

<!-- Failure Acknowledgment Modal -->
{#if habitToFail}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
    <div class="bg-white border-[4px] border-black p-6 w-full max-w-sm wobbly-border shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto">
      <button
        type="button"
        onclick={cancelFail}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        ✕
      </button>
      <div class="text-center py-1">
        <div class="w-16 h-16 border-[3px] border-red-700 bg-white text-red-700 flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <span class="material-symbols-outlined text-3xl">heart_broken</span>
        </div>
        <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
          Reconocimiento del Fallo
        </h3>
        <p class="font-headline text-sm font-bold text-neutral-700 mt-2 leading-relaxed">
          Vas a reconocer que <span class="text-red-700">NO realizaste</span> «{habitToFail.title}» hoy.
        </p>
        <div class="mt-4 p-3 border-[3px] border-black bg-neutral-50 flex flex-col gap-1.5 text-left">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-base text-red-700">local_fire_department</span>
            <span class="font-mono-label text-xs font-bold text-black">Tu racha se reinicia a 0</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-base text-red-700">toll</span>
            <span class="font-mono-label text-xs font-bold text-black">No ganarás XP por este hábito</span>
          </div>
        </div>
        <div class="flex gap-2 mt-5">
          <button
            type="button"
            onclick={cancelFail}
            class="flex-1 py-2.5 bg-white border-[2px] border-black font-headline text-xs font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onclick={confirmFail}
            class="flex-1 py-2.5 bg-red-700 text-white border-[2px] border-black font-headline text-xs font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-red-800 transition-colors cursor-pointer"
          >
            Sí, reconozco mi fallo
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if habitToDelete}
  <ConfirmModal
    isOpen={true}
    title="Eliminar Hábito"
    message="¿Estás seguro de eliminar el hábito «{habitToDelete.title}»? Esta acción no se puede deshacer."
    confirmLabel="SÍ, ELIMINAR"
    cancelLabel="CANCELAR"
    tone="danger"
    onConfirm={() => {
      onDeleteHabit(habitToDelete.id);
      habitToDelete = null;
    }}
    onCancel={() => (habitToDelete = null)}
  />
{/if}

<style>
  .animate-restore {
    animation: card-restore 0.5s ease-out;
  }
</style>
