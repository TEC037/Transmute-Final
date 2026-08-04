<script lang="ts">
  import { untrack } from 'svelte';
  import type { HabitCard } from '../types';

  interface Props {
    isOpen: boolean;
    habitToEdit?: HabitCard | null;
    onClose: () => void;
    onSaveHabit: (habitData: Partial<HabitCard>, id?: string) => void;
    onDeleteHabit?: (id: string) => void;
  }

  let { isOpen, habitToEdit = null, onClose, onSaveHabit, onDeleteHabit }: Props = $props();

  let title = $state('');
  $effect(() => {
    if (isOpen) {
      untrack(() => {
        title = habitToEdit ? habitToEdit.title : '';
      });
    }
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 2) return;
    if (title.trim().length > 60) return;

    const habitData: Partial<HabitCard> = {
      title: title.trim(),
      targetType: 'checkbox',
      targetCount: 1,
      unit: 'sesión',
      xpReward: 20,
      minLevel: 1,
    };

    onSaveHabit(habitData, habitToEdit?.id);
    onClose();
  };

  const handleDelete = () => {
    if (habitToEdit?.id) {
      if (confirm(`¿Estás seguro de eliminar el hábito "${habitToEdit.title}"?`)) {
        onDeleteHabit?.(habitToEdit.id);
        onClose();
      }
    }
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div
      class="bg-white border-[3px] border-black p-6 w-full max-w-lg wobbly-border shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200"
    >
      <!-- Close button -->
      <button
        type="button"
        onclick={onClose}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      >
        ✕
      </button>

      <div class="flex items-center gap-3 mb-4 pr-8">
        <div class="w-10 h-10 border-[2px] border-black bg-black text-white flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl">
            {habitToEdit ? 'edit' : 'add'}
          </span>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
            {habitToEdit ? 'Editar Hábito' : 'Crear Nuevo Hábito'}
          </h3>
          <p class="font-mono-label text-xs font-bold text-neutral-600">
            {habitToEdit ? 'GESTIÓN Y MODIFICACIÓN DE HÁBITO' : 'PERSONALIZA TU DESAFÍO DIARIO'}
          </p>
        </div>
      </div>

      <form onsubmit={handleSubmit} class="flex flex-col gap-5 mt-3">
        <!-- Title -->
        <div class="flex flex-col gap-1.5">
          <label class="font-mono-label text-xs font-bold uppercase text-black" for="habit-title">
            Título del Hábito *
          </label>
          <input
            id="habit-title"
            type="text"
            bind:value={title}
            placeholder="Ej: Meditar 10 minutos"
            required
            maxlength={60}
            class="w-full border-[2px] border-black p-3 font-headline font-bold text-sm bg-neutral-50 shadow-[2px_2px_0_0_rgba(0,0,0,1)] outline-none focus:bg-white"
          />
          <span class="font-mono-label text-[10px] font-bold text-neutral-500 text-right">
            {title.length}/60
          </span>
        </div>

        <!-- Submit & Delete Action Buttons -->
        <div class="flex flex-col gap-2">
          <button
            type="submit"
            class="w-full py-3 bg-black text-white border-[2px] border-black font-headline text-lg font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <span class="material-symbols-outlined text-xl">
              {habitToEdit ? 'save' : 'add_circle'}
            </span>
            {habitToEdit ? 'GUARDAR CAMBIOS EN HÁBITO' : 'CREAR HÁBITO'}
          </button>

          {#if habitToEdit}
            <button
              type="button"
              onclick={handleDelete}
              class="w-full py-2 bg-red-600 text-white border-[2px] border-black font-headline text-sm font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <span class="material-symbols-outlined text-base">delete</span>
              ELIMINAR HÁBITO
            </button>
          {/if}
        </div>
      </form>
    </div>
  </div>
{/if}


