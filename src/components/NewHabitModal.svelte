<script lang="ts">
  import { untrack } from 'svelte';
  import type { HabitCard } from '../types';
  import { saveHabit, deleteHabit as actionsDeleteHabit } from '../lib/actions';

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

  // Noir Detective Voice Dictation & Typewriter Effect State
  let isListening = $state(false);
  let rawTranscript = $state('');
  let typewriterText = $state('');
  let speechError = $state<string | null>(null);
  let typewriterInterval: any = null;

  function playTypewriterClickSound() {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350 + Math.random() * 250, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.035);
    } catch {
      // Audio context ignored if blocked
    }
  }

  const updateTypewriterText = (targetText: string) => {
    if (typewriterInterval) clearInterval(typewriterInterval);
    let index = typewriterText.length;
    typewriterInterval = setInterval(() => {
      if (index < targetText.length) {
        typewriterText = targetText.slice(0, index + 1);
        playTypewriterClickSound();
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 25);
  };

  const startSpeechRecognition = () => {
    speechError = null;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speechError = 'El navegador actual no soporta la Web Speech API. Por favor, usa Chrome, Edge o Safari.';
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        isListening = true;
        rawTranscript = '';
        typewriterText = '';
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        rawTranscript = currentText;
        updateTypewriterText(currentText);
      };

      recognition.onerror = (event: any) => {
        isListening = false;
        speechError = `Error al escuchar: ${event.error}`;
      };

      recognition.onend = () => {
        isListening = false;
        if (rawTranscript.trim()) {
          applyTranscriptToForm(rawTranscript);
        }
      };

      recognition.start();
    } catch (err: any) {
      isListening = false;
      speechError = err.message || 'Error al iniciar reconocimiento de voz.';
    }
  };

  const applyTranscriptToForm = (text: string) => {
    if (!text.trim()) return;
    const formatted = text.trim().charAt(0).toUpperCase() + text.trim().slice(1);
    if (!title.trim()) {
      title = formatted;
    } else {
      description = description.trim() ? `${description} (${formatted})` : formatted;
    }
  };

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

    // Prefer central action, fall back to provided prop
    saveHabit(habitData, habitToEdit?.id);
    if (onSaveHabit) onSaveHabit(habitData, habitToEdit?.id);
    onClose();
  };

  const handleDelete = () => {
    if (habitToEdit?.id) {
      if (confirm(`¿Estás seguro de eliminar el hábito "${habitToEdit.title}"?`)) {
        // central action + optional callback
        actionsDeleteHabit(habitToEdit.id);
        if (onDeleteHabit) onDeleteHabit(habitToEdit.id);
        onClose();
      }
    }
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div
      class="bg-white border-[4px] border-black p-6 w-full max-w-lg wobbly-border shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200"
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

      <!-- Noir Detective Web Speech Typewriter Widget -->
      <div class="mb-4 bg-[#faf6ee] border-[2.5px] border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-black">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-lg text-black font-bold">mic</span>
            <span class="font-mono text-xs font-black uppercase tracking-wider text-black">
              Telégrafo Noir (Web Speech API)
            </span>
          </div>

          <button
            type="button"
            on:click={startSpeechRecognition}
            disabled={isListening}
            class="px-2.5 py-1 text-white border border-black font-mono-label text-xs font-extrabold shadow-[2px_2px_0px_0px_rgba(100,100,100,1)] active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span class="material-symbols-outlined text-sm">
              {isListening ? 'graphic_eq' : 'mic_none'}
            </span>
            <span>{isListening ? 'ESCUCHANDO...' : 'DICTAR POR VOZ'}</span>
          </button>
        </div>

        <!-- Typewriter Paper Terminal Display -->
        <div class="bg-amber-50 border border-black p-2.5 min-h-[50px] font-mono text-xs text-black leading-relaxed relative flex items-center">
          {#if typewriterText || isListening}
            <div class="w-full">
              <span class="font-bold text-black font-serif italic">{typewriterText}</span>
              <span class="inline-block w-2 h-4 bg-black ml-0.5 animate-ping align-middle"></span>
            </div>
          {:else}
            <span class="text-neutral-500 italic font-mono text-[11px]">
              Presiona "DICTAR POR VOZ" para redactar tu hábito con el efecto de máquina de escribir 1930...
            </span>
          {/if}
        </div>

        {#if speechError}
          <div class="mt-2 p-1.5 bg-red-100 border border-black text-red-700 font-mono text-[10px] font-bold">
            ⚠️ {speechError}
          </div>
        {/if}
      </div>

      <form on:submit={handleSubmit} class="flex flex-col gap-4 my-2">
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
                on:click={() => (icon = ic)}
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
            class="w-full py-3 bg-black text-white border-[3px] border-black font-headline text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <span class="material-symbols-outlined text-xl">
              {habitToEdit ? 'save' : 'add_circle'}
            </span>
            {habitToEdit ? 'GUARDAR CAMBIOS EN HÁBITO' : 'CREAR HÁBITO'}
          </button>

          {#if habitToEdit}
            <button
              type="button"
              on:click={handleDelete}
              class="w-full py-2 bg-red-600 text-white border-[2px] border-black font-headline text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
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
