<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    message: string;
    type?: 'error' | 'success' | 'warning' | 'info' | 'undo';
    duration?: number;
    onUndo?: () => void;
    onClose: () => void;
  }

  let { message, type = 'info', duration = 4000, onUndo, onClose }: Props = $props();

  let visible = $state(false);

  onMount(() => {
    visible = true;
    if (duration > 0) {
      const timer = setTimeout(() => {
        visible = false;
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  });

  const typeStyles: Record<string, string> = {
    error: 'bg-red-700 text-white border-red-900',
    success: 'bg-green-700 text-white border-green-900',
    warning: 'bg-amber-300 text-black border-amber-500',
    info: 'bg-black text-white border-black',
    undo: 'bg-black text-white border-black',
  };

  const icons: Record<string, string> = {
    error: 'error',
    success: 'check_circle',
    warning: 'warning',
    info: 'info',
    undo: 'undo',
  };
</script>

<div
  class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}"
  role="alert"
  aria-live="polite"
>
  <div class="flex items-center gap-2 border-[2px] px-4 py-2.5 shadow-[3px_3px_0_0_rgba(0,0,0,1)] font-mono-label text-xs font-bold {typeStyles[type]}">
    <span class="material-symbols-outlined text-sm">{icons[type]}</span>
    <span>{message}</span>
    {#if onUndo && type === 'undo'}
      <button
        type="button"
        onclick={() => { onUndo(); visible = false; setTimeout(onClose, 300); }}
        class="ml-1 px-2 py-0.5 bg-white text-black border border-current hover:bg-neutral-200 transition-colors cursor-pointer underline font-extrabold"
      >
        DESHACER
      </button>
    {/if}
    <button
      type="button"
      onclick={() => { visible = false; setTimeout(onClose, 300); }}
      class="ml-1 opacity-70 hover:opacity-100 cursor-pointer"
      aria-label="Cerrar notificación"
    >
      <span class="material-symbols-outlined text-sm">close</span>
    </button>
  </div>
</div>
