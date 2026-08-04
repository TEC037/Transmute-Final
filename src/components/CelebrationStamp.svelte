<script lang="ts">
  interface Props {
    icon: string;
    title: string;
    subtitle: string;
    tone?: 'amber' | 'black';
  }

  let { icon, title, subtitle, tone = 'amber' }: Props = $props();
</script>

<div class="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center" aria-live="polite">
  <div
    class="celebration-stamp relative wobbly-border border-[4px] border-black px-8 py-5 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-[-4deg] flex flex-col items-center gap-1 text-center {tone === 'amber' ? 'bg-amber-300 text-black' : 'bg-black text-white'}"
  >
    {#if tone === 'amber'}
      <div class="absolute inset-0 halftone opacity-25 pointer-events-none"></div>
    {/if}
    <span class="relative material-symbols-outlined text-5xl font-bold">{icon}</span>
    <span class="relative font-headline text-2xl font-black uppercase tracking-tight">{title}</span>
    <span class="relative font-mono-label text-xs font-bold uppercase tracking-widest opacity-80">{subtitle}</span>
  </div>
</div>

<style>
  .celebration-stamp {
    animation: stamp-pop 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.15) both;
  }
  @keyframes stamp-pop {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(0.6) rotate(-14deg);
    }
    60% {
      opacity: 1;
      transform: translateY(-4px) scale(1.06) rotate(-4deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(-4deg);
    }
  }
</style>
