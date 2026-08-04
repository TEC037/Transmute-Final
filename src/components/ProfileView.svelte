<script lang="ts">
  import type { UserProfile, HabitCard } from '../types';
  import WeeklyHabitChart from './WeeklyHabitChart.svelte';

  interface Props {
    user: UserProfile;
    habits?: HabitCard[];
    isNoirDarkMode?: boolean;
    onOpenAttributeModal?: () => void;
    onUpdateQuote?: (quote: string) => void;
    onAllocatePoint?: (attr: 'strength' | 'focus' | 'vitality') => void;
    onOpenOnboardingModal?: () => void;
    onResetProgressToZero?: () => void;
    onToggleNoirDarkMode?: () => void;
  }

  let {
    user,
    habits = [],
    isNoirDarkMode = false,
    onOpenAttributeModal,
    onUpdateQuote,
    onAllocatePoint,
    onOpenOnboardingModal,
    onResetProgressToZero,
    onToggleNoirDarkMode,
  }: Props = $props();

  let isEditingQuote = $state(false);
  let quoteInput = $state('');

  $effect(() => {
    quoteInput = user?.quote || '';
  });

  const handleSaveQuote = (e: SubmitEvent) => {
    e.preventDefault();
    if (quoteInput.trim()) {
      onUpdateQuote?.(quoteInput.trim());
    }
    isEditingQuote = false;
  };

  const handleAllocatePoint = (attr: 'strength' | 'focus' | 'vitality') => {
    onAllocatePoint?.(attr);
  };

  const openAttributeModal = () => {
    onOpenAttributeModal?.();
  };

  const openOnboarding = () => {
    onOpenOnboardingModal?.();
  };

  const resetProgress = () => {
    onResetProgressToZero?.();
  };
</script>

<div class="flex flex-col gap-8 max-w-xl mx-auto pb-12">
  <!-- Hero Section: Portrait & Name -->
  <section class="flex flex-col items-center gap-4 text-center pt-2">
    <div class="relative">
      <!-- Main Portrait Frame -->
      <div class="w-40 h-40 bg-white p-2 border-[3px] border-black shadow-[5px_5px_0_0_rgba(0,0,0,1)] mx-auto">
        <img
          src={user.avatarUrl}
          alt={user.name}
          class="w-full h-full object-contain grayscale"
        />
      </div>

      <!-- Speech Bubble -->
      <div class="absolute -top-12 -right-6 md:-right-12 max-w-[200px] z-10">
        {#if isEditingQuote}
          <form onsubmit={handleSaveQuote} class="speech-bubble text-left">
            <input
              type="text"
              bind:value={quoteInput}
              class="w-full text-xs font-bold border-b border-black outline-none bg-transparent"
            />
            <button
              type="submit"
              class="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-xs mt-1 font-bold uppercase cursor-pointer"
            >
              Guardar
            </button>
          </form>
        {:else}
          <button
            type="button"
            onclick={() => (isEditingQuote = true)}
            class="speech-bubble cursor-pointer hover:scale-105 transition-transform text-left bg-white p-0"
            title="Haz clic para editar frase"
          >
            <p class="text-xs md:text-sm text-black leading-tight font-bold">
              "{user.quote}"
            </p>
          </button>
        {/if}
      </div>
    </div>

    <!-- Character Title -->
    <div class="mt-3">
      <h2 class="font-headline text-3xl md:text-5xl text-black font-extrabold tracking-tight">
        {user.name}
      </h2>
      <div class="flex items-center justify-center gap-2 mt-1">
        <span class="font-mono-label text-xs bg-black text-white px-2 py-0.5 font-bold uppercase">
          Nivel {user.level} Alquimista
        </span>
        <span class="font-mono-label text-xs font-bold text-neutral-600">
          XP Total: {user.totalXp}
        </span>
      </div>
    </div>
  </section>

  <!-- RPG Stats Section -->
  <section class="flex flex-col gap-4 bg-white border-[3px] border-black p-5 shadow-[5px_5px_0_0_rgba(0,0,0,1)]">
    <div class="flex justify-between items-center border-b-2 border-black pb-2">
      <h3 class="font-headline text-xl font-extrabold text-black uppercase tracking-tight">
        Atributos Principales
      </h3>
      {#if user.availablePoints > 0}
        <span class="font-mono-label text-xs bg-black text-white px-2 py-0.5 font-bold animate-pulse">
          +{user.availablePoints} PUNTOS DISPONIBLES
        </span>
      {/if}
    </div>

    <div class="flex flex-col gap-4">
      <!-- Strength -->
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center px-1">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-black fill-1">fitness_center</span>
            <span class="font-mono-label text-xs font-bold uppercase tracking-wider">Fuerza (Strength)</span>
          </div>
          <span class="font-mono-label text-xs font-bold">{user.attributes.strength}%</span>
        </div>
        <div class="h-7 w-full border-[3px] border-black bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] overflow-hidden relative">
          <div
            class="absolute top-0 left-0 h-full bg-black transition-all duration-500"
            style="width: {user.attributes.strength}%;"
          ></div>
  
        </div>
        <div class="flex gap-2 mt-2">
          <button onclick={() => handleAllocatePoint('strength')} class="px-2 py-1 bg-black text-white text-xs font-bold border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">+Punto</button>
        </div>
      </div>

      <!-- Focus -->
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center px-1">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-black fill-1">lightbulb</span>
            <span class="font-mono-label text-xs font-bold uppercase tracking-wider">Enfoque (Focus)</span>
          </div>
          <span class="font-mono-label text-xs font-bold">{user.attributes.focus}%</span>
        </div>
        <div class="h-7 w-full border-[3px] border-black bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] overflow-hidden relative">
          <div
            class="absolute top-0 left-0 h-full bg-black transition-all duration-500"
            style="width: {user.attributes.focus}%;"
          ></div>
  
        </div>
        <div class="flex gap-2 mt-2">
          <button onclick={() => handleAllocatePoint('focus')} class="px-2 py-1 bg-black text-white text-xs font-bold border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">+Punto</button>
        </div>
      </div>

      <!-- Vitality -->
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center px-1">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-black fill-1">favorite</span>
            <span class="font-mono-label text-xs font-bold uppercase tracking-wider">Vitalidad (Vitality)</span>
          </div>
          <span class="font-mono-label text-xs font-bold">{user.attributes.vitality}%</span>
        </div>
        <div class="h-7 w-full border-[3px] border-black bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] overflow-hidden relative">
          <div
            class="absolute top-0 left-0 h-full bg-black transition-all duration-500"
            style="width: {user.attributes.vitality}%;"
          ></div>
  
        </div>
        <div class="flex gap-2 mt-2">
          <button onclick={() => handleAllocatePoint('vitality')} class="px-2 py-1 bg-black text-white text-xs font-bold border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">+Punto</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Weekly Habit Performance Chart (Recharts Noir) -->
  {#if habits && habits.length > 0}
    <section class="flex flex-col gap-3">
      <WeeklyHabitChart {habits} userLevel={user.level} />
    </section>
  {/if}

  <!-- Main Action Buttons & Settings -->
  <section class="mt-2 flex flex-col gap-3">
    <!-- Noir Dark Mode Toggle in Settings -->
    {#if onToggleNoirDarkMode}
      <div class="bg-white border-[3px] border-black p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 border-[2px] border-black bg-amber-300 text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span class="material-symbols-outlined text-xl">movie_filter</span>
          </div>
          <div>
            <h4 class="font-headline text-base font-extrabold text-black leading-tight">Modo Noir (Cine 1930)</h4>
            <p class="font-mono-label text-[11px] text-neutral-600 font-bold mt-0.5">Estética de cine mudo vintage en alto contraste sepia y negro profundo.</p>
          </div>
        </div>

        <button
          type="button"
          onclick={() => onToggleNoirDarkMode?.()}
          class="px-3.5 py-2 border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          {isNoirDarkMode ? 'ACTIVADO' : 'DESACTIVADO'}
        </button>
      </div>
    {/if}

    <button
      type="button"
      onclick={openAttributeModal}
      class="w-full bg-white border-[2px] border-black py-4 font-headline text-2xl md:text-3xl font-extrabold text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
    >
      <span class="material-symbols-outlined text-3xl">tune</span>
      AJUSTAR ATRIBUTOS
    </button>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        onclick={openOnboarding}
        class="py-3 px-4 bg-amber-300 text-black border-[2px] border-black font-headline text-sm font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      >
        <span class="material-symbols-outlined text-xl">auto_awesome</span>
        VER GUÍA DE BIENVENIDA
      </button>

      <button
        type="button"
        onclick={resetProgress}
        class="py-3 px-4 bg-red-600 text-white border-[2px] border-black font-headline text-sm font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      >
        <span class="material-symbols-outlined text-xl">restart_alt</span>
        REINICIAR DESDE NIVEL 1
      </button>
    </div>
  </section>
</div>
