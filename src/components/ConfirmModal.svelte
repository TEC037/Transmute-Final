<script lang="ts">
  interface Props {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    tone?: 'danger' | 'default';
    onConfirm: () => void;
    onCancel: () => void;
  }

  let {
    isOpen,
    title,
    message,
    confirmLabel = 'CONFIRMAR',
    cancelLabel = 'CANCELAR',
    tone = 'default',
    onConfirm,
    onCancel,
  }: Props = $props();

  const confirmColor = $derived(
    tone === 'danger'
      ? 'bg-red-700 text-white border-red-800 hover:bg-red-800'
      : 'bg-black text-white hover:bg-neutral-800'
  );
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    <div
      class="bg-white border-[4px] border-black p-6 w-full max-w-sm wobbly-border shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150"
    >
      <div class="w-14 h-14 border-[3px] border-black flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)] {tone === 'danger' ? 'bg-white text-red-700' : 'bg-black text-white'}">
        <span class="material-symbols-outlined text-3xl">
          {tone === 'danger' ? 'warning' : 'help'}
        </span>
      </div>

      <h3 class="font-headline text-2xl font-extrabold text-black text-center leading-tight">
        {title}
      </h3>

      <p class="font-headline text-sm font-bold text-neutral-700 mt-3 text-center leading-relaxed break-words">
        {message}
      </p>

      <div class="flex gap-2 mt-6">
        <button
          type="button"
          onclick={onCancel}
          class="flex-1 py-2.5 bg-white border-[2px] border-black font-headline text-xs font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onclick={onConfirm}
          class="flex-1 py-2.5 border-[2px] border-black font-headline text-xs font-extrabold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-colors cursor-pointer {confirmColor}"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}
