<script lang="ts">
  import type { UserProfile } from '../types';

  interface Props {
    user: UserProfile;
    onOpenAttributeModal: () => void;
    onToggleBuff: (buffId: string) => void;
    onUpdateQuote: (quote: string) => void;
    onOpenOnboardingModal?: () => void;
    onResetProgressToZero?: () => void;
  }

  let {
    user,
    onOpenAttributeModal,
    onToggleBuff,
    onUpdateQuote,
    onOpenOnboardingModal,
    onResetProgressToZero,
  }: Props = $props();

  let isEditingQuote = $state(false);
  let quoteInput = $state('');

  $effect(() => {
    quoteInput = user.quote;
  });

  const handleSaveQuote = (e: SubmitEvent) => {
    e.preventDefault();
    if (quoteInput.trim()) {
      onUpdateQuote(quoteInput.trim());
    }
    isEditingQuote = false;
  };
</script>

<div class="flex flex-col gap-8 max-w-xl mx-auto pb-12">
  <!-- Hero Section: Portrait & Name -->
  <section class="flex flex-col items-center gap-4 text-center pt-2">
    <div class="relative">
      <!-- Main Portrait Frame -->
      <div class="w-40 h-40 wobbly-border bg-white p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] mx-auto">
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
            <p class="font-body text-xs md:text-sm text-black leading-tight font-bold">
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
  <section class="flex flex-col gap-4 bg-white border-[3px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] wobbly-border">
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
            <span class="material-symbols-outlined text-black fill-1">
              fitness_center
            </span>
            <span class="font-mono-label text-xs font-bold uppercase tracking-wider">
              Fuerza (Strength)
            </span>
          </div>
          <span class="font-mono-label text-xs font-bold">{user.attributes.strength}%</span>
        </div>
        <div class="h-7 w-full border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
          <div
            class="absolute top-0 left-0 h-full bg-black transition-all duration-500"
            style="width: {user.attributes.strength}%;"
          ></div>
          <div class="absolute inset-0 halftone-bg pointer-events-none"></div>
        </div>
      </div>

      <!-- Focus -->
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center px-1">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-black fill-1">
              lightbulb
            </span>
            <span class="font-mono-label text-xs font-bold uppercase tracking-wider">
              Enfoque (Focus)
            </span>
          </div>
          <span class="font-mono-label text-xs font-bold">{user.attributes.focus}%</span>
        </div>
        <div class="h-7 w-full border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
          <div
            class="absolute top-0 left-0 h-full bg-black transition-all duration-500"
            style="width: {user.attributes.focus}%;"
          ></div>
          <div class="absolute inset-0 halftone-bg pointer-events-none"></div>
        </div>
      </div>

      <!-- Vitality -->
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center px-1">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-black fill-1">
              favorite
            </span>
            <span class="font-mono-label text-xs font-bold uppercase tracking-wider">
              Vitalidad (Vitality)
            </span>
          </div>
          <span class="font-mono-label text-xs font-bold">{user.attributes.vitality}%</span>
        </div>
        <div class="h-7 w-full border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
          <div
            class="absolute top-0 left-0 h-full bg-black transition-all duration-500"
            style="width: {user.attributes.vitality}%;"
          ></div>
          <div class="absolute inset-0 halftone-bg pointer-events-none"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Active Buffs -->
  <section class="flex flex-col gap-3">
    <div class="flex justify-between items-center border-b-2 border-black w-fit pb-1 pr-4">
      <h3 class="font-mono-label text-xs font-bold text-neutral-700 uppercase tracking-wider">
        Active Buffs & Potions
      </h3>
    </div>

    <div class="grid grid-cols-3 gap-3 md:gap-4">
      {#each user.activeBuffs as buff (buff.id)}
        <button
          type="button"
          onclick={() => onToggleBuff(buff.id)}
          class="aspect-square border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer relative overflow-hidden {buff.active
            ? 'bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
            : 'bg-neutral-200 opacity-50 grayscale'}"
          title="{buff.name}: {buff.description}"
        >
          <div class="absolute inset-0 halftone-bg pointer-events-none"></div>
          <span class="material-symbols-outlined text-3xl md:text-4xl text-black font-bold mb-1">
            {buff.icon}
          </span>
          <span class="font-mono-label text-[10px] font-bold uppercase tracking-tight line-clamp-1">
            {buff.name}
          </span>
          <span class="text-[9px] text-neutral-600 font-bold mt-0.5">
            {buff.active ? 'ACTIVO' : 'INACTIVO'}
          </span>
        </button>
      {/each}
    </div>
  </section>

  <!-- Main Action Buttons -->
  <section class="mt-2 flex flex-col gap-3">
    <button
      type="button"
      onclick={onOpenAttributeModal}
      class="w-full bg-white border-[3px] border-black py-4 font-headline text-2xl md:text-3xl font-extrabold text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-tight hover:bg-neutral-100 cursor-pointer flex items-center justify-center gap-3"
    >
      <span class="material-symbols-outlined text-3xl">tune</span>
      AJUSTAR ATRIBUTOS
    </button>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        onclick={() => onOpenOnboardingModal?.()}
        class="py-3 px-4 bg-amber-300 text-black border-[2.5px] border-black font-headline text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-amber-400 cursor-pointer flex items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined text-xl">auto_awesome</span>
        VER GUÍA DE BIENVENIDA
      </button>

      <button
        type="button"
        onclick={() => onResetProgressToZero?.()}
        class="py-3 px-4 bg-red-100 text-red-800 border-[2.5px] border-black font-headline text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-red-200 cursor-pointer flex items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined text-xl">restart_alt</span>
        REINICIAR DESDE NIVEL 1
      </button>
    </div>
  </section>
</div>
