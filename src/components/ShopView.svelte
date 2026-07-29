<script lang="ts">
  import type { ShopItem, UserProfile } from '../types';

  interface Props {
    user: UserProfile;
    items: ShopItem[];
    onBuyItem: (item: ShopItem) => void;
  }

  let { user, items, onBuyItem }: Props = $props();

  let userInk = $derived(user.inkDrops ?? 0);
</script>

<div class="flex flex-col gap-6 max-w-xl mx-auto pb-12">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-black pb-3 gap-3">
    <div>
      <h2 class="font-headline text-3xl md:text-4xl text-black font-extrabold rotate-[-1deg] leading-none">
        Tienda de Alquimia
      </h2>
      <p class="text-xs text-neutral-600 font-medium mt-1">
        Canjea tus <strong class="text-black font-extrabold">Gotas de Tinta (💧)</strong> por sobres de cromos vintage y tus XP por pociones
      </p>
    </div>
    
    <div class="flex items-center gap-2 self-end sm:self-auto">
      <div 
        class="bg-white text-black px-3 py-1 font-mono-label text-xs font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5"
        title="Gotas de tinta obtenidas al completar hábitos"
      >
        <span class="material-symbols-outlined text-sm text-black">invert_colors</span>
        <span class="font-black text-sm">{userInk} Gotas</span>
      </div>

      <div class="bg-black text-white px-3 py-1 font-mono-label text-xs font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {user.currentXp} XP
      </div>
    </div>
  </div>

  <!-- Item List -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each items as item (item.id)}
      {@const costsInk = item.priceInk !== undefined}
      {@const price = costsInk ? item.priceInk! : item.priceXp!}
      {@const canAfford = costsInk ? userInk >= price : user.currentXp >= price}

      <div
        class="bg-white border-[3px] border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] wobbly-border flex flex-col justify-between hover:translate-y-[-2px] transition-all relative overflow-hidden"
      >
        {#if item.category === 'pack'}
          <div class="absolute top-0 right-0 bg-black text-white font-mono-label text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider border-b border-l border-black">
            SOBRE VINTAGE
          </div>
        {/if}

        <div>
          <div class="flex items-start justify-between gap-2 mb-2 mt-1">
            <div class="w-12 h-12 border-[2.5px] border-black bg-[#f3f3f4] flex items-center justify-center rotate-[-2deg] shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span class="material-symbols-outlined text-3xl text-black">
                {item.icon}
              </span>
            </div>

            <span class="font-mono-label text-xs px-2.5 py-1 font-bold uppercase border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 {costsInk ? 'bg-amber-300 text-black' : 'bg-black text-white'}">
              {#if costsInk}
                <span class="material-symbols-outlined text-xs">invert_colors</span>
                {price} GOTAS
              {:else}
                {price} XP
              {/if}
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
            ? costsInk ? 'bg-black text-white hover:bg-neutral-800' : 'bg-black text-white hover:bg-neutral-800'
            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed opacity-60 shadow-none'}"
        >
          <span class="material-symbols-outlined text-base">
            {item.category === 'pack' ? 'auto_awesome' : 'shopping_cart'}
          </span>
          {canAfford
            ? item.category === 'pack' ? 'ABRIR SOBRE VINTAGE' : 'ADQUIRIR'
            : costsInk ? 'TINTA INSUFICIENTE' : 'XP INSUFICIENTE'}
        </button>
      </div>
    {/each}
  </div>
</div>
