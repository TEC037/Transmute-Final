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
  let description = $state('');
  let xpReward = $state(20);
  let minLevel = $state(1);
  let icon = $state('fitness_center');
  let tagsInput = $state('Salud, Diario');

  const iconsList = [
    'fitness_center',
    'visibility',
    'water_drop',
    'book',
    'directions_run',
    'bedtime',
    'self_improvement',
    'restaurant',
    'code',
    'palette',
    'auto_awesome',
    'psychology',
    'hiking',
    'local_cafe',
  ];

  $effect(() => {
    if (isOpen) {
      untrack(() => {
        if (habitToEdit) {
          title = habitToEdit.title;
          description = habitToEdit.description || '';
          xpReward = habitToEdit.xpReward || 20;
          minLevel = habitToEdit.minLevel || 1;
          icon = habitToEdit.icon || 'fitness_center';
          tagsInput = habitToEdit.tags ? habitToEdit.tags.join(', ') : 'Salud, Diario';
        } else {
          title = '';
          description = '';
          xpReward = 20;
          minLevel = 1;
          icon = 'fitness_center';
          tagsInput = 'Salud, Diario';
        }
      });
    }
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const habitData: Partial<HabitCard> = {
      title: title.trim(),
      description: description.trim(),
      targetType: 'checkbox',
      targetCount: 1,
      unit: 'sesión',
      xpReward: Number(xpReward),
      minLevel: Number(minLevel),
      icon,
      tags: parsedTags.length > 0 ? parsedTags : ['General'],
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
      class="bg-white border-[4px] border-black p-6 w-full max-w-lg wobbly-border shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150"
    >
      <!-- Close button -->
      <button
        type="button"
        onclick={onClose}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        ✕
      </button>

      <div class="flex items-center gap-3 mb-4 pr-8">
        <div class="w-10 h-10 border-[2.5px] border-black bg-black text-white flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl">
            {habitToEdit ? 'edit' : 'add'}
          </span>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
            {habitToEdit ? 'Editar Cromo de Hábito' : 'Crear Nuevo Cromo de Hábito'}
          </h3>
          <p class="font-mono-label text-xs font-bold text-neutral-600">
            {habitToEdit ? 'GESTIÓN Y MODIFICACIÓN DE HÁBITO' : 'PERSONALIZA TU DESAFÍO DIARIO'}
          </p>
        </div>
      </div>

      <form onsubmit={handleSubmit} class="flex flex-col gap-4 my-2">
        <!-- Title -->
        <div class="flex flex-col gap-1">
          <label class="font-mono-label text-xs font-bold uppercase text-black" for="habit-title">
            Título del Hábito *
          </label>
          <input
            id="habit-title"
            type="text"
            bind:value={title}
            placeholder="Ej: Meditar 10 minutos"
            required
            class="w-full border-[2.5px] border-black p-2.5 font-headline font-bold text-sm bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-white"
          />
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-1">
          <label class="font-mono-label text-xs font-bold uppercase text-black" for="habit-desc">
            Descripción o Nota (Opcional)
          </label>
          <input
            id="habit-desc"
            type="text"
            bind:value={description}
            placeholder="Ej: Usar la app de respiración al despertar"
            class="w-full border-[2.5px] border-black p-2 font-body text-xs bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-white"
          />
        </div>

        <!-- XP & Level -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1">
            <label class="font-mono-label text-xs font-bold uppercase text-black" for="habit-xp">
              Recompensa (XP)
            </label>
            <input
              id="habit-xp"
              type="number"
              bind:value={xpReward}
              min="5"
              max="200"
              class="w-full border-[2.5px] border-black p-2 font-mono-label text-xs font-bold bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-mono-label text-xs font-bold uppercase text-black" for="min-level">
              Nivel Requerido
            </label>
            <input
              id="min-level"
              type="number"
              bind:value={minLevel}
              min="1"
              max="50"
              class="w-full border-[2.5px] border-black p-2 font-mono-label text-xs font-bold bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none"
            />
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-col gap-1">
          <label class="font-mono-label text-xs font-bold uppercase text-black" for="tags-input">
            Etiquetas (separadas por coma)
          </label>
          <input
            id="tags-input"
            type="text"
            bind:value={tagsInput}
            placeholder="Salud, Mente..."
            class="w-full border-[2.5px] border-black p-2 font-mono-label text-xs font-bold bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none"
          />
        </div>

        <!-- Icon selection -->
        <div class="flex flex-col gap-1">
          <label class="font-mono-label text-xs font-bold uppercase text-black" for="icon-picker">
            Icono del Cromo
          </label>
          <div id="icon-picker" class="flex flex-wrap gap-2 pt-1">
            {#each iconsList as ic (ic)}
              <button
                type="button"
                onclick={() => (icon = ic)}
                class="w-10 h-10 border-[2px] border-black flex items-center justify-center cursor-pointer transition-all {icon === ic
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-neutral-100 text-black hover:bg-neutral-200'}"
              >
                <span class="material-symbols-outlined text-xl">{ic}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Submit & Delete Action Buttons -->
        <div class="flex flex-col gap-2 mt-3">
          <button
            type="submit"
            class="w-full py-3 bg-black text-white border-[3px] border-black font-headline text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center gap-2"
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
              class="w-full py-2 bg-red-600 text-white border-[2px] border-black font-headline text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-red-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
