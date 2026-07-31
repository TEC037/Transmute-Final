<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let open = false;
  export let title = 'Introduce tu passphrase';
  export let placeholder = 'Passphrase';
  export let maxAttempts = 3;

  const dispatch = createEventDispatcher();

  let passphrase = '';
  let attempts = 0;
  let error = '';

  function onConfirm() {
    if (!passphrase || passphrase.trim().length === 0) {
      error = 'Introduce una passphrase válida';
      return;
    }
    attempts += 1;
    dispatch('confirm', { passphrase, attempts });
    passphrase = '';
    error = '';
  }

  function onCancel() {
    passphrase = '';
    error = '';
    dispatch('cancel');
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-[min(480px,95%)] bg-white p-6 rounded shadow-lg border-[3px] border-black">
      <h3 class="font-headline text-xl font-extrabold mb-2">{title}</h3>
      {#if error}
        <div class="mb-2 text-sm text-red-700 font-bold bg-red-100 p-2 border-[2px] border-black">
          {error}
        </div>
      {/if}
      <input
        type="password"
        bind:value={passphrase}
        placeholder={placeholder}
        class="w-full border-[2px] border-black p-2 mb-4"
        on:keydown={(e) => e.key === 'Enter' && onConfirm()}
      />
      <div class="flex justify-end gap-2">
        <button class="px-3 py-1 border-[2px] border-black" on:click={onCancel}>Cancelar</button>
        <button class="px-3 py-1 border-[2px] border-black bg-black text-white" on:click={onConfirm}>Confirmar</button>
      </div>
    </div>
  </div>
{/if}
