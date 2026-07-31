<script lang="ts">
  import { userStore } from '../lib/stores';
  import { uiStore } from '../lib/stores';
  import { derived } from 'svelte/store';

  // expose minimal events for parent wiring
  const openLevelInfo = () => uiStore.update((s) => ({ ...s, modals: { ...s.modals, levelInfo: true } }));
  const openAuth = () => uiStore.update((s) => ({ ...s, modals: { ...s.modals, auth: true } }));
  const openAssistant = () => uiStore.update((s) => ({ ...s, modals: { ...s.modals, assistant: true } }));
  const toggleNoir = () => uiStore.update((s) => ({ ...s, noir: !s.noir }));

  const user = userStore;
  const xpPercent = derived(user, ($u) => Math.min(100, Math.round((($u.currentXp || 0) / Math.max(1, $u.maxXp || 100)) * 100)));
</script>

<header class="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 py-3 bg-[#f9f9f9] border-b-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  <div class="flex items-center gap-3">
    <!-- Avatar -->
    <button 
      type="button"
      on:click={openLevelInfo}
      class="w-11 h-11 bg-white border-[3px] border-black wobbly-border overflow-hidden rotate-[-2deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform p-0"
      title="Ver nivel del Alquimista"
    >
      <img 
        src={$user.avatarUrl} 
        alt={$user.name} 
        class="w-full h-full object-cover grayscale"
      />
    </button>

    <!-- Title & Level Bar -->
    <div>
      <div class="flex items-center gap-2">
        <h1 class="font-headline text-2xl md:text-3xl text-black font-extrabold tracking-tight leading-none">
          Transmute
        </h1>
      </div>
      <div class="flex items-center gap-2 mt-0.5">
        <span class="font-mono-label text-[10px] bg-black text-white px-1 py-0.2 uppercase font-bold tracking-wider">
          Lvl {$user.level}
        </span>
        <button 
          type="button"
          class="w-20 md:w-28 h-2.5 border-[2px] border-black bg-white relative overflow-hidden cursor-pointer p-0"
          on:click={openLevelInfo}
          title="{$user.currentXp} / {$user.maxXp} XP"
        >
          <div 
            class="absolute inset-y-0 left-0 bg-black ink-fill transition-all duration-500"
            style="width: {$xpPercent}%;"
          ></div>
        </button>
      </div>
    </div>
  </div>

  <!-- Right Actions: Auth, Dark Mode, XP Badge & AI Assistant -->
  <div class="flex items-center gap-2">
    <button
      type="button"
      on:click={toggleNoir}
      class="border-[2.5px] border-black p-1.5 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-black text-white"
      title="Toggle Noir"
    >
      <span class="material-symbols-outlined text-lg">dark_mode</span>
    </button>

    <button
      type="button"
      on:click={openAssistant}
      class="bg-amber-300 border-[2.5px] border-black p-1.5 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      title="Asistente de Flujos Alquímico AI"
    >
      <span class="material-symbols-outlined text-lg">auto_awesome</span>
    </button>

    <button
      type="button"
      on:click={openAuth}
      class="bg-white border-[2.5px] border-black px-2.5 py-1 font-mono-label text-[11px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      title="Autenticación Firebase y Ajustes de API Key"
    >
      <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
      <span class="hidden sm:inline font-bold">Perfil</span>
      <span class="sm:hidden">Perfil</span>
    </button>

    <button 
      type="button"
      on:click={openLevelInfo}
      class="bg-white border-[2.5px] border-black px-2.5 py-1 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      title="{$user.currentXp} XP y {$user.inkDrops ?? 0} Gotas de Tinta"
    >
      <span>XP: {$user.currentXp}</span>
      <span class="border-l border-black pl-1.5 text-black font-extrabold flex items-center gap-0.5" title="Gotas de tinta alquímica acumuladas">
        <span class="material-symbols-outlined text-xs text-black">invert_colors</span>
        {$user.inkDrops ?? 0}
      </span>
    </button>
  </div>
</header>
