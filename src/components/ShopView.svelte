<script lang="ts">
  import type { ShopItem, UserProfile } from '../types';

  interface Props {
    user: UserProfile;
    items: ShopItem[];
    onBuyItem: (item: ShopItem) => void;
  }

  let { user, items, onBuyItem }: Props = $props();
</script>

<div class="flex flex-col gap-6 max-w-xl mx-auto pb-12">
  <!-- Header -->
  <div class="flex justify-between items-end border-b-2 border-black pb-3">
    <div>
      <h2 class="font-headline text-3xl md:text-4xl text-black font-extrabold rotate-[-1deg] leading-none">
        Tienda de Alquimia
      </h2>
      <p class="text-xs text-neutral-600 font-medium mt-1">
        Intercambia tus puntos de experiencia (XP) por sobres y pociones
      </p>
    </div>
    <div class="bg-black text-white px-3 py-1 font-mono-label text-xs font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      {user.currentXp} XP
    </div>
  </div>

  <!-- Item List -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each items as item (item.id)}
      {@const canAfford = user.currentXp >= item.priceXp}

      <div
        class="bg-white border-[3px] border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] wobbly-border flex flex-col justify-between hover:translate-y-[-2px] transition-all"
      >
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="w-12 h-12 border-[2.5px] border-black bg-[#f3f3f4] flex items-center justify-center rotate-[-2deg] shrink-0">
              <span class="material-symbols-outlined text-3xl text-black">
                {item.icon}
              </span>
            </div>
            <span class="font-mono-label text-xs bg-black text-white px-2 py-0.5 font-bold uppercase">
              {item.priceXp} XP
            </span>
          </div>

          <h3 class="font-headline text-lg font-extrabold text-black leading-tight">
            {item.title}
          </h3>
          <p class="text-xs text-neutral-600 font-medium mt-1">
            {item.description}
          </p>
        </div>

        <button
          type="button"
          onclick={() => canAfford && onBuyItem(item)}
          disabled={!canAfford}
          class="mt-4 w-full py-2.5 font-mono-label text-xs font-bold border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer {canAfford
            ? 'bg-black text-white hover:bg-neutral-800'
            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed opacity-60 shadow-none'}"
        >
          <span class="material-symbols-outlined text-base">shopping_cart</span>
          {canAfford ? 'ADQUIRIR' : 'XP INSUFICIENTE'}
        </button>
      </div>
    {/each}
  </div>
</div>
