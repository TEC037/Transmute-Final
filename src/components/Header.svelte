<script lang="ts">
  import type { UserProfile } from '../types';
  import type { User } from 'firebase/auth';

  interface Props {
    user: UserProfile;
    currentUser?: User | null;
    onOpenLevelInfo?: () => void;
    onOpenAuthModal?: () => void;
  }

  let { user, currentUser, onOpenLevelInfo, onOpenAuthModal }: Props = $props();

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
      <h1 class="font-headline text-2xl md:text-3xl text-black font-extrabold tracking-tight leading-none">
        Transmute
      </h1>
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

  <!-- Right Actions: Firebase Auth & XP Badge -->
  <div class="flex items-center gap-2">
    <button
      type="button"
      onclick={() => onOpenAuthModal?.()}
      class="bg-white border-[2.5px] border-black px-2.5 py-1 font-mono-label text-[11px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-neutral-100 flex items-center gap-1.5"
      title="Autenticación Firebase y Ajustes de API Key"
    >
      <span class="w-2.5 h-2.5 rounded-full {currentUser ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}"></span>
      <span class="hidden sm:inline">{currentUser ? (currentUser.displayName || 'Conectado') : 'Login Firebase'}</span>
      <span class="sm:hidden">{currentUser ? 'Perfil' : 'Login'}</span>
    </button>

    <button 
      type="button"
      onclick={() => onOpenLevelInfo?.()}
      class="bg-white border-[2.5px] border-black px-2.5 py-1 font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-neutral-100"
    >
      XP: {user.currentXp}
    </button>
  </div>
</header>

