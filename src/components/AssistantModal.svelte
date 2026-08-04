<script lang="ts">
  import type { HabitCard, UserProfile } from '../types';
  import { getAuthToken } from '../lib/authToken';

  interface SuggestedAction {
    type: 'create_habit' | 'mark_complete' | 'quick_routine';
    label: string;
    payload?: any;
  }

  interface Message {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: Date;
    suggestedActions?: SuggestedAction[];
  }

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
    habits: HabitCard[];
    onAddHabit: (habit: HabitCard) => void;
    onToggleHabit: (id: string) => void;
    onNavigateTab?: (tab: 'deck' | 'calendar') => void;
  }

  let { isOpen, onClose, user, habits, onAddHabit, onToggleHabit, onNavigateTab }: Props = $props();

  let inputMessage = $state('');
  let isLoading = $state(false);
  let errorMsg = $state<string | null>(null);

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderMarkdown(text: string): string {
    const escaped = escapeHtml(text);
    const lines = escaped.split('\n');
    const out: string[] = [];
    let inList = false;
    let inTable = false;
    let tableRows: string[] = [];

    const closeList = () => {
      if (inList) {
        out.push('</ul>');
        inList = false;
      }
    };
    const closeTable = () => {
      if (inTable) {
        const rows = tableRows.map((r) => `<tr>${r}</tr>`).join('');
        out.push(`<table class="w-full border-collapse my-2 font-mono text-[11px]">${rows}</table>`);
        tableRows = [];
        inTable = false;
      }
    };

    for (const line of lines) {
      if (/^##\s/.test(line)) {
        closeList();
        closeTable();
        out.push(`<h4 class="font-headline text-xs font-extrabold uppercase tracking-wide text-black mt-3 mb-1 border-b-2 border-black/40 pb-0.5">${line.replace(/^##\s+/, '')}</h4>`);
      } else if (/^###\s/.test(line)) {
        closeList();
        closeTable();
        out.push(`<p class="font-mono-label text-[10px] font-extrabold uppercase text-amber-700 mt-2 mb-0.5">${line.replace(/^###\s+/, '')}</p>`);
      } else if (/^\s*[-*]\s+/.test(line)) {
        closeTable();
        if (!inList) {
          out.push('<ul class="list-none flex flex-col gap-1 my-1">');
          inList = true;
        }
        out.push(`<li class="pl-4 relative">- ${line.replace(/^\s*[-*]\s+/, '')}</li>`);
      } else if (/^\s*\|/.test(line) && /\|\s*$/.test(line)) {
        closeList();
        const cells = line
          .trim()
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());
        if (cells.every((c) => /^:?-{2,}:?$/.test(c))) {
          inTable = true;
          tableRows = [];
        } else if (inTable) {
          const row = cells.map((c) => `<td class="border border-black/30 px-1.5 py-0.5 text-left">${c}</td>`).join('');
          tableRows.push(row);
        }
      } else if (line.trim() === '') {
        closeList();
        closeTable();
      } else {
        closeList();
        closeTable();
        out.push(`<p class="my-1">${line}</p>`);
      }
    }
    closeList();
    closeTable();
    return out.join('\n');
  }

  let messages = $state<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Saludos, Alquimista! Soy tu Asistente de Flujos. Cuéntame qué metas tienes hoy o usa las acciones rápidas para optimizar tus hábitos y acelerar la transmutación alquímica.',
      timestamp: new Date(),
      suggestedActions: [
        {
          type: 'quick_routine',
          label: 'Crear Rutina de Bienestar',
          payload: { category: 'bienestar' },
        },
        {
          type: 'quick_routine',
          label: 'Crear Rutina de Enfoque (Estudio/Trabajo)',
          payload: { category: 'enfoque' },
        },
      ],
    },
  ]);

  const sendMessage = async (customPrompt?: string, mode?: string) => {
    const textToSend = customPrompt || inputMessage.trim();
    if (!textToSend && !mode) return;

    if (textToSend) {
      messages = [
        ...messages,
        {
          id: Date.now().toString(),
          sender: 'user',
          text: textToSend,
          timestamp: new Date(),
        },
      ];
    }

    if (!customPrompt) inputMessage = '';
    isLoading = true;
    errorMsg = null;

    try {
      const authToken = getAuthToken();
      if (!authToken) {
        throw new Error('Debes iniciar sesión para usar el Asistente Alquímico.');
      }
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          message: textToSend,
          mode,
          userContext: {
            name: user.name,
            level: user.level,
            currentXp: user.currentXp,
            maxXp: user.maxXp,
            totalXp: user.totalXp,
            availablePoints: user.availablePoints ?? 0,
            attributes: user.attributes,
            habits: habits.map((h) => ({
              id: h.id,
              title: h.title,
              completed: h.completed,
              category: h.category,
              streak: h.streak,
              currentCount: h.currentCount,
              targetCount: h.targetCount,
              xpReward: h.xpReward,
              minLevel: h.minLevel,
            })),
          },
        }),
      });

      const raw = await res.text();
      let data: any = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = { error: raw || 'Respuesta vacía del servidor.' };
      }

      if (!res.ok) {
        throw new Error(data.error || 'No se pudo comunicar con el asistente.');
      }

      messages = [
        ...messages,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply || 'Proceso alquímico finalizado.',
          timestamp: new Date(),
          suggestedActions: data.suggestedActions || [],
        },
      ];
    } catch (err: any) {
      console.error('Assistant error:', err);
      errorMsg = err.message || 'Error al conectar con el Asistente.';
    } finally {
      isLoading = false;
    }
  };

  const handleExecuteAction = (action: SuggestedAction) => {
    if (action.type === 'create_habit' && action.payload) {
      const newHabit: HabitCard = {
        id: `h-ai-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: action.payload.title || 'Nuevo Hábito AI',
        category: action.payload.category || 'focus',
        targetCount: 1,
        currentCount: 0,
        completed: false,
        xpReward: action.payload.xpReward || 30,
        minLevel: user.level,
      };
      onAddHabit(newHabit);
      messages = [
        ...messages,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: `¡Excelente! He añadido el hábito "${newHabit.title}" a tu Deck activo.`,
          timestamp: new Date(),
        },
      ];
    } else if (action.type === 'quick_routine' && Array.isArray(action.payload)) {
      action.payload.forEach((hItem: any, idx: number) => {
        const newHabit: HabitCard = {
          id: `h-ai-routine-${Date.now()}-${idx}`,
          title: hItem.title || 'Hábito Alquímico',
          category: hItem.category || 'focus',
          targetCount: 1,
          currentCount: 0,
          completed: false,
          xpReward: hItem.xpReward || 25,
          minLevel: user.level,
        };
        onAddHabit(newHabit);
      });
      messages = [
        ...messages,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: `¡Rutina añadida! He incorporado ${action.payload.length} hábitos optimizados directamente a tu Deck.`,
          timestamp: new Date(),
        },
      ];
    } else if (action.type === 'mark_complete' && action.payload?.habitTitle) {
      const found = habits.find(
        (h) => h.title.toLowerCase().includes(action.payload.habitTitle.toLowerCase())
      );
      if (found) {
        onToggleHabit(found.id);
        messages = [
          ...messages,
          {
            id: Date.now().toString(),
            sender: 'assistant',
            text: `¡Marcado! Hábito "${found.title}" completado con éxito.`,
            timestamp: new Date(),
          },
        ];
      }
    }
  };
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
  >
    <div
      class="bg-white border-[3px] border-black p-4 sm:p-5 shadow-[5px_5px_0_0_rgba(0,0,0,1)] max-w-lg w-full h-[85vh] flex flex-col justify-between relative wobbly-border text-black select-none"
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b-[3px] border-black pb-3 shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 border-[2px] border-black bg-amber-300 text-black flex items-center justify-center font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span class="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <div>
            <h3 class="font-headline text-lg sm:text-xl font-extrabold uppercase tracking-tight leading-tight">
              Asistente de Flujos AI
            </h3>
            <p class="text-[11px] font-mono font-bold text-neutral-600">
              Motor Alquímico IA
            </p>
          </div>
        </div>

        <button
          type="button"
          onclick={onClose}
          class="w-8 h-8 bg-black text-white border-[2px] border-black flex items-center justify-center font-bold hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          ✕
        </button>
      </div>

      <!-- Quick Action Buttons Bar -->
      <div class="py-2 flex items-center gap-1.5 overflow-x-auto shrink-0 border-b border-black text-xs font-mono font-bold">
        <button
          type="button"
          onclick={() => sendMessage('Crea una rutina de 3 hábitos enfocados en estudio y productividad.', 'quick_routine')}
          disabled={isLoading}
          class="bg-[#f0f0f0] border border-black px-2 py-1 whitespace-nowrap hover:bg-amber-200 active:translate-y-0.5 cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span class="material-symbols-outlined text-xs">bolt</span>
          Rutina Enfoque
        </button>

        <button
          type="button"
          onclick={() => sendMessage('¿Cómo voy con mis rachas en el calendario y qué debo mejorar?', 'streak_analysis')}
          disabled={isLoading}
          class="bg-[#f0f0f0] border border-black px-2 py-1 whitespace-nowrap hover:bg-amber-200 active:translate-y-0.5 cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span class="material-symbols-outlined text-xs">analytics</span>
          Diagnóstico Rachas
        </button>

        <button
          type="button"
          onclick={() => sendMessage('Genera mi Reflejo Alquímico completo.', 'reflection')}
          disabled={isLoading}
          class="bg-black text-white border border-black px-2 py-1 whitespace-nowrap hover:bg-neutral-800 active:translate-y-0.5 cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span class="material-symbols-outlined text-xs">auto_fix_high</span>
          Reflejo Alquímico
        </button>
      </div>

      <!-- Message History Thread -->
      <div class="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
        {#each messages as msg (msg.id)}
          <div
            class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}"
          >
            <div
              class="max-w-[85%] p-3 border-[3px] border-black font-sans leading-relaxed {msg.sender === 'user'
                ? 'bg-black text-white shadow-[3px_3px_0_0_rgba(0,0,0,1)]'
                : 'bg-[#f8f8f9] text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]'}"
            >
              <div class="font-mono-label text-[9px] font-bold uppercase mb-1 {msg.sender === 'user' ? 'text-neutral-400' : 'text-neutral-600'}">
                {msg.sender === 'user' ? 'Tú' : 'Gran Alquimista Noir'}
              </div>
              {#if msg.sender === 'assistant'}
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                <div class="whitespace-pre-line">{@html renderMarkdown(msg.text)}</div>
              {:else}
                <p class="whitespace-pre-line">{msg.text}</p>
              {/if}

              <!-- Executable Actions Suggested by Assistant -->
              {#if msg.suggestedActions && msg.suggestedActions.length > 0}
                <div class="mt-3 pt-2 border-t border-black/20 flex flex-col gap-1.5">
                  <span class="font-mono text-[9px] font-extrabold uppercase tracking-wider text-amber-700">
                    Acciones Rápidas Disponibles:
                  </span>
                  {#each msg.suggestedActions as act}
                    <button
                      type="button"
                      onclick={() => handleExecuteAction(act)}
                      class="bg-amber-300 text-black border border-black px-2.5 py-1.5 font-mono-label text-xs font-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-amber-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>{act.label}</span>
                      <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/each}

        {#if isLoading}
          <div class="flex items-center gap-2 text-neutral-600 font-mono text-xs py-2">
            <span class="material-symbols-outlined animate-spin text-base">sync</span>
            <span>Transmutando respuesta del Motor Alquímico...</span>
          </div>
        {/if}

        {#if errorMsg}
          <div class="p-2.5 bg-red-100 border-[2px] border-black text-red-800 font-mono text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-start gap-1.5">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>{errorMsg}</span>
          </div>
        {/if}
      </div>

      <!-- Input Form -->
      <form
        onsubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        class="pt-3 border-t-[3px] border-black flex gap-1.5 shrink-0"
      >
        <input
          type="text"
          bind:value={inputMessage}
          placeholder="Escribe tu meta (ej: 'Simplifica mi rutina')..."
          disabled={isLoading}
          class="flex-1 border-[2px] border-black p-2 font-mono text-xs focus:outline-none focus:bg-amber-50 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          class="bg-black text-white px-3.5 py-2 font-mono-label text-xs font-extrabold border-[2px] border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-neutral-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
        >
          <span>ENVIAR</span>
          <span class="material-symbols-outlined text-sm">send</span>
        </button>
      </form>
    </div>
  </div>
{/if}
