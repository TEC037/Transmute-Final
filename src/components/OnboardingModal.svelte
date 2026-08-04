<script lang="ts">
  import type { TabType } from './BottomNav.svelte';
  import { popIn, popOut, overlayFade } from '../lib/modalTransitions';

  interface Props {
    isOpen: boolean;
    userName: string;
    onClose: () => void;
    onChangeTab?: (tab: TabType) => void;
    onResetToZero?: () => void;
  }

  let { isOpen, userName, onClose, onChangeTab, onResetToZero }: Props = $props();

  let step = $state(1);
  let totalSteps = 3;

  $effect(() => {
    if (isOpen) {
      step = 1;
    }
  });

  const nextStep = () => {
    if (step < totalSteps) {
      step += 1;
      updateActiveTabForStep(step);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      step -= 1;
      updateActiveTabForStep(step);
    }
  };

  const updateActiveTabForStep = (currentStep: number) => {
    if (!onChangeTab) return;
    switch (currentStep) {
      case 2:
        onChangeTab('deck');
        break;
      case 3:
        onChangeTab('me');
        break;
      default:
        onChangeTab('deck');
        break;
    }
  };

  const handleStartFromZero = () => {
    onResetToZero?.();
    nextStep();
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs" in:overlayFade out:overlayFade>
    <div
      in:popIn
      out:popOut
      class="bg-white border-[3px] border-black p-6 w-full max-w-lg wobbly-border shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
    >
      <!-- Step Indicator Header -->
      <div class="flex justify-between items-center border-b-2 border-black pb-3">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-amber-400 border border-black rounded-full"></span>
          <span class="font-mono-label text-xs font-bold uppercase tracking-wider text-black">
            Guía de Inicio Alquímico ({step}/{totalSteps})
          </span>
        </div>
        <button
          type="button"
          onclick={onClose}
          class="font-mono-label text-xs font-bold text-neutral-500 hover:text-black cursor-pointer underline"
        >
          Saltar Guía ✕
        </button>
      </div>

      <!-- Step Content Switcher -->
      {#if step === 1}
        <!-- Step 1: Welcome & Reset Option -->
        <div class="flex flex-col gap-4" in:overlayFade out:overlayFade>
          <div class="w-14 h-14 border-[3px] border-black bg-amber-300 flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <span class="material-symbols-outlined text-3xl font-bold">auto_awesome</span>
          </div>

          <div>
            <h3 class="font-headline text-2xl md:text-3xl font-extrabold text-black leading-tight">
              ¡Bienvenido, Alquimista {userName}!
            </h3>
            <p class="font-headline text-sm text-neutral-700 mt-2 leading-relaxed font-bold">
              Has iniciado sesión exitosamente. En este laboratorio transmutarás tus hábitos diarios en poder alquímico con la ayuda del Asistente IA.
            </p>
          </div>

          <div class="p-4 border-[3px] border-black bg-neutral-50 shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex flex-col gap-2">
            <span class="font-mono-label text-xs font-bold uppercase text-black flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">restart_alt</span>
              ¿Comenzar tu progreso desde cero?
            </span>
            <p class="text-xs text-neutral-600 font-medium">
              Inicia desde el <strong>Nivel 1 (0 XP)</strong> para vivir la experiencia de progresión desde el primer hábito.
            </p>

            <button
              type="button"
              onclick={handleStartFromZero}
              class="mt-1 w-full py-2.5 bg-black text-white border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span class="material-symbols-outlined text-base">refresh</span>
              REINICIAR DESDE NIVEL 1 (DESDE 0)
            </button>
          </div>
        </div>

      {:else if step === 2}
        <!-- Step 2: Habits Deck -->
        <div class="flex flex-col gap-4" in:overlayFade out:overlayFade>
          <div class="w-14 h-14 border-[3px] border-black bg-black text-white flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <span class="material-symbols-outlined text-3xl font-bold">style</span>
          </div>

          <div>
            <h3 class="font-headline text-2xl md:text-3xl font-extrabold text-black leading-tight">
              El Mazo de Hábitos (Deck)
            </h3>
            <p class="font-headline text-sm text-neutral-700 mt-2 leading-relaxed font-bold">
              Tu mazo contiene tus metas diarias (Meditación, Ejercicio, Lectura...). Marca como completados tus hábitos o incrementa los contadores para ganar experiencia (XP) e incrementar tus rachas.
            </p>
          </div>

          <div class="p-3 border-[2px] border-black bg-black text-white text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-start gap-2">
            <span class="material-symbols-outlined text-sm">lightbulb</span>
            <span>Consejo: También puedes añadir nuevos hábitos personalizados con la recompensa de XP que elijas.</span>
          </div>
        </div>

      {:else if step === 3}
        <!-- Step 3: Profile & Custom Keys -->
        <div class="flex flex-col gap-4" in:overlayFade out:overlayFade>
          <div class="w-14 h-14 border-[3px] border-black bg-[#f3f3f4] flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <span class="material-symbols-outlined text-3xl font-bold">tune</span>
          </div>

          <div>
            <h3 class="font-headline text-2xl md:text-3xl font-extrabold text-black leading-tight">
              Perfil y Atributos
            </h3>
            <p class="font-headline text-sm text-neutral-700 mt-2 leading-relaxed font-bold">
              Distribuye los puntos ganados entre Fuerza, Enfoque y Vitalidad. El Asistente Alquímico funciona automáticamente con la clave del servidor.
            </p>
          </div>

          <div class="p-3 border-[2px] border-black bg-amber-300 text-black text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-start gap-2">
            <span class="material-symbols-outlined text-sm">rocket_launch</span>
            <span>¡Estás listo para comenzar tu camino alquímico!</span>
          </div>
        </div>
      {/if}

      <!-- Footer Buttons -->
      <div class="flex justify-between items-center border-t-2 border-black pt-4 mt-2">
        <button
          type="button"
          onclick={prevStep}
          disabled={step === 1}
          class="px-4 py-2 bg-white text-black border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          ← ANTERIOR
        </button>

        <div class="flex gap-1">
          {#each Array(totalSteps) as _, i}
            <span class="w-2.5 h-2.5 rounded-full border border-black {step === i + 1 ? 'bg-black' : 'bg-neutral-200'}"></span>
          {/each}
        </div>

        <button
          type="button"
          onclick={nextStep}
          class="px-5 py-2 bg-black text-white border-[2px] border-black font-headline text-xs font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-800 cursor-pointer flex items-center gap-1"
        >
          {step === totalSteps ? '¡EMPEZAR TRANSMUTACIÓN!' : 'SIGUIENTE →'}
        </button>
      </div>
    </div>
  </div>
{/if}
