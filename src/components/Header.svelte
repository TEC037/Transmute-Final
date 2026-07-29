<script lang="ts">
  import type { UserProfile } from '../types';
  import type { User } from 'firebase/auth';

  interface Props {
    user: UserProfile;
    currentUser?: User | null;
    isOnline?: boolean;
    isNoirDarkMode?: boolean;
    onOpenLevelInfo?: () => void;
    onOpenAuthModal?: () => void;
    onOpenAssistant?: () => void;
    onToggleNoirDarkMode?: () => void;
  }

  let {
    user,
    currentUser,
    isOnline = true,
    isNoirDarkMode = false,
    onOpenLevelInfo,
    onOpenAuthModal,
    onOpenAssistant,
    onToggleNoirDarkMode,
  }: Props = $props();

  let xpPercent = $derived(
    Math.min(100, Math.round((user.currentXp / user.maxXp) * 100))
  );
</script>

<header class="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 py-3 bg-[#f9f9f9] border-b-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  <div class="flex items-center gap-3">
    <!-- Avatar -->
    <button 
      type="button"
      onclick={() => onOpenLevelInfo?.()}
      class="w-11 h-11 bg-white border-[3px] border-black wobbly-border overflow-hidden rotate-[-2deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform p-0 text-left"
      title="Ver nivel del Alquimista"
    >
      <img 
        src={user.avatarUrl} 
        alt={user.name} 
        class="w-full h-full object-cover grayscale"
      />
    </button>

    <!-- Title & Level Bar -->
    <div>
      <div class="flex items-center gap-2">
        <h1 class="font-headline text-2xl md:text-3xl text-black font-extrabold tracking-tight leading-none">
          Transmute
        </h1>
        {#if !isOnline}
          <span 
            class="bg-neutral-800 text-white font-mono-label text-[9px] px-1.5 py-0.5 font-bold uppercase border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            title="Modo offline activo: los datos se guardan en IndexedDB / LocalStorage"
          >
            Offline DB
          </span>
        {/if}
      </div>
      <div class="flex items-center gap-2 mt-0.5">
        <span class="font-mono-label text-[10px] bg-black text-white px-1 py-0.2 uppercase font-bold tracking-wider">
          Lvl {user.level}
        </span>
        <button 
          type="button"
          class="w-20 md:w-28 h-2.5 border-[2px] border-black bg-white relative overflow-hidden cursor-pointer p-0"
          onclick={() => onOpenLevelInfo?.()}
          title="{user.currentXp} / {user.maxXp} XP"
        >
          <div 
            class="absolute inset-y-0 left-0 bg-black ink-fill transition-all duration-500"
            style="width: {xpPercent}%;"
          ></div>
        </button>
      </div>
    </div>
  </div>

  <!-- Right Actions: Firebase Auth, Dark Mode, XP Badge & AI Assistant -->
  <div class="flex items-center gap-2">
    {#if onToggleNoirDarkMode}
      <button
        type="button"
        onclick={() => onToggleNoirDarkMode?.()}
        class="border-[2.5px] border-black p-1.5 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center {isNoirDarkMode
          ? 'bg-amber-400 text-black hover:bg-amber-300'
          : 'bg-black text-white hover:bg-neutral-800'}"
        title={isNoirDarkMode ? 'Desactivar Modo Noir (Modo Claro Vintage)' : 'Activar Modo Noir 1930 (Cine Mudo & Sepia)'}
      >
        <span class="material-symbols-outlined text-lg">{isNoirDarkMode ? 'movie_filter' : 'dark_mode'}</span>
      </button>
    {/if}

    {#if onOpenAssistant}
      <button
        type="button"
        onclick={() => onOpenAssistant?.()}
        class="bg-amber-300 border-[2.5px] border-black p-1.5 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-amber-400 flex items-center justify-center text-black"
        title="Asistente de Flujos Alquímico AI"
      >
        <span class="material-symbols-outlined text-lg">auto_awesome</span>
      </button>
    {/if}

    <button
      type="button"
      onclick={() => onOpenAuthModal?.()}
      class="bg-white border-[2.5px] border-black px-2.5 py-1 font-mono-label text-[11px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-neutral-100 flex items-center gap-1.5"
      title="Autenticación Firebase y Ajustes de API Key"
    >
      <span class="w-2.5 h-2.5 rounded-full {!isOnline ? 'bg-neutral-400' : currentUser ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}"></span>
      <span class="hidden sm:inline font-bold">
        {!isOnline ? 'Modo Offline' : currentUser ? (currentUser.displayName || 'Conectado') : 'Login Firebase'}
      </span>
      <span class="sm:hidden">{!isOnline ? 'Offline' : currentUser ? 'Perfil' : 'Login'}</span>
    </button>

    <button 
      type="button"
      onclick={() => onOpenLevelInfo?.()}
      class="bg-white border-[2.5px] border-black px-2.5 py-1 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-neutral-100 flex items-center gap-1.5"
      title="{user.currentXp} XP y {user.inkDrops ?? 0} Gotas de Tinta"
    >
      <span>XP: {user.currentXp}</span>
      <span class="border-l border-black pl-1.5 text-black font-extrabold flex items-center gap-0.5" title="Gotas de tinta alquímica acumuladas">
        <span class="material-symbols-outlined text-xs text-black">invert_colors</span>
        {user.inkDrops ?? 0}
      </span>
    </button>
  </div>
</header>

