<script lang="ts">
  import type { HabitCard } from '../types';
  import { toPng } from 'html-to-image';

  interface Props {
    isOpen: boolean;
    habits: HabitCard[];
    userLevel: number;
    onClose: () => void;
    onClaimBonus?: () => void;
    claimedBonusToday?: boolean;
  }

  let {
    isOpen,
    habits,
    userLevel,
    onClose,
    onClaimBonus,
    claimedBonusToday = false,
  }: Props = $props();

  let summaryCardRef = $state<HTMLElement | null>(null);
  let isDownloading = $state(false);

  let todayStr = $derived(
    new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  let activeHabits = $derived(habits.filter((h) => h.minLevel <= userLevel));
  let completedHabits = $derived(activeHabits.filter((h) => h.completed));

  let completionPercent = $derived(
    activeHabits.length > 0
      ? Math.round((completedHabits.length / activeHabits.length) * 100)
      : 0
  );

  let totalXpToday = $derived(
    completedHabits.reduce((acc, h) => acc + h.xpReward, 0)
  );

  let highestStreak = $derived(
    activeHabits.reduce((max, h) => Math.max(max, h.streak), 0)
  );

  let statusWisdom = $derived.by(() => {
    if (completionPercent === 100) {
      return {
        title: '🏆 ¡MAESTRÍA ABSOLUTA DEL DÍA!',
        text: 'Has completado todos tus hábitos activos. Tu energía alquímica está en su punto máximo.',
        bg: 'bg-emerald-100 text-emerald-900 border-emerald-500',
      };
    } else if (completionPercent >= 50) {
      return {
        title: '⚡ ¡TRANSMUTACIÓN EN PROGRESO!',
        text: 'Llevas más de la mitad de tus tareas diarias. ¡Completa los hábitos restantes para sellar el rito!',
        bg: 'bg-amber-100 text-amber-900 border-amber-500',
      };
    } else {
      return {
        title: '🧪 PASOS PRIMORDIALES',
        text: 'El día apenas comienza o tienes ritos pendientes. Transmuta al menos un hábito para elevar tu XP.',
        bg: 'bg-blue-100 text-blue-900 border-blue-500',
      };
    }
  });

  const downloadSummaryImage = async () => {
    if (!summaryCardRef) return;
    try {
      isDownloading = true;

      if (document.fonts) {
        await document.fonts.ready;
      }

      const dataUrl = await toPng(summaryCardRef, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('no-export')) {
            return false;
          }
          return true;
        },
      });

      const link = document.createElement('a');
      const dateIso = new Date().toISOString().slice(0, 10);
      link.download = `resumen-alquimico-${dateIso}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed capturing daily summary image', err);
      alert('No se pudo generar la imagen del resumen. Inténtalo de nuevo.');
    } finally {
      isDownloading = false;
    }
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
    <div
      bind:this={summaryCardRef}
      class="bg-white border-[4px] border-black p-6 w-full max-w-md wobbly-border shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto flex flex-col gap-5 animate-in fade-in zoom-in duration-150"
    >
      <!-- Close Button -->
      <button
        type="button"
        onclick={onClose}
        class="no-export absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        ✕
      </button>

      <!-- Header -->
      <div class="flex items-center gap-3 border-b-2 border-black pb-3 pr-8">
        <div class="w-12 h-12 border-[2.5px] border-black bg-amber-300 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span class="material-symbols-outlined text-3xl font-bold">calendar_today</span>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
            Resumen del Día
          </h3>
          <p class="font-mono-label text-[11px] font-bold text-neutral-600 capitalize">
            {todayStr}
          </p>
        </div>
      </div>

      <!-- Main Progress Dial / Banner -->
      <div class="p-4 border-[2.5px] border-black bg-neutral-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <span class="font-mono-label text-xs font-bold uppercase text-black">
            Avance General Hoy
          </span>
          <span class="font-headline text-2xl font-extrabold text-black">
            {completionPercent}%
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-5 border-[2.5px] border-black bg-neutral-200 relative overflow-hidden">
          <div
            class="h-full bg-black transition-all duration-500 halftone"
            style="width: {completionPercent}%;"
          ></div>
        </div>

        <div class="grid grid-cols-3 gap-2 mt-1 pt-2 border-t border-neutral-300 text-center">
          <div class="flex flex-col">
            <span class="font-headline text-lg font-extrabold text-black">
              {completedHabits.length}/{activeHabits.length}
            </span>
            <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase">HÁBITOS</span>
          </div>
          <div class="flex flex-col border-x border-neutral-300">
            <span class="font-headline text-lg font-extrabold text-amber-600">
              +{totalXpToday} XP
            </span>
            <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase">GANADOS</span>
          </div>
          <div class="flex flex-col">
            <span class="font-headline text-lg font-extrabold text-red-600 flex items-center justify-center gap-0.5">
              <span class="material-symbols-outlined text-base fill-1">local_fire_department</span>
              {highestStreak}d
            </span>
            <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase">RACHA MÁX</span>
          </div>
        </div>
      </div>

      <!-- Wisdom Card -->
      <div class="p-3.5 border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] {statusWisdom.bg}">
        <h4 class="font-headline text-sm font-extrabold mb-1">
          {statusWisdom.title}
        </h4>
        <p class="font-headline text-xs font-bold leading-relaxed">
          {statusWisdom.text}
        </p>
      </div>

      <!-- Habits Breakdown List -->
      <div class="flex flex-col gap-2">
        <h4 class="font-mono-label text-xs font-bold uppercase text-black flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">checklist</span>
          Desglose de Hábitos de Hoy
        </h4>

        <div class="habits-scroll-list flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {#each activeHabits as habit (habit.id)}
            {@const isDone = habit.completed}
            <div class="p-2.5 border-[2px] border-black bg-white flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 border border-black flex items-center justify-center font-bold text-xs {isDone ? 'bg-black text-white' : 'bg-neutral-100 text-black'}">
                  <span class="material-symbols-outlined text-base">
                    {isDone ? 'check' : habit.icon || 'schedule'}
                  </span>
                </div>
                <div>
                  <h5 class="font-headline text-xs font-extrabold {isDone ? 'line-through text-neutral-500' : 'text-black'}">
                    {habit.title}
                  </h5>
                  <span class="font-mono-label text-[10px] text-neutral-600 font-bold">
                    {isDone ? 'Completado' : 'Pendiente'}
                  </span>
                </div>
              </div>

              <span class="font-mono-label text-xs font-extrabold text-black">
                +{isDone ? habit.xpReward : 0} XP
              </span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Download Image Button -->
      <button
        type="button"
        onclick={downloadSummaryImage}
        disabled={isDownloading}
        class="no-export w-full py-2.5 bg-black text-white border-[2.5px] border-black font-headline text-xs font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-800 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined text-lg">
          {isDownloading ? 'hourglass_top' : 'download'}
        </span>
        {isDownloading ? 'GENERANDO IMAGEN (PNG)...' : 'DESCARGAR RESUMEN COMO IMAGEN'}
      </button>

      <!-- Daily Bonus Action -->
      {#if completionPercent >= 50 && !claimedBonusToday}
        <button
          type="button"
          onclick={() => onClaimBonus?.()}
          class="no-export w-full py-3 bg-amber-400 text-black border-[3px] border-black font-headline text-sm font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-amber-300 cursor-pointer flex items-center justify-center gap-2 animate-bounce"
        >
          <span class="material-symbols-outlined text-xl">workspace_premium</span>
          ¡RECLAMAR BONO DIARIO ALQUÍMICO (+25 XP)!
        </button>
      {:else if claimedBonusToday}
        <div class="no-export p-2.5 text-center bg-neutral-100 border-[2px] border-black font-mono-label text-xs font-bold text-green-700">
          ✅ Bonus Diario Reclamado Hoy
        </div>
      {/if}
    </div>
  </div>
{/if}
