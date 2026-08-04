<script lang="ts">
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  const faqs = [
    {
      q: '¿Qué son los Puntos de Atributo?',
      a: 'Ganas 2 puntos cada vez que subes de nivel. Distribúyelos entre Fuerza, Enfoque y Vitalidad para personalizar tu personaje alquímico.',
      icon: 'tune',
    },
    {
      q: '¿Cómo funciona el sistema de niveles?',
      a: 'Completar hábitos te da XP. Al llenar la barra de XP, subes de nivel y ganas 2 puntos de atributo. Cada nivel requiere más XP que el anterior (×1.25).',
      icon: 'workspace_premium',
    },
    {
      q: '¿Qué es "Modo Noir"?',
      a: 'Un tema visual inspirado en el cine de los años 1930 con alto contraste sepia y negro profundo. Actívalo desde el botón de la barra superior.',
      icon: 'dark_mode',
    },
    {
      q: '¿Puedo editar o eliminar hábitos?',
      a: 'Sí. En la vista del mazo, usa los botones de editar o eliminar en la tarjeta superior del mazo. También puedes deslizar a la izquierda para marcar un fallo.',
      icon: 'edit',
    },
    {
      q: '¿Cómo se restaura un hábito?',
      a: 'Si completaste o fallaste un hábito por error, busca el botón de deshacer (↩) junto al hábito en las listas de "Realizados" o "No Realizados".',
      icon: 'undo',
    },
    {
      q: '¿Qué es el "Asistente AI"?',
      a: 'Un chatbot que usa IA para ayudarte a crear hábitos personalizados, darte consejos de productividad y responder preguntas sobre la app.',
      icon: 'auto_awesome',
    },
  ];
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div
      class="bg-white border-[3px] border-black p-6 w-full max-w-lg wobbly-border shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in duration-200"
    >
      <button
        type="button"
        onclick={onClose}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      >
        ✕
      </button>

      <div class="flex items-center gap-3 mb-5 pr-8">
        <div class="w-10 h-10 border-[2px] border-black bg-black text-white flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl">help</span>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
            Centro de Ayuda
          </h3>
          <p class="font-mono-label text-xs font-bold text-neutral-600">
            PREGUNTAS FRECUENTES
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        {#each faqs as faq}
          <div class="border-[2px] border-black bg-neutral-50 shadow-[2px_2px_0_0_rgba(0,0,0,1)] p-3">
            <div class="flex items-start gap-2.5">
              <div class="w-7 h-7 border-[2px] border-black bg-black text-white flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-sm">{faq.icon}</span>
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-headline text-sm font-extrabold text-black leading-snug">
                  {faq.q}
                </h4>
                <p class="font-mono-label text-[11px] text-neutral-700 font-medium mt-1 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <button
        type="button"
        onclick={onClose}
        class="w-full mt-5 py-3 bg-black text-white border-[2px] border-black font-headline text-sm font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-neutral-800 transition-all cursor-pointer"
      >
        ENTENDIDO
      </button>
    </div>
  </div>
{/if}
