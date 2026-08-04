<script lang="ts">
  import type { HabitCard } from '../types';
  import { toPng } from 'html-to-image';
  import Tooltip from './Tooltip.svelte';

  interface Props {
    isOpen: boolean;
    habits: HabitCard[];
    userLevel: number;
    userName?: string;
    onClose: () => void;
    onClaimBonus?: () => void;
    claimedBonusToday?: boolean;
  }

  let {
    isOpen,
    habits,
    userLevel,
    userName = 'Alquimista',
    onClose,
    onClaimBonus,
    claimedBonusToday = false,
  }: Props = $props();

  let shareCardRef = $state<HTMLElement | null>(null);
  let isExporting = $state(false);
  let shareFeedback = $state<'idle' | 'shared' | 'downloaded' | 'error'>('idle');

  let todayStr = $derived(
    new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  let activeHabits = $derived(habits.filter((h) => h.minLevel <= 9999));
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
        icon: 'workspace_premium',
        title: 'MAESTRÍA ABSOLUTA DEL DÍA',
        text: 'Has completado todos tus hábitos activos. Tu energía alquímica está en su punto máximo.',
        cls: 'bg-amber-300 text-black',
      };
    } else if (completionPercent >= 50) {
      return {
        icon: 'bolt',
        title: 'TRANSMUTACIÓN EN PROGRESO',
        text: 'Llevas más de la mitad de tus tareas diarias. ¡Completa los hábitos restantes para sellar el rito!',
        cls: 'bg-black text-white',
      };
    } else {
      return {
        icon: 'science',
        title: 'PASOS PRIMORDIALES',
        text: 'El día apenas comienza o tienes ritos pendientes. Transmuta al menos un hábito para elevar tu XP.',
        cls: 'bg-white text-black',
      };
    }
  });

  let shareMessage = $derived(
    `¡Hoy transmuté ${completedHabits.length}/${activeHabits.length} hábitos (+${totalXpToday} XP) en Transmute! ⚗️`
  );

  const buildShareFile = async (): Promise<{ file: File; dataUrl: string } | null> => {
    if (!shareCardRef) return null;
    try {
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Wait for the expanded (non-scrollable) layout to settle before capturing,
      // so every habit is included in the exported image.
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const dataUrl = await toPng(shareCardRef, {
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

      const blob = await (await fetch(dataUrl)).blob();
      const dateIso = new Date().toISOString().slice(0, 10);
      const file = new File([blob], `compartir-dia-${dateIso}.png`, { type: 'image/png' });
      return { file, dataUrl };
    } catch (err) {
      console.error('Failed building share image', err);
      return null;
    }
  };

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a');
    const dateIso = new Date().toISOString().slice(0, 10);
    link.download = `compartir-dia-${dateIso}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const canNativeShare = (file: File) => {
    if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return false;
    if (typeof navigator.canShare !== 'function') return false;
    try {
      return navigator.canShare({ files: [file] });
    } catch {
      return false;
    }
  };

  const handleShare = async () => {
    if (isExporting) return;
    isExporting = true;
    shareFeedback = 'idle';
    try {
      const result = await buildShareFile();
      if (!result) return;
      if (canNativeShare(result.file)) {
        await navigator.share({
          files: [result.file],
          title: `Mi día alquímico · ${todayStr}`,
          text: shareMessage,
        });
        shareFeedback = 'shared';
      } else {
        downloadImage(result.dataUrl);
        shareFeedback = 'downloaded';
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        shareFeedback = 'idle';
      } else {
        console.error('Failed sharing daily summary image', err);
        shareFeedback = 'error';
      }
    } finally {
      isExporting = false;
    }
  };

  const handleDownload = async () => {
    if (isExporting) return;
    isExporting = true;
    shareFeedback = 'idle';
    try {
      const result = await buildShareFile();
      if (!result) return;
      downloadImage(result.dataUrl);
      shareFeedback = 'downloaded';
    } catch (err) {
      console.error('Failed downloading daily summary image', err);
      shareFeedback = 'error';
    } finally {
      isExporting = false;
    }
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
    <div
      bind:this={shareCardRef}
      class="bg-white border-[3px] border-black p-6 w-full max-w-md wobbly-border shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative flex flex-col gap-5 animate-in fade-in zoom-in duration-150 {isExporting ? 'overflow-visible' : 'max-h-[90vh] overflow-y-auto'}"
    >
      <!-- Close Button -->
      <button
        type="button"
        onclick={onClose}
        class="no-export absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      >
        ✕
      </button>

      <!-- Header -->
      <div class="flex items-center gap-3 border-b-2 border-black pb-3 pr-8">
        <div class="w-12 h-12 border-[2px] border-black bg-amber-300 flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
          <span class="material-symbols-outlined text-3xl font-bold">share</span>
        </div>
        <div>
          <span class="font-mono-label text-[10px] font-bold uppercase text-neutral-500 block">
            Resumen del día
          </span>
          <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
            Comparte tu Día
          </h3>
          <p class="font-mono-label text-[11px] font-bold text-neutral-600 capitalize">
            {todayStr}
          </p>
        </div>
      </div>

      <!-- One-line Day Summary -->
      <div class="p-3 border-[3px] border-black bg-black text-white flex items-center gap-2.5 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
        <span class="material-symbols-outlined text-2xl text-amber-300 fill-1 shrink-0">auto_awesome</span>
        <p class="font-headline text-xs font-extrabold leading-snug">
          Hoy transmutaste {completedHabits.length} de {activeHabits.length} hábitos · +{totalXpToday} XP
        </p>
      </div>

      <!-- Main Progress Dial / Banner -->
      <div class="p-4 border-[3px] border-black bg-neutral-50 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <span class="font-mono-label text-xs font-bold uppercase text-black">
            Avance General Hoy
          </span>
          <span class="font-headline text-2xl font-extrabold text-black">
            {completionPercent}%
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-5 border-[2px] border-black bg-neutral-200 relative overflow-hidden">
          <div
            class="h-full bg-black transition-all duration-500"
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
            <Tooltip term="XP" content="Experiencia ganada hoy">
              <div class="flex flex-col items-center">
                <span class="font-headline text-lg font-extrabold text-amber-600">+{totalXpToday} XP</span>
                <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase">GANADOS</span>
              </div>
            </Tooltip>
          </div>
          <div class="flex flex-col">
            <Tooltip term="Racha" content="Máxima racha consecutiva de hábitos completados">
              <div class="flex flex-col items-center">
                <span class="font-headline text-lg font-extrabold text-red-600 flex items-center justify-center gap-0.5">
                  <span class="material-symbols-outlined text-base fill-1">local_fire_department</span>
                  {highestStreak}d
                </span>
                <span class="font-mono-label text-[10px] text-neutral-600 font-bold uppercase">RACHA MÁX</span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <!-- Wisdom Card -->
      <div class="relative p-3.5 border-[3px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] overflow-hidden {statusWisdom.cls}">
        <h4 class="font-headline text-sm font-extrabold mb-1 flex items-center gap-2">
          <span class="material-symbols-outlined text-lg fill-1">{statusWisdom.icon}</span>
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

        <div class="flex flex-col gap-2 pr-1 {isExporting ? 'overflow-visible' : 'max-h-80 overflow-y-auto scroll-smooth'}">
          {#each activeHabits as habit (habit.id)}
            {@const isDone = habit.completed}
            {@const isFailed = !isDone && habit.failed}
            <div class="p-2.5 border-[2px] border-black bg-white flex items-center justify-between shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 border border-black flex items-center justify-center font-bold text-xs {isDone ? 'bg-black text-white' : isFailed ? 'bg-red-700 text-white' : 'bg-neutral-100 text-black'}">
                  <span class="material-symbols-outlined text-base">
                    {isDone ? 'check' : isFailed ? 'close' : 'schedule'}
                  </span>
                </div>
                <div>
                  <h5 class="font-headline text-xs font-extrabold {isDone || isFailed ? 'line-through text-neutral-500' : 'text-black'}">
                    {habit.title}
                  </h5>
                  <span class="font-mono-label text-[10px] text-neutral-600 font-bold">
                    {isDone ? 'Completado' : isFailed ? 'No realizado' : 'Pendiente'}
                  </span>
                </div>
              </div>

              <span class="font-mono-label text-xs font-extrabold {isDone ? 'text-black' : 'text-neutral-400'}">
                {isDone ? `+${habit.xpReward} XP` : '0 XP'}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Shareable Card Footer -->
      <div class="flex items-center justify-between gap-2 border-t-2 border-black pt-3">
        <span class="font-mono-label text-[10px] font-bold uppercase text-neutral-500">
          Hecho con <span class="text-amber-600">⚗️ Transmute</span>
        </span>
        <span class="font-mono-label text-[10px] font-bold uppercase text-neutral-500">
          Nivel {userLevel} · {userName}
        </span>
      </div>

      <!-- Share Actions -->
      <div class="no-export flex flex-col gap-2.5">
        <button
          type="button"
          onclick={handleShare}
          disabled={isExporting}
          class="w-full py-3 bg-amber-300 text-black border-[2px] border-black font-headline text-sm font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-amber-200 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined text-xl">
            {isExporting ? 'hourglass_top' : 'share'}
          </span>
          {isExporting ? 'GENERANDO IMAGEN...' : 'COMPARTIR DÍA'}
        </button>

        <button
          type="button"
          onclick={handleDownload}
          disabled={isExporting}
          class="w-full py-2.5 bg-white text-black border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined text-lg">download</span>
          DESCARGAR IMAGEN
        </button>

        {#if shareFeedback === 'shared'}
          <div class="p-2.5 text-center bg-neutral-100 border-[2px] border-black font-mono-label text-xs font-bold text-green-700">
            <span class="material-symbols-outlined text-sm align-middle mr-1 fill-1">verified</span>
            ¡Tu día se compartió con éxito!
          </div>
        {:else if shareFeedback === 'downloaded'}
          <div class="p-2.5 text-center bg-neutral-100 border-[2px] border-black font-mono-label text-xs font-bold text-neutral-700">
            <span class="material-symbols-outlined text-sm align-middle mr-1 fill-1">download_done</span>
            Imagen guardada. ¡Compártela donde quieras!
          </div>
        {:else if shareFeedback === 'error'}
          <div class="p-2.5 text-center bg-red-50 border-[2px] border-red-700 font-mono-label text-xs font-bold text-red-700">
            <span class="material-symbols-outlined text-sm align-middle mr-1">error</span>
            No se pudo compartir. Intenta descargando la imagen.
          </div>
        {/if}
      </div>

      <!-- Daily Bonus Action -->
      {#if completionPercent >= 50 && !claimedBonusToday}
        <button
          type="button"
          onclick={() => onClaimBonus?.()}
          class="no-export w-full py-3 bg-black text-white border-[2px] border-black font-headline text-sm font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-800 cursor-pointer flex items-center justify-center gap-2 animate-bounce"
        >
          <span class="material-symbols-outlined text-xl text-amber-300">workspace_premium</span>
          ¡RECLAMAR BONO DIARIO ALQUÍMICO (+25 XP)!
        </button>
      {:else if claimedBonusToday}
        <div class="no-export p-2.5 text-center bg-neutral-100 border-[2px] border-black font-mono-label text-xs font-bold text-green-700">
          <span class="material-symbols-outlined text-sm align-middle mr-1 fill-1">verified</span>
          Bonus Diario Reclamado Hoy
        </div>
      {/if}
    </div>
  </div>
{/if}
