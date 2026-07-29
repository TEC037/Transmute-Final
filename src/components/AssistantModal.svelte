<script lang="ts">
  import type { HabitCard, UserStats } from '../types';

  interface SuggestedAction {
    type: 'create_habit' | 'mark_complete' | 'recommend_shop' | 'quick_routine';
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
    user: UserStats;
    habits: HabitCard[];
    onAddHabit: (habit: HabitCard) => void;
    onToggleHabit: (id: string) => void;
    onNavigateTab?: (tab: 'deck' | 'collection' | 'calendar' | 'shop') => void;
  }

  let { isOpen, onClose, user, habits, onAddHabit, onToggleHabit, onNavigateTab }: Props = $props();

  let inputMessage = $state('');
  let isLoading = $state(false);
  let errorMsg = $state<string | null>(null);

  // Noir Voice Dictation State
  let isListening = $state(false);

  function playTypewriterClickSound() {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 200, audioCtx.currentTime);
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

  const startVoiceDictation = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      errorMsg = 'Web Speech API no está soportada en este navegador.';
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        isListening = true;
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        inputMessage = transcript;
        playTypewriterClickSound();
      };

      recognition.onerror = (e: any) => {
        isListening = false;
        errorMsg = `Error de voz: ${e.error}`;
      };

      recognition.onend = () => {
        isListening = false;
      };

      recognition.start();
    } catch (err: any) {
      isListening = false;
      errorMsg = err.message || 'Error al conectar micrófono.';
    }
  };

  let messages = $state<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Saludos, Alquimista! Soy tu Asistente de Flujos. Cuéntame qué metas tienes hoy o usa las acciones rápidas para optimizar tus hábitos y acelerar la transmutación de cromos.',
      timestamp: new Date(),
      suggestedActions: [
        {
          type: 'quick_routine',
          label: '✨ Crear Rutina de Bienestar',
          payload: { category: 'bienestar' },
        },
        {
          type: 'quick_routine',
          label: '⚡ Crear Rutina de Enfoque (Estudio/Trabajo)',
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
      const userApiKey = localStorage.getItem('transmute_user_api_key') || '';

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          mode,
          userContext: {
            level: user.level,
            currentXp: user.currentXp,
            totalXp: user.totalXp,
            inkDrops: user.inkDrops ?? 0,
            habits: habits.map((h) => ({
              id: h.id,
              title: h.title,
              completed: h.completed,
              category: h.category,
            })),
          },
          userApiKey,
        }),
      });

      const data = await res.json();

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
        description: action.payload.description || 'Creado con el Asistente Alquímico.',
        category: action.payload.category || 'focus',
        type: 'daily',
        targetCount: 1,
        currentCount: 0,
        completed: false,
        xpReward: action.payload.xpReward || 30,
        inkReward: action.payload.inkReward || 10,
        minLevel: user.level,
        icon: action.payload.icon || 'auto_awesome',
        frequency: action.payload.frequency || 'Diario',
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
          description: hItem.description || 'Rutina optimizada.',
          category: hItem.category || 'focus',
          type: 'daily',
          targetCount: 1,
          currentCount: 0,
          completed: false,
          xpReward: hItem.xpReward || 25,
          inkReward: hItem.inkReward || 10,
          minLevel: user.level,
          icon: hItem.icon || 'auto_awesome',
          frequency: 'Diario',
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
    } else if (action.type === 'recommend_shop') {
      onClose();
      onNavigateTab?.('shop');
    }
  };
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
  >
    <div
      class="bg-white border-[4px] border-black p-4 sm:p-5 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full h-[85vh] flex flex-col justify-between relative wobbly-border text-black select-none"
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b-[3px] border-black pb-3 shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 border-[2px] border-black bg-amber-300 text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-3deg]">
            <span class="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <div>
            <h3 class="font-headline text-lg sm:text-xl font-extrabold uppercase tracking-tight leading-tight">
              Asistente de Flujos AI
            </h3>
            <p class="text-[11px] font-mono font-bold text-neutral-600">
              Powered by Gemini 3.6 Flash
            </p>
          </div>
        </div>

        <button
          type="button"
          onclick={onClose}
          class="w-8 h-8 bg-black text-white border-[2px] border-black flex items-center justify-center font-bold hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
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
          onclick={() => sendMessage('Tengo ' + (user.inkDrops ?? 0) + ' Gotas de Tinta. ¿Qué sobre vintage me conviene abrir en la tienda?')}
          disabled={isLoading}
          class="bg-[#f0f0f0] border border-black px-2 py-1 whitespace-nowrap hover:bg-amber-200 active:translate-y-0.5 cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span class="material-symbols-outlined text-xs">invert_colors</span>
          Consejo Tienda
        </button>
      </div>

      <!-- Message History Thread -->
      <div class="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
        {#each messages as msg (msg.id)}
          <div
            class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}"
          >
            <div
              class="max-w-[85%] p-3 border-[2.5px] border-black font-sans leading-relaxed {msg.sender === 'user'
                ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(100,100,100,1)]'
                : 'bg-[#f8f8f9] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'}"
            >
              <div class="font-mono-label text-[9px] font-bold uppercase mb-1 {msg.sender === 'user' ? 'text-neutral-400' : 'text-neutral-600'}">
                {msg.sender === 'user' ? 'Tú' : 'Gran Alquimista Noir'}
              </div>
              <p class="whitespace-pre-line">{msg.text}</p>

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
                      class="bg-amber-300 text-black border border-black px-2.5 py-1.5 font-mono-label text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer text-left flex items-center justify-between"
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
            <span>Transmutando respuesta con Gemini 3.6 Flash...</span>
          </div>
        {/if}

        {#if errorMsg}
          <div class="p-2.5 bg-red-100 border-[2px] border-black text-red-800 font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ⚠️ {errorMsg}
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
        <button
          type="button"
          onclick={startVoiceDictation}
          disabled={isLoading || isListening}
          class="px-2.5 py-2 border-[2.5px] border-black font-mono-label text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center shrink-0 {isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-300 text-black hover:bg-amber-400'}"
          title="Dictar mensaje por voz"
        >
          <span class="material-symbols-outlined text-base">{isListening ? 'graphic_eq' : 'mic'}</span>
        </button>

        <input
          type="text"
          bind:value={inputMessage}
          placeholder="Escribe o dicta tu meta (ej: 'Simplifica mi rutina')..."
          disabled={isLoading}
          class="flex-1 border-[2.5px] border-black p-2 font-mono text-xs focus:outline-none focus:bg-amber-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          class="bg-black text-white px-3.5 py-2 font-mono-label text-xs font-extrabold border-[2.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
        >
          <span>ENVIAR</span>
          <span class="material-symbols-outlined text-sm">send</span>
        </button>
      </form>
    </div>
  </div>
{/if}
