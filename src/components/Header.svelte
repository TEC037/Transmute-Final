<script lang="ts">
  import type { UserProfile } from '../types';

  interface Props {
    user: UserProfile;
    isOnline?: boolean;
    onOpenLevelInfo: () => void;
    onOpenAuthModal: () => void;
    onOpenAssistant: () => void;
    onOpenHelp?: () => void;
    onToggleNoirDarkMode?: () => void;
  }

  let { user, isOnline = true, onOpenLevelInfo, onOpenAuthModal, onOpenAssistant, onOpenHelp, onToggleNoirDarkMode }: Props = $props();

  const xpPercent = $derived(
    Math.min(100, Math.round(((user.currentXp || 0) / Math.max(1, user.maxXp || 100)) * 100))
  );
</script>

<header class="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 py-3 bg-white border-b-[3px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
  <div class="flex items-center gap-3">
    <button 
      type="button"
      onclick={onOpenLevelInfo}
      class="w-11 h-11 bg-white border-[3px] border-black overflow-hidden shadow-[2px_2px_0_0_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform p-0"
      title="Ver nivel del Alquimista"
    >
      <img 
        src={user.avatarUrl} 
        alt={user.name} 
        class="w-full h-full object-cover grayscale"
      />
    </button>

    <div>
      <div class="flex items-center gap-2">
        <h1 class="font-headline text-2xl md:text-3xl text-black font-extrabold tracking-tight leading-none">
          Transmute
        </h1>
      </div>
      <div class="flex items-center gap-2 mt-0.5">
        <span class="font-mono-label text-[10px] bg-black text-white px-1 py-0.2 uppercase font-bold tracking-wider">
          Lvl {user.level}
        </span>
        <button 
          type="button"
          class="w-24 md:w-32 h-2.5 border-[2px] border-black bg-white relative overflow-hidden cursor-pointer p-0"
          onclick={onOpenLevelInfo}
          title="{user.currentXp} / {user.maxXp} XP"
        >
          <div 
            class="absolute inset-y-0 left-0 bg-black transition-all duration-500"
            style="width: {xpPercent}%;"
          ></div>
        </button>
        <span class="font-mono-label text-[10px] font-bold text-neutral-600">
          {user.currentXp}/{user.maxXp}
        </span>
      </div>
    </div>
  </div>

  <div class="flex items-center gap-2">
    <!-- Network Status Indicator -->
    <div
      class="w-2.5 h-2.5 rounded-full border border-black {isOnline ? 'bg-green-500' : 'bg-red-500 animate-pulse'}"
      title={isOnline ? 'En línea' : 'Sin conexión'}
    ></div>

    <button
      type="button"
      onclick={() => onToggleNoirDarkMode?.()}
      class="border-[2px] border-black p-1.5 font-mono-label text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-black text-white"
      title="Toggle Noir"
    >
      <span class="material-symbols-outlined text-lg">dark_mode</span>
    </button>

    <button
      type="button"
      onclick={onOpenAssistant}
      class="bg-amber-300 border-[2px] border-black p-1.5 font-mono-label text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      title="Asistente de Flujos Alquímico AI"
    >
      <span class="material-symbols-outlined text-lg">auto_awesome</span>
    </button>

    <button
      type="button"
      onclick={onOpenHelp}
      class="bg-white border-[2px] border-black p-1.5 font-mono-label text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      title="Centro de Ayuda"
    >
      <span class="material-symbols-outlined text-lg">help</span>
    </button>

    <button
      type="button"
      onclick={onOpenAuthModal}
      class="bg-white border-[2px] border-black px-2.5 py-1 font-mono-label text-[11px] font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      title="Autenticación Firebase y Ajustes"
    >
      <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
      <span class="hidden sm:inline font-bold">Perfil</span>
      <span class="sm:hidden">Perfil</span>
    </button>
  </div>
</header>
