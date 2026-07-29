<script lang="ts">
  import type { AlbumCard } from '../types';

  interface Props {
    cards: AlbumCard[];
    onSelectCard: (card: AlbumCard) => void;
    onOpenBoosterPackModal: () => void;
  }

  let { cards, onSelectCard, onOpenBoosterPackModal }: Props = $props();

  let filter = $state<'all' | 'unlocked' | 'locked'>('all');

  let unlockedCount = $derived(cards.filter((c) => c.status === 'unlocked').length);
  let totalSlots = $derived(cards.length);
  let progressPercent = $derived(Math.round((unlockedCount / totalSlots) * 100));

  let filteredCards = $derived(
    cards.filter((card) => {
      if (filter === 'unlocked') return card.status === 'unlocked';
      if (filter === 'locked') return card.status === 'locked' || card.status === 'empty';
      return true;
    })
  );
</script>

<div class="flex flex-col gap-8 max-w-xl mx-auto pb-10">
  <!-- Title & Progress Section -->
  <section class="flex flex-col gap-4">
    <h2 class="font-headline text-3xl md:text-5xl text-black font-extrabold leading-none animate-squish tracking-tight">
      El Álbum de Cromos
    </h2>

    <div class="space-y-1.5">
      <div class="flex justify-between items-end mb-1">
        <span class="font-mono-label text-xs font-bold text-black uppercase tracking-wider">
          PROGRESS: {progressPercent}%
        </span>
        <span class="font-mono-label text-xs font-bold text-black uppercase">
          {unlockedCount}/{totalSlots} UNLOCKED
        </span>
      </div>

      <!-- Progress Bar Container -->
      <div class="h-8 w-full wobbly-border bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div
          class="h-full bg-black halftone transition-all duration-1000 border-r-[3px] border-black"
          style="width: {progressPercent}%;"
        ></div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 pt-2">
      <button
        type="button"
        onclick={() => (filter = 'all')}
        class="px-3 py-1 font-mono-label text-xs font-bold border-[2px] border-black transition-all cursor-pointer {filter === 'all'
          ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white text-black hover:bg-neutral-100'}"
      >
        TODOS ({totalSlots})
      </button>
      <button
        type="button"
        onclick={() => (filter = 'unlocked')}
        class="px-3 py-1 font-mono-label text-xs font-bold border-[2px] border-black transition-all cursor-pointer {filter === 'unlocked'
          ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white text-black hover:bg-neutral-100'}"
      >
        DESBLOQUEADOS ({unlockedCount})
      </button>
      <button
        type="button"
        onclick={() => (filter = 'locked')}
        class="px-3 py-1 font-mono-label text-xs font-bold border-[2px] border-black transition-all cursor-pointer {filter === 'locked'
          ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white text-black hover:bg-neutral-100'}"
      >
        BLOQUEADOS ({totalSlots - unlockedCount})
      </button>
    </div>
  </section>

  <!-- Grid: 2-column Album Layout -->
  <div class="grid grid-cols-2 gap-4 md:gap-6">
    {#each filteredCards as card (card.id)}
      {#if card.status === 'empty'}
        <button
          type="button"
          onclick={onOpenBoosterPackModal}
          class="aspect-[3/4] wobbly-border-dashed bg-[#f3f3f4] flex flex-col items-center justify-center p-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group select-none text-left w-full"
        >
          <span class="material-symbols-outlined text-3xl mb-1 text-neutral-500 group-hover:scale-110 transition-transform">
            add_circle_outline
          </span>
          <span class="font-mono-label text-xs font-bold text-black text-center">
            Empty Slot #{card.slotNumber}
          </span>
          <span class="text-[10px] text-neutral-500 font-bold mt-1">
            Abre sobres
          </span>
        </button>

      {:else if card.status === 'locked'}
        <button
          type="button"
          onclick={() => onSelectCard(card)}
          class="flex flex-col group relative cursor-pointer text-left w-full p-0 bg-transparent border-none"
        >
          <div class="aspect-[3/4] bg-neutral-200 wobbly-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col p-3 relative overflow-hidden group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all w-full">
            <div class="absolute inset-0 halftone opacity-30 pointer-events-none"></div>
            
            <!-- Lock badge overlay -->
            <div class="absolute inset-0 flex items-center justify-center z-10">
              <div class="bg-white wobbly-border p-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-5deg]">
                <span class="material-symbols-outlined text-black text-3xl font-bold">
                  lock
                </span>
              </div>
            </div>

            <!-- Blurred card preview -->
            <div class="flex-grow flex items-center justify-center py-2 grayscale opacity-20 filter blur-[1px]">
              {#if card.imageUrl}
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  class="w-full h-28 object-contain"
                />
              {:else}
                <span class="material-symbols-outlined text-6xl text-neutral-800">
                  {card.icon || 'help'}
                </span>
              {/if}
            </div>

            <div class="mt-auto opacity-40">
              <h3 class="font-headline text-sm font-extrabold leading-tight text-black line-clamp-1">
                {card.title}
              </h3>
            </div>
          </div>
        </button>

      {:else}
        <!-- Unlocked / Mastered Card -->
        {@const isMax = card.currentLevel >= card.maxLevel}
        <button
          type="button"
          onclick={() => onSelectCard(card)}
          class="flex flex-col group cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-left w-full p-0 bg-transparent border-none"
        >
          <div
            class="aspect-[3/4] bg-white {isMax ? 'double-border' : 'wobbly-border'} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col p-3 relative overflow-hidden group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full"
          >
            <div class="flex justify-between items-start mb-2">
              <span class="material-symbols-outlined text-black scale-110 fill-1">
                {card.icon || 'stars'}
              </span>
              {#if isMax}
                <div class="bg-black text-white px-1.5 py-0.5 rounded-xs">
                  <span class="font-mono-label text-[10px] font-bold">MAX</span>
                </div>
              {:else}
                <div class="bg-neutral-100 border-[1.5px] border-black px-1.5 py-0.5">
                  <span class="font-mono-label text-[10px] font-bold text-black">
                    LV {card.currentLevel}/{card.maxLevel}
                  </span>
                </div>
              {/if}
            </div>

            <div class="flex-grow flex items-center justify-center py-2 relative">
              {#if card.imageUrl}
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  class="w-full h-28 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              {:else}
                <div class="w-20 h-20 bg-neutral-100 border-[2px] border-black flex items-center justify-center rotate-[-2deg]">
                  <span class="material-symbols-outlined text-4xl text-black">
                    {card.icon || 'auto_awesome'}
                  </span>
                </div>
              {/if}
            </div>

            <div class="mt-auto">
              <h3 class="font-headline text-sm font-extrabold leading-tight text-black line-clamp-1">
                {card.title}
              </h3>
            </div>
          </div>
        </button>
      {/if}
    {/each}
  </div>

  <!-- Big Action Call Button -->
  <button
    type="button"
    onclick={onOpenBoosterPackModal}
    class="w-full py-5 bg-white wobbly-border shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-headline text-xl md:text-2xl font-extrabold text-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all mt-4 hover:bg-neutral-100 cursor-pointer flex items-center justify-center gap-2"
  >
    <span class="material-symbols-outlined text-3xl">local_mall</span>
    CONSEGUIR MÁS CROMOS
  </button>
</div>
