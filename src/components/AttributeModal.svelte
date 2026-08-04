<script lang="ts">
  import type { UserProfile } from '../types';
  import { popIn, popOut, overlayFade } from '../lib/modalTransitions';

  interface Props {
    user: UserProfile;
    isOpen: boolean;
    onClose: () => void;
    onAllocatePoint: (attr: 'strength' | 'focus' | 'vitality') => void;
  }

  let { user, isOpen, onClose, onAllocatePoint }: Props = $props();
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs" in:overlayFade out:overlayFade>
    <div
      in:popIn
      out:popOut
      class="bg-white border-[3px] border-black p-6 w-full max-w-md wobbly-border shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto"
    >
      <!-- Close button -->
      <button
        type="button"
        onclick={onClose}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      >
        ✕
      </button>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 border-[2px] border-black bg-black text-white flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl">tune</span>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
            Asignar Puntos de Atributo
          </h3>
          <p class="font-mono-label text-xs font-bold text-neutral-600">
            PUNTOS DISPONIBLES: <span class="bg-black text-white px-1.5 py-0.2">{user.availablePoints}</span>
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-4 my-4">
        <!-- Strength -->
        <div class="flex items-center justify-between p-3 border-[3px] border-black bg-neutral-50 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-2xl text-black">fitness_center</span>
            <div>
              <div class="font-headline text-base font-extrabold text-black leading-tight">
                Fuerza
              </div>
              <div class="font-mono-label text-[10px] text-neutral-600 font-bold">
                {user.attributes.strength}% Máximo
              </div>
              <div class="font-mono-label text-[9px] text-neutral-500 font-medium mt-0.5">
                Poder de voluntad y disciplina diaria
              </div>
            </div>
          </div>
          <button
            type="button"
            onclick={() => onAllocatePoint('strength')}
            disabled={user.availablePoints <= 0 || user.attributes.strength >= 100}
            class="px-3 py-1.5 bg-black text-white border-[2px] border-black font-mono-label text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            +1 PTS
          </button>
        </div>

        <!-- Focus -->
        <div class="flex items-center justify-between p-3 border-[3px] border-black bg-neutral-50 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-2xl text-black">lightbulb</span>
            <div>
              <div class="font-headline text-base font-extrabold text-black leading-tight">
                Enfoque
              </div>
              <div class="font-mono-label text-[10px] text-neutral-600 font-bold">
                {user.attributes.focus}% Máximo
              </div>
              <div class="font-mono-label text-[9px] text-neutral-500 font-medium mt-0.5">
                Concentración y claridad mental
              </div>
            </div>
          </div>
          <button
            type="button"
            onclick={() => onAllocatePoint('focus')}
            disabled={user.availablePoints <= 0 || user.attributes.focus >= 100}
            class="px-3 py-1.5 bg-black text-white border-[2px] border-black font-mono-label text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            +1 PTS
          </button>
        </div>

        <!-- Vitality -->
        <div class="flex items-center justify-between p-3 border-[3px] border-black bg-neutral-50 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-2xl text-black">favorite</span>
            <div>
              <div class="font-headline text-base font-extrabold text-black leading-tight">
                Vitalidad
              </div>
              <div class="font-mono-label text-[10px] text-neutral-600 font-bold">
                {user.attributes.vitality}% Máximo
              </div>
              <div class="font-mono-label text-[9px] text-neutral-500 font-medium mt-0.5">
                Energía, salud y bienestar general
              </div>
            </div>
          </div>
          <button
            type="button"
            onclick={() => onAllocatePoint('vitality')}
            disabled={user.availablePoints <= 0 || user.attributes.vitality >= 100}
            class="px-3 py-1.5 bg-black text-white border-[2px] border-black font-mono-label text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            +1 PTS
          </button>
        </div>
      </div>

      <button
        type="button"
        onclick={onClose}
        class="w-full mt-2 py-3 bg-white text-black border-[2px] border-black font-headline text-base font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-100 transition-all cursor-pointer"
      >
        GUARDAR Y CERRAR
      </button>
    </div>
  </div>
{/if}
