<script lang="ts">
  import type { AlbumCard } from '../types';

  interface Props {
    card: AlbumCard | null;
    isOpen: boolean;
    onClose: () => void;
    onUpgradeCard?: (cardId: string) => void;
  }

  let { card, isOpen, onClose, onUpgradeCard }: Props = $props();

  let isLocked = $derived(card ? card.status === 'locked' || card.status === 'empty' : true);
  let isMax = $derived(card ? card.currentLevel >= card.maxLevel : false);
</script>

{#if isOpen && card}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div
      class="bg-white border-[4px] border-black p-6 w-full max-w-sm wobbly-border shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden animate-in fade-in zoom-in duration-150"
    >
      <!-- Close button -->
      <button
        type="button"
        onclick={onClose}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        ✕
      </button>

      <!-- Card Frame -->
      <div
        class="aspect-[3/4] bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative overflow-hidden my-2 {isLocked
          ? 'grayscale opacity-60'
          : ''}"
      >
        <div class="flex justify-between items-start">
          <span class="font-mono-label text-xs font-bold text-black border-[1.5px] border-black px-1.5 py-0.5">
            #{card.slotNumber}
          </span>
          <span class="font-mono-label text-xs bg-black text-white px-2 py-0.5 font-bold uppercase">
            {card.rarity}
          </span>
        </div>

        <div class="flex flex-col items-center justify-center my-auto py-4">
          {#if card.imageUrl}
            <img
              src={card.imageUrl}
              alt={card.title}
              class="w-36 h-36 object-contain mb-2"
            />
          {:else}
            <div class="w-24 h-24 border-[3px] border-black bg-neutral-100 flex items-center justify-center rotate-[-3deg] mb-2">
              <span class="material-symbols-outlined text-5xl text-black">
                {card.icon || 'auto_awesome'}
              </span>
            </div>
          {/if}
          <h3 class="font-headline text-2xl font-extrabold text-black text-center leading-tight">
            {card.title}
          </h3>
          <p class="font-mono-label text-[11px] font-bold text-neutral-600 text-center uppercase tracking-wider mt-1">
            {card.category}
          </p>
        </div>

        <div class="border-t-[2px] border-black pt-2">
          <p class="text-xs text-neutral-700 italic text-center font-medium">
            "{card.flavorText || card.description}"
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-4 flex flex-col gap-2">
        {#if !isLocked && !isMax && onUpgradeCard}
          <button
            type="button"
            onclick={() => onUpgradeCard(card.id)}
            class="w-full py-3 bg-black text-white border-[3px] border-black font-headline text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-xl">upgrade</span>
            MEJORAR CROMO (LV {card.currentLevel + 1})
          </button>
        {/if}

        <button
          type="button"
          onclick={onClose}
          class="w-full py-2 bg-white text-black border-[2px] border-black font-mono-label text-xs font-bold hover:bg-neutral-100 transition-all cursor-pointer"
        >
          CERRAR DETALLES
        </button>
      </div>
    </div>
  </div>
{/if}
