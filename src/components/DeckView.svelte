
<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { HabitCard } from '../types';
  import Tooltip from './Tooltip.svelte';
  import ConfirmModal from './ConfirmModal.svelte';
  import EmptyState from './EmptyState.svelte';
  import { popIn, popOut, overlayFade } from '../lib/modalTransitions';

  interface Props {
    habits: HabitCard[];
    userLevel: number;
    loading?: boolean;
    syncStatus?: 'syncing' | 'synced' | 'offline';
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
    loading = false,
    syncStatus = 'synced',
    onToggleHabit,
    onFailHabit,
    onRestoreHabit,
    onIncrementCounter,
    onOpenNewHabitModal,
    onEditHabitRequest,
    onDeleteHabit,
    onOpenDailyShare,
  }: Props = $props();

  // Deck controls: search, category filter, sort
  let filterCategory = $state<string | null>(null);
  let searchQuery = $state('');
  let sortMode = $state<'default' | 'alpha' | 'streak' | 'xp'>('default');
  let showAllCompleted = $state(false);
  let showAllFailed = $state(false);

  $effect(() => {
    filterCategory;
    searchQuery;
    sortMode;
    showAllCompleted = false;
    showAllFailed = false;
  });

  const clearFilters = () => {
    filterCategory = null;
    searchQuery = '';
  };

  // Derived helpers for display
  const activeHabits = $derived(habits.filter((h) => h.minLevel <= 9999));
  const lockedHabits = $derived(habits.filter((h) => h.minLevel > 9999));

  const categories = $derived(
    Array.from(new Set(activeHabits.map((h) => h.category || 'Diario'))).sort((a, b) =>
      a.localeCompare(b, 'es')
    )
  );
  const isFiltering = $derived(filterCategory !== null || searchQuery.trim() !== '');

  const filteredHabits = $derived(
    activeHabits.filter((h) => {
      if (filterCategory && (h.category || 'Diario') !== filterCategory) return false;
      const q = searchQuery.trim().toLowerCase();
      if (q && !h.title.toLowerCase().includes(q)) return false;
      return true;
    })
  );

  const completedHabits = $derived(filteredHabits.filter((h) => h.completed));
  const failedHabits = $derived(filteredHabits.filter((h) => h.failed));
  const completedXpToday = $derived(completedHabits.reduce((sum, h) => sum + h.xpReward, 0));

  const pendingHabits = $derived.by(() => {
    const list = filteredHabits.filter((h) => !h.completed && !h.failed);
    switch (sortMode) {
      case 'alpha':
        return [...list].sort((a, b) => a.title.localeCompare(b.title, 'es'));
      case 'streak':
        return [...list].sort((a, b) => b.streak - a.streak);
      case 'xp':
        return [...list].sort((a, b) => b.xpReward - a.xpReward);
      default:
        return list;
    }
  });

  const MAX_LIST = 8;
  const displayCompleted = $derived(showAllCompleted ? completedHabits : completedHabits.slice(0, MAX_LIST));
  const displayFailed = $derived(showAllFailed ? failedHabits : failedHabits.slice(0, MAX_LIST));
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

  // Flick detection: a fast swipe commits even below the distance threshold
  const FLICK_MIN_DISTANCE = 70;
  const FLICK_VELOCITY = 0.5; // px/ms
  let dragVelocity = $state(0);
  let lastMoveClientX = $state(0);
  let lastMoveTime = $state(0);

  const dragRotate = $derived(
    Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, (dragX / SWIPE_THRESHOLD) * MAX_ANGLE))
  );

  // Failure acknowledgment modal
  let habitToFail = $state<HabitCard | null>(null);

  // Delete confirmation modal
  let habitToDelete = $state<HabitCard | null>(null);

  // Gesture affordance: progress toward commit, direction, and idle hint state
  const dragProgress = $derived(Math.min(1, Math.abs(dragX) / SWIPE_THRESHOLD));
  const dragDir = $derived(dragX > 0 ? 'right' : dragX < 0 ? 'left' : null);
  const canCommit = $derived(Math.abs(dragX) >= SWIPE_THRESHOLD);
  const showHint = $derived(dragId === null && leaving === null && habitToFail === null);

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

  // Emotional feedback: freshly completed habit pop + XP burst on swipe-out
  let justCompletedId = $state<string | null>(null);
  let completedTimer: ReturnType<typeof setTimeout> | undefined;
  let xpBurst = $state<{ id: string; xp: number } | null>(null);
  let xpBurstTimer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    const completed = new Set(habits.filter((h) => h.completed).map((h) => h.id));
    for (const id of completed) {
      if (!prevCompletedIds.has(id)) {
        justCompletedId = id;
        if (completedTimer) clearTimeout(completedTimer);
        completedTimer = setTimeout(() => { justCompletedId = null; }, 900);
      }
    }
  });

  onDestroy(() => {
    if (leaveTimer) clearTimeout(leaveTimer);
    if (completedTimer) clearTimeout(completedTimer);
    if (xpBurstTimer) clearTimeout(xpBurstTimer);
  });

  const resetDrag = () => {
    dragId = null;
    dragX = 0;
    dragY = 0;
    startX = 0;
    startY = 0;
    dragVelocity = 0;
    lastMoveClientX = 0;
    lastMoveTime = 0;
  };

  const startDrag = (e: PointerEvent, habit: HabitCard) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (habit.completed || habit.failed || leaving) return;
    dragId = habit.id;
    startX = e.clientX;
    startY = e.clientY;
    dragX = 0;
    dragY = 0;
    dragVelocity = 0;
    lastMoveClientX = e.clientX;
    lastMoveTime = Date.now();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* jsdom / unsupported */
    }
  };

  const onDragMove = (e: PointerEvent) => {
    if (!dragId) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    // Rubber-band resistance past the commit threshold: the deeper you drag,
    // the harder it pulls, making the "commit point" feel tactile instead of sloppy.
    const dist = Math.abs(dx);
    if (dist > SWIPE_THRESHOLD) {
      const overshoot = dist - SWIPE_THRESHOLD;
      const damp = 1 - Math.min(0.55, overshoot / (SWIPE_THRESHOLD * 3));
      dx = Math.sign(dx) * (SWIPE_THRESHOLD + overshoot * damp);
    }
    dragX = dx;
    dragY = dy;
    const now = Date.now();
    const dt = Math.max(8, now - lastMoveTime);
    dragVelocity = (e.clientX - lastMoveClientX) / dt;
    lastMoveClientX = e.clientX;
    lastMoveTime = now;
  };

  const commitSwipe = (habitId: string, dir: 'left' | 'right', commit: (id: string) => void) => {
    leaving = { id: habitId, dir };
    dragId = null;
    if (dir === 'right') {
      const h = habits.find((x) => x.id === habitId);
      if (h) {
        xpBurst = { id: habitId, xp: h.xpReward };
        if (xpBurstTimer) clearTimeout(xpBurstTimer);
        xpBurstTimer = setTimeout(() => { xpBurst = null; }, 750);
      }
    }
    if (leaveTimer) clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => {
      commit(habitId);
      leaving = null;
    }, 320);
  };

  // Single source of truth for the "complete" action, shared by swipe,
  // the visible fallback buttons and the keyboard (right arrow).
  const completeHabit = (habit: HabitCard) => {
    if (habit.completed || habit.failed || leaving) return;
    if (habit.targetType === 'counter' && habit.currentCount + 1 < habit.targetCount) {
      onIncrementCounter(habit.id);
      resetDrag();
    } else {
      const commit = habit.targetType === 'counter' ? onIncrementCounter : onToggleHabit;
      commitSwipe(habit.id, 'right', commit);
    }
  };

  // "Fail" always routes through the acknowledgment modal (same as a left swipe).
  const failHabit = (habit: HabitCard) => {
    if (habit.completed || habit.failed || leaving) return;
    habitToFail = habit;
  };

  const endDrag = () => {
    if (!dragId) return;
    const habit = habits.find((h) => h.id === dragId);
    if (!habit) {
      resetDrag();
      return;
    }
    const flickRight = dragVelocity > FLICK_VELOCITY && dragX > FLICK_MIN_DISTANCE;
    const flickLeft = dragVelocity < -FLICK_VELOCITY && dragX < -FLICK_MIN_DISTANCE;
    if (dragX >= SWIPE_THRESHOLD || flickRight) {
      completeHabit(habit);
    } else if (dragX <= -SWIPE_THRESHOLD || flickLeft) {
      failHabit(habit);
    } else {
      resetDrag();
    }
  };

  // Keyboard fallback so the gesture is never the only way to decide (a11y).
  const onCardKeydown = (e: KeyboardEvent, habit: HabitCard) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      completeHabit(habit);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      failHabit(habit);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelFail();
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
          Avance de Hoy (<span key={completionPercent} class="inline-block animate-num-pop">{completionPercent}%</span>)
        </h3>
        <p class="font-mono-label text-[11px] text-neutral-600 font-bold">
          {completedHabits.length} REALIZADOS · {failedHabits.length} NO REALIZADOS · {pendingHabits.length} PENDIENTES
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2 self-end sm:self-auto">
      {#if syncStatus === 'syncing'}
        <div
          class="flex items-center gap-1.5 border-[2px] border-black bg-white px-2 py-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          title="Sincronizando cambios con Firebase"
        >
          <span class="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
          <span class="font-mono-label text-[9px] font-bold uppercase">Sincronizando…</span>
        </div>
      {:else if syncStatus === 'offline'}
        <div
          class="flex items-center gap-1.5 border-[2px] border-red-700 bg-red-50 px-2 py-1.5"
          title="Cambios guardados localmente; se sincronizarán al reconectarte"
        >
          <span class="material-symbols-outlined text-sm text-red-700 fill-1">cloud_off</span>
          <span class="font-mono-label text-[9px] font-bold uppercase text-red-700">Sin conexión</span>
        </div>
      {:else}
        <div
          class="flex items-center border-[2px] border-green-700 bg-green-50 px-2 py-1.5"
          title="Todo sincronizado con Firebase"
        >
          <span class="material-symbols-outlined text-sm text-green-700 fill-1">cloud_done</span>
        </div>
      {/if}
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
        {isFiltering ? filteredHabits.length : activeHabits.length}/{habits.length} CARDS
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

  <!-- Deck Controls: search, category filter, sort -->
  <div class="flex flex-col gap-2.5 mb-5">
    <div class="flex flex-col sm:flex-row gap-2.5">
      <div class="relative flex-1">
        <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-base text-neutral-400 pointer-events-none">
          search
        </span>
        <input
          type="search"
          placeholder="Buscar hábito..."
          bind:value={searchQuery}
          class="w-full py-2 pl-9 pr-3 border-[2px] border-black bg-white font-mono-label text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] outline-none placeholder:text-neutral-400"
        />
      </div>
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-base text-neutral-500 shrink-0">sort</span>
        <select
          bind:value={sortMode}
          class="py-2 px-3 border-[2px] border-black bg-white font-mono-label text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] outline-none cursor-pointer"
        >
          <option value="default">Orden por defecto</option>
          <option value="alpha">Título A-Z</option>
          <option value="streak">Mayor racha</option>
          <option value="xp">Mayor XP</option>
        </select>
      </div>
    </div>

    <div class="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
      <button
        type="button"
        onclick={() => (filterCategory = null)}
        class="shrink-0 px-2.5 py-1 border-[2px] border-black font-mono-label text-[10px] font-extrabold uppercase cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none {filterCategory === null ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'}"
      >
        Todos
      </button>
      {#each categories as cat (cat)}
        <button
          type="button"
          onclick={() => (filterCategory = filterCategory === cat ? null : cat)}
          class="shrink-0 px-2.5 py-1 border-[2px] border-black font-mono-label text-[10px] font-extrabold uppercase cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none {filterCategory === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'}"
        >
          {cat}
        </button>
      {/each}
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
          <div class="border-[2px] border-dashed border-neutral-300 p-4 flex-1 flex items-center justify-center">
            <EmptyState
              tone="red"
              compact
              icon="heart_broken"
              title="Sin fallos reconocidos"
              description="Nada que reprochar. Todos tus acuerdos siguieron en pie hoy."
            />
          </div>
        {:else}
          <div class="flex flex-col gap-3">
            {#each displayFailed as habit (habit.id)}
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
            {#if failedHabits.length > MAX_LIST}
              <button
                type="button"
                onclick={() => (showAllFailed = !showAllFailed)}
                class="self-center px-3 py-1.5 bg-white border-[2px] border-black font-mono-label text-[10px] font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 cursor-pointer"
              >
                {showAllFailed ? 'Mostrar menos' : `+${failedHabits.length - MAX_LIST} más`}
              </button>
            {/if}
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

        {#if loading}
          <div class="relative h-[360px]" aria-hidden="true">
            {#each [0, 1, 2] as i}
              <div
                class="absolute inset-x-0 top-0 mx-2 h-[280px] bg-neutral-200 border-[3px] border-neutral-300 overflow-hidden"
                style:transform={`translate(${i % 2 ? 6 : -6}px, ${i * 14}px) rotate(${[0, 2.5, -2.5][i]}deg) scale(${1 - i * 0.045})`}
                style:z-index={10 - i}
                style:opacity={Math.max(0.55, 1 - i * 0.12)}
              >
                <div class="p-4 flex flex-col h-full gap-3">
                  <div class="flex gap-1.5">
                    <div class="w-14 h-3.5 bg-neutral-300 animate-pulse"></div>
                    <div class="w-7 h-7 bg-neutral-300 animate-pulse"></div>
                    <div class="w-7 h-7 bg-neutral-300 animate-pulse"></div>
                  </div>
                  <div class="w-3/4 h-7 bg-neutral-300 animate-pulse"></div>
                  <div class="w-1/2 h-4 bg-neutral-300 animate-pulse"></div>
                  <div class="mt-auto w-full h-5 bg-neutral-300 animate-pulse"></div>
                </div>
                <div class="absolute inset-0 shimmer"></div>
              </div>
            {/each}
          </div>
          <div class="flex items-center gap-1.5 border-[2px] border-dashed border-neutral-300 p-2 justify-center">
            <span class="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
            <p class="font-mono-label text-[10px] font-bold text-neutral-500 uppercase">
              Sincronizando con Firebase…
            </p>
          </div>
        {:else if pendingHabits.length === 0}
          {#if isFiltering}
            <div class="border-[2px] border-dashed border-neutral-300 p-4 flex-1">
              <EmptyState
                icon="manage_search"
                title="Sin coincidencias"
                description="Ningún hábito pendiente coincide con la búsqueda o el filtro activos."
                actionLabel="Limpiar filtros"
                onAction={clearFilters}
              />
            </div>
          {:else}
            <div class="border-[2px] border-dashed border-neutral-300 p-4 flex-1">
              <EmptyState
                icon="self_improvement"
                title="El alquimista descansa"
                description="Tu mazo está en reposo: todos los hábitos de hoy quedaron resueltos. Cuando quieras transmutar algo nuevo, crea otro acuerdo."
                actionLabel="CREAR HÁBITO"
                onAction={onOpenNewHabitModal}
              />
            </div>
          {/if}
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
                aria-keyshortcuts="ArrowLeft ArrowRight"
                class="absolute inset-x-0 top-0 mx-2 h-[280px] bg-white border-[3px] border-black p-4 shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none transition-transform duration-300 ease-out {restoreFlashId === habit.id ? 'animate-restore' : ''}"
                style:border-color={isTop && dragDir === 'right' && canCommit
                  ? 'rgb(21 128 61)'
                  : isTop && dragDir === 'left' && canCommit
                    ? 'rgb(185 28 28)'
                    : undefined}
                style:box-shadow={isTop && dragDir === 'right' && canCommit
                  ? '7px 7px 0 0 rgb(34 197 94)'
                  : isTop && dragDir === 'left' && canCommit
                    ? '7px 7px 0 0 rgb(220 38 38)'
                    : undefined}
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
                onkeydown={(e) => {
                  if (isTop) onCardKeydown(e, habit);
                }}
              >
                {#if isTop}
                  <!-- Drag progress rail: fills toward the commit threshold -->
                  <div
                    class="absolute top-0 left-0 right-0 h-1.5 z-20 pointer-events-none"
                    style:opacity={dragProgress > 0 ? 1 : 0}
                  >
                    <div
                      class="h-full transition-[width] duration-100 ease-out {dragDir === 'right' ? 'bg-green-700' : 'bg-red-700'}"
                      style="width: {dragProgress * 100}%;"
                    ></div>
                  </div>

                  <!-- Tinder direction stamps (pop in with a springy scale) -->
                  <div
                    class="absolute top-3 left-3 z-20 border-[3px] border-green-700 px-2.5 py-1 font-headline text-base font-extrabold uppercase text-green-700 bg-white/90 pointer-events-none"
                    style:opacity={dragX > 0 ? Math.min(1, dragX / 80) : 0}
                    style:transform={dragX > 0 ? `rotate(-12deg) scale(${1 + Math.min(0.25, dragX / 480)})` : undefined}
                  >
                    Completar
                  </div>
                  <div
                    class="absolute top-3 right-3 z-20 border-[3px] border-red-700 px-2.5 py-1 font-headline text-base font-extrabold uppercase text-red-700 bg-white/90 pointer-events-none"
                    style:opacity={dragX < 0 ? Math.min(1, -dragX / 80) : 0}
                    style:transform={dragX < 0 ? `rotate(12deg) scale(${1 + Math.min(0.25, -dragX / 480)})` : undefined}
                  >
                    Fallo
                  </div>
                {/if}

                {#if isTop && showHint}
                  <!-- Breathing affordance ring: "this card can be swiped right" -->
                  <div class="absolute inset-0 z-0 pointer-events-none animate-swipe-glow"></div>
                {/if}

                <div class="relative z-10 flex flex-col h-full">
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

                  <div class="mt-auto flex flex-col gap-1.5">
                    <div class="flex items-center justify-between gap-2 border-[2px] border-dashed border-neutral-300 bg-neutral-50 px-2.5 py-1 {isTop && showHint ? 'animate-hint-strip' : ''}">
                      <span class="material-symbols-outlined text-sm {dragDir === 'left' ? 'text-red-700' : 'text-neutral-400'}">keyboard_double_arrow_left</span>
                      <span class="font-mono-label text-[8px] font-bold text-neutral-500 uppercase text-center">
                        {habit.targetType === 'counter' ? 'Desliza → +1 rep' : 'Desliza → Completar · ← Fallo'}
                      </span>
                      <span class="material-symbols-outlined text-sm {dragDir === 'right' ? 'text-green-700' : 'text-neutral-400'}">keyboard_double_arrow_right</span>
                    </div>
                    {#if isTop}
                      <!-- Visible fallback actions: the swipe is never the only way -->
                      <div class="flex items-center gap-2">
                        <button
                          type="button"
                          onclick={() => failHabit(habit)}
                          title="Reconocer fallo (←)"
                          class="flex-1 py-1.5 bg-white border-[2px] border-red-700 text-red-700 font-headline text-[10px] font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span class="material-symbols-outlined text-sm">close</span>
                          <span>Fallo</span>
                        </button>
                        <button
                          type="button"
                          onclick={() => completeHabit(habit)}
                          title={habit.targetType === 'counter' ? `Añadir +1 ${habit.unit} (→)` : 'Completar hábito (→)'}
                          class="flex-1 py-1.5 bg-green-700 text-white border-[2px] border-black font-headline text-[10px] font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-green-800 transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span class="material-symbols-outlined text-sm">check</span>
                          <span>{habit.targetType === 'counter' ? `+1 ${habit.unit}` : 'Completar'}</span>
                        </button>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}

            {#if xpBurst}
              <div class="absolute left-1/2 top-8 z-30 pointer-events-none animate-xp-burst">
                <span class="inline-flex items-center gap-1 border-[3px] border-black bg-amber-300 px-2.5 py-1 font-mono-label text-sm font-extrabold text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                  <span class="material-symbols-outlined text-base fill-1">auto_awesome</span>
                  +{xpBurst.xp} XP
                </span>
              </div>
            {/if}
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
          {#if completedXpToday > 0}
            <span class="inline-flex items-center gap-0.5 font-mono-label text-[9px] font-extrabold text-black bg-amber-300 border border-black px-1.5 py-0.5">
              <span class="material-symbols-outlined text-[11px] fill-1">auto_awesome</span>
              +{completedXpToday} XP HOY
            </span>
          {/if}
        </div>

        {#if completedHabits.length === 0}
          <div class="border-[2px] border-dashed border-neutral-300 p-4 flex-1 flex items-center justify-center">
            <EmptyState
              tone="green"
              compact
              icon="verified"
              title="Aún sin oro hoy"
              description="Desliza hábitos a la derecha y aquí se acumulará tu oro del día."
            />
          </div>
        {:else}
          <div class="flex flex-col gap-3">
            {#each displayCompleted as habit (habit.id)}
              <div class="bg-white border-[3px] border-green-700 p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] relative overflow-hidden {justCompletedId === habit.id ? 'animate-completed-pop' : ''}">
                <div class="flex items-start gap-2">
                  <div class="w-8 h-8 border-[2px] border-black bg-black text-white flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-base fill-1">done</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="font-headline text-sm font-extrabold line-through text-neutral-600 break-words leading-snug">
                      {habit.title}
                    </h4>
                    <div class="mt-1 flex items-center gap-1.5 flex-wrap">
                      <span class="font-mono-label text-[10px] font-bold text-green-700 uppercase">
                        Completado · +{habit.xpReward} XP
                      </span>
                      <span class="inline-flex items-center gap-0.5 border-[2px] border-black bg-amber-300 px-1.5 py-0.5 {justCompletedId === habit.id ? 'animate-streak-bump' : ''}">
                        <span class="material-symbols-outlined text-xs fill-1">local_fire_department</span>
                        <span class="font-mono-label text-[9px] font-extrabold text-black">Racha {habit.streak} DÍAS</span>
                        {#if justCompletedId === habit.id}
                          <span class="font-mono-label text-[9px] font-extrabold text-green-700 animate-streak-plus">+1</span>
                        {/if}
                      </span>
                    </div>
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
            {#if completedHabits.length > MAX_LIST}
              <button
                type="button"
                onclick={() => (showAllCompleted = !showAllCompleted)}
                class="self-center px-3 py-1.5 bg-white border-[2px] border-black font-mono-label text-[10px] font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 cursor-pointer"
              >
                {showAllCompleted ? 'Mostrar menos' : `+${completedHabits.length - MAX_LIST} más`}
              </button>
            {/if}
          </div>
        {/if}
      </section>

    </div>
  </div>
</div>

<!-- Failure Acknowledgment Modal -->
{#if habitToFail}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs" in:overlayFade out:overlayFade>
    <div in:popIn out:popOut class="bg-white border-[4px] border-black p-6 w-full max-w-sm wobbly-border shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto">
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

  /* Breathing affordance ring on the idle top card: signals "swipe me right" */
  .animate-swipe-glow {
    animation: swipe-glow 2.8s ease-in-out infinite;
  }

  @keyframes swipe-glow {
    0%, 100% { box-shadow: inset 0 0 0 0 rgba(34, 197, 94, 0); }
    50% { box-shadow: inset 0 0 0 5px rgba(34, 197, 94, 0.16); }
  }

  /* Soft pulse on the instruction strip while the deck is idle */
  .animate-hint-strip {
    animation: hint-strip-pulse 2.4s ease-in-out infinite;
  }

  @keyframes hint-strip-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }

  /* Skeleton loading: shimmer sweep over placeholder cards */
  .shimmer {
    background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.55) 50%, transparent 65%);
    background-size: 200% 100%;
    animation: shimmer-sweep 1.5s linear infinite;
  }

  @keyframes shimmer-sweep {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* XP burst: "+N XP" floats up as the card swipes out right */
  .animate-xp-burst {
    animation: xp-burst 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes xp-burst {
    0% { transform: translate(-50%, 0) scale(0.6); opacity: 0; }
    18% { transform: translate(-50%, -8px) scale(1.15); opacity: 1; }
    55% { transform: translate(-50%, -34px) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -72px) scale(0.92); opacity: 0; }
  }

  /* Freshly completed pile item: scale pop + amber ring of reward */
  .animate-completed-pop {
    animation: completed-pop 0.6s ease-out;
  }

  @keyframes completed-pop {
    0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
    35% { transform: scale(1.04); box-shadow: 0 0 0 8px rgba(245, 158, 11, 0.4); }
    100% { transform: scale(1); box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 1); }
  }

  /* Daily progress number pop on change */
  .animate-num-pop {
    animation: num-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes num-pop {
    0% { transform: scale(1.6); color: #15803d; }
    100% { transform: scale(1); color: inherit; }
  }

  /* Keyboard focus: clear visible ring for arrow-key navigation */
  [data-habit-card]:focus-visible {
    outline: 3px solid #f59e0b;
    outline-offset: 3px;
  }

  /* Streak chip bounce + "+1" flare when a habit just landed in Realizados */
  .animate-streak-bump {
    animation: streak-bump 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes streak-bump {
    0% { transform: scale(1); }
    40% { transform: scale(1.18); }
    100% { transform: scale(1); }
  }

  .animate-streak-plus {
    animation: streak-plus 0.9s ease-out forwards;
  }

  @keyframes streak-plus {
    0% { opacity: 0; transform: translateY(2px) scale(0.8); }
    30% { opacity: 1; transform: translateY(0) scale(1.1); }
    100% { opacity: 0; transform: translateY(-8px) scale(1); }
  }

  /* Honor reduced-motion: tone down the celebratory micro-interactions */
  @media (prefers-reduced-motion: reduce) {
    [data-habit-card] {
      transition: none;
    }
    .animate-swipe-glow,
    .animate-hint-strip,
    .shimmer,
    .animate-xp-burst,
    .animate-completed-pop,
    .animate-num-pop,
    .animate-streak-bump,
    .animate-streak-plus,
    .animate-restore {
      animation: none;
    }
  }
</style>
