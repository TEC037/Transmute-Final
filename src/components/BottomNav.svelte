<script lang="ts">
  export type TabType = 'deck' | 'collection' | 'calendar' | 'studio' | 'shop' | 'me';

  interface Props {
    activeTab: TabType;
    onChangeTab: (tab: TabType) => void;
  }

  let { activeTab, onChangeTab }: Props = $props();

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'deck', label: 'Deck', icon: 'style' },
    { id: 'collection', label: 'Cromos', icon: 'inventory_2' },
    { id: 'calendar', label: 'Calendario', icon: 'calendar_month' },
    { id: 'studio', label: 'IA Studio', icon: 'auto_awesome' },
    { id: 'shop', label: 'Tienda', icon: 'storefront' },
    { id: 'me', label: 'Perfil', icon: 'person' },
  ];
</script>

<nav class="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2.5 bg-[#f9f9f9] border-t-[3px] border-black shadow-[0px_-4px_0px_0px_rgba(0,0,0,1)]">
  {#each tabs as tab}
    {@const isActive = activeTab === tab.id}
    <button
      type="button"
      onclick={() => onChangeTab(tab.id)}
      class="flex flex-col items-center justify-center transition-all cursor-pointer select-none {isActive
        ? 'bg-black text-white rounded-lg border-[3px] border-black px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
        : 'text-black p-2 hover:bg-neutral-200/50 rounded-lg active:scale-95'}"
    >
      <span
        class="material-symbols-outlined text-2xl {isActive ? 'fill-1' : ''}"
      >
        {tab.icon}
      </span>
      <span class="font-mono-label text-[11px] font-bold mt-0.5 tracking-tight">
        {tab.label}
      </span>
    </button>
  {/each}
</nav>
