<script lang="ts">
  import confetti from 'canvas-confetti';
  import type { AlbumCard } from '../types';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    onGrantCards: (grantedCards: AlbumCard[]) => void;
    availableCards: AlbumCard[];
  }

  let { isOpen, onClose, onGrantCards, availableCards }: Props = $props();

  let stage = $state<'sealed' | 'opening' | 'revealed'>('sealed');
  let revealedCards = $state<AlbumCard[]>([]);

  const handleOpenPack = () => {
    stage = 'opening';

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#000000', '#333333', '#ffffff', '#777777'],
      });

      const cardsToGrant: AlbumCard[] = [];
      const selectable = availableCards.filter((c) => c.status !== 'empty');

      for (let i = 0; i < 2; i++) {
        const randomCard = selectable[Math.floor(Math.random() * selectable.length)];
        if (randomCard && !cardsToGrant.some((c) => c.id === randomCard.id)) {
          cardsToGrant.push({
            ...randomCard,
            status: 'unlocked',
            currentLevel: Math.min(randomCard.maxLevel, Math.max(1, randomCard.currentLevel + 1)),
          });
        }
      }

      revealedCards = cardsToGrant;
      onGrantCards(cardsToGrant);
      stage = 'revealed';
    }, 1200);
  };

  const handleResetAndClose = () => {
    stage = 'sealed';
    revealedCards = [];
    onClose();
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div
      class="bg-white border-[4px] border-black p-6 w-full max-w-md wobbly-border shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden animate-in fade-in zoom-in duration-150"
    >
      <!-- Close button -->
      <button
        type="button"
        onclick={handleResetAndClose}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        ✕
      </button>

      <h3 class="font-headline text-2xl md:text-3xl font-extrabold text-black text-center mb-1">
        Sobre de Cromos Vintage
      </h3>
      <p class="text-xs text-neutral-600 text-center font-bold mb-6 uppercase tracking-wide">
        {stage === 'sealed'
          ? 'Tira del sello de tinta para revelar los cromos'
          : stage === 'opening'
          ? '¡Transmutando pigmentos de tinta!'
          : '¡Nuevos cromos añadidos a tu Colección!'}
      </p>

      <!-- Booster Graphic -->
      {#if stage === 'sealed'}
        <div class="flex flex-col items-center gap-6 my-4">
          <div
            class="w-48 h-64 border-[4px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-between p-4 relative overflow-hidden wobbly-border hover:rotate-1 transition-transform"
          >
            <div class="w-full bg-black text-white text-center font-mono-label text-xs py-1 font-bold uppercase">
              N° 1930 BOOSTER
            </div>
            <div class="my-auto text-center">
              <span class="material-symbols-outlined text-6xl text-black">
                invert_colors
              </span>
              <div class="font-headline text-lg font-extrabold text-black mt-2">
                CROMOS DE TINTA VINTAGE
              </div>
              <p class="text-[10px] font-mono font-bold text-neutral-600 mt-1 uppercase">
                Gotas Alquímicas de 1930
              </p>
            </div>
            <div class="w-full h-3 border-t-[2px] border-dashed border-black halftone"></div>
          </div>

          <button
            type="button"
            onclick={handleOpenPack}
            class="w-full py-3.5 bg-black text-white border-[3px] border-black font-headline text-xl font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-neutral-800 transition-all cursor-pointer"
          >
            ¡ABRIR SOBRE AHORA!
          </button>
        </div>
      {/if}

      <!-- Opening Animation -->
      {#if stage === 'opening'}
        <div class="flex flex-col items-center justify-center my-12 gap-4">
          <div
            class="w-32 h-44 border-[4px] border-black bg-black text-white flex items-center justify-center halftone animate-pulse"
          >
            <span class="material-symbols-outlined text-5xl animate-spin">
              auto_starter
            </span>
          </div>
          <p class="font-mono-label text-xs font-bold text-black animate-pulse">
            Abriendo sobre...
          </p>
        </div>
      {/if}

      <!-- Revealed Cards -->
      {#if stage === 'revealed'}
        <div class="flex flex-col items-center gap-4 my-2">
          <div class="grid grid-cols-2 gap-3 w-full">
            {#each revealedCards as card, idx (card.id)}
              <div
                class="border-[3px] border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center wobbly-border animate-in zoom-in duration-300"
              >
                <span class="material-symbols-outlined text-3xl text-black fill-1 mb-1">
                  {card.icon || 'stars'}
                </span>
                <h4 class="font-headline text-sm font-extrabold leading-tight text-black">
                  {card.title}
                </h4>
                <span class="font-mono-label text-[10px] bg-black text-white px-1.5 py-0.5 font-bold uppercase mt-1">
                  LV {card.currentLevel}
                </span>
              </div>
            {/each}
          </div>

          <button
            type="button"
            onclick={handleResetAndClose}
            class="w-full mt-4 py-3 bg-black text-white border-[3px] border-black font-headline text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            GUARDAR EN ÁLBUM
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
