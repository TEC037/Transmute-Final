<script lang="ts">
  interface Props {
    icon?: string;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    tone?: 'default' | 'red' | 'green';
    compact?: boolean;
  }

  let {
    icon = 'self_improvement',
    title,
    description = '',
    actionLabel = '',
    onAction,
    tone = 'default',
    compact = false,
  }: Props = $props();

  const tones = {
    default: {
      accent: 'border-black text-black',
      halo: 'border-black text-black',
      chip: 'bg-black',
      chipIcon: 'text-amber-300',
      dot: 'rgba(23, 23, 23, 0.10)',
      iconFill: '',
    },
    red: {
      accent: 'border-red-700 text-red-700',
      halo: 'border-red-700 text-red-700',
      chip: 'bg-red-700',
      chipIcon: 'text-white',
      dot: 'rgba(185, 28, 28, 0.12)',
      iconFill: 'fill-1',
    },
    green: {
      accent: 'border-green-700 text-green-700',
      halo: 'border-green-700 text-green-700',
      chip: 'bg-green-700',
      chipIcon: 'text-white',
      dot: 'rgba(21, 128, 61, 0.12)',
      iconFill: 'fill-1',
    },
  } as const;

  const t = $derived(tones[tone]);
</script>

<div class="relative flex flex-col items-center text-center {compact ? 'gap-2 py-2' : 'gap-3 py-4'}">
  <!-- Medallion: the resting alchemist -->
  <div class="relative {compact ? 'w-16 h-16' : 'w-24 h-24'} es-medallion">
    <!-- rotating dashed halo -->
    <div class="absolute inset-0 rounded-full border-[2.5px] border-dashed {t.halo} opacity-60 es-halo"></div>
    <!-- alchemist disc -->
    <div class="absolute inset-1.5 rounded-full bg-white border-[3px] {t.accent} shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center">
      <span class="material-symbols-outlined {t.accent} {t.iconFill} {compact ? 'text-2xl' : 'text-4xl'}">{icon}</span>
    </div>
    <!-- sparkles -->
    <span class="material-symbols-outlined absolute -top-2 -left-2 {t.accent} {compact ? 'text-xs' : 'text-base'} es-twinkle">auto_awesome</span>
    <span class="material-symbols-outlined absolute -bottom-1 -right-2 {t.accent} {compact ? 'text-[10px]' : 'text-sm'} es-twinkle-delay">auto_awesome</span>
  </div>

  <!-- Halftone parchment -->
  <div
    class="es-halftone rounded-sm w-full max-w-[240px] flex flex-col items-center justify-center gap-1.5 px-3 py-3 min-h-[72px]"
    style="background-image: radial-gradient({t.dot} 1.5px, transparent 1.5px); background-size: 12px 12px;"
  >
    <h4 class="font-headline {compact ? 'text-xs' : 'text-sm'} font-extrabold text-black uppercase tracking-wide">
      {title}
    </h4>
    {#if description}
      <p class="font-mono-label text-[11px] font-bold text-neutral-500 leading-relaxed">
        {description}
      </p>
    {/if}
  </div>

  {#if actionLabel && onAction}
    <button
      type="button"
      onclick={onAction}
      class="px-3.5 py-2 {t.chip} text-white border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
    >
      <span class="material-symbols-outlined text-base {t.chipIcon}">add_circle</span>
      {actionLabel}
    </button>
  {/if}
</div>

<style>
  .es-halo {
    animation: es-spin 16s linear infinite;
  }
  @keyframes es-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .es-medallion {
    animation: es-float 4.5s ease-in-out infinite;
  }
  @keyframes es-float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .es-twinkle {
    animation: es-twinkle 2.6s ease-in-out infinite;
  }
  .es-twinkle-delay {
    animation: es-twinkle 2.6s ease-in-out 1.3s infinite;
  }
  @keyframes es-twinkle {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.15) rotate(20deg);
    }
  }
</style>
