<script lang="ts">
  import { untrack } from 'svelte';
  import {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInAnonymously,
    signOut,
    type User,
  } from '../lib/firebase';
  import PassphraseModal from './PassphraseModal.svelte';
  import { encryptAndPersistToken, removePersistedEncryptedToken, setAuthToken, clearAuthToken } from '../lib/authToken';

  interface Props {
    isOpen: boolean;
    currentUser: User | null;
    customApiKey?: string;
    isNoirDarkMode?: boolean;
    onClose: () => void;
    onSaveApiKey?: (apiKey: string) => void;
    onToggleNoirDarkMode?: () => void;
  }

  let {
    isOpen,
    currentUser,
    customApiKey = '',
    isNoirDarkMode = false,
    onClose,
    onSaveApiKey,
    onToggleNoirDarkMode,
  }: Props = $props();

  let isSignUp = $state(false);
  let email = $state('');
  let password = $state('');
  let apiKeyInput = $state('');
  let errorMsg = $state('');
  let loading = $state(false);
  let successMsg = $state('');

  // new state for remembering device
  let rememberDevice = $state(false);
  let showPassphraseModal = $state(false);
  let passphraseAttempts = $state(0);

  $effect(() => {
    if (isOpen) {
      untrack(() => {
        apiKeyInput = customApiKey;
        errorMsg = '';
        successMsg = '';
      });
    }
  });

  const handleGoogleAuth = async () => {
    loading = true;
    errorMsg = '';
    try {
      await signInWithPopup(auth, googleProvider);
      // after successful login, set token in memory and optionally persist encrypted
      const token = await auth.currentUser!.getIdToken();
      setAuthToken(token);
      if (rememberDevice) {
        showPassphraseModal = true;
      } else {
        removePersistedEncryptedToken();
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      errorMsg = err.message || 'Error al iniciar sesión con Google';
    } finally {
      loading = false;
    }
  };

  const handleEmailAuth = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    loading = true;
    errorMsg = '';

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      const token = await auth.currentUser!.getIdToken();
      setAuthToken(token);
      if (rememberDevice) {
        showPassphraseModal = true;
      } else {
        removePersistedEncryptedToken();
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      errorMsg = err.message || 'Error en la autenticación';
    } finally {
      loading = false;
    }
  };

  const handleAnonymousAuth = async () => {
    loading = true;
    errorMsg = '';
    try {
      await signInAnonymously(auth);
      const token = await auth.currentUser!.getIdToken();
      setAuthToken(token);
      if (rememberDevice) {
        showPassphraseModal = true;
      } else {
        removePersistedEncryptedToken();
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      errorMsg = err.message || 'Error al acceder de forma anónima';
    } finally {
      loading = false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearAuthToken();
      removePersistedEncryptedToken();
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSaveKey = () => {
    onSaveApiKey?.(apiKeyInput.trim());
    successMsg = '¡API Key guardada correctamente!';
    setTimeout(() => {
      successMsg = '';
    }, 3000);
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div
      class="bg-white border-[4px] border-black p-6 w-full max-w-md wobbly-border shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto"
    >
      <!-- Close button -->
      <button
        type="button"
        onclick={onClose}
        class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        ✕
      </button>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 border-[2.5px] border-black bg-black text-white flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl">account_circle</span>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-extrabold text-black leading-tight">
            Autenticación Firebase
          </h3>
          <p class="font-mono-label text-xs font-bold text-neutral-600">
            {currentUser ? 'CUENTA CONECTADA' : 'INICIA SESIÓN PARA GENERAR IMÁGENES'}
          </p>
        </div>
      </div>

      {#if errorMsg}
        <div class="p-3 mb-4 bg-red-100 border-[2px] border-black text-xs font-bold text-red-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          ⚠️ {errorMsg}
        </div>
      {/if}

      {#if currentUser}
        <!-- Logged In State -->
        <div class="flex flex-col gap-4">
          <div class="p-4 border-[2.5px] border-black bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div class="flex items-center gap-3">
              {#if currentUser.photoURL}
                <img src={currentUser.photoURL} alt="User Avatar" class="w-12 h-12 rounded-full border-[2px] border-black" />
              {:else}
                <div class="w-12 h-12 border-[2px] border-black bg-black text-white flex items-center justify-center font-bold text-xl">
                  {currentUser.displayName ? currentUser.displayName[0] : 'A'}
                </div>
              {/if}
              <div>
                <h4 class="font-headline text-base font-extrabold text-black">
                  {currentUser.displayName || (currentUser.isAnonymous ? 'Alquimista Anónimo' : 'Usuario Firebase')}
                </h4>
                <p class="font-mono-label text-[11px] text-neutral-600 font-bold">
                  {currentUser.email || currentUser.uid}
                </p>
              </div>
            </div>
          </div>

          <!-- User Gemini API Key Section -->
          <div class="p-4 border-[2.5px] border-black bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2">
            <label class="font-mono-label text-xs font-bold uppercase text-black" for="custom-api-key">
              Tu Gemini API Key (Opcional)
            </label>
            <p class="text-[11px] text-neutral-600 font-medium leading-tight">
              Ingresa tu propia API Key para generar y editar imágenes con tu cuota personal de Google AI Studio.
            </p>
            <div class="flex gap-2 mt-1">
              <input
                id="custom-api-key"
                type="password"
                bind:value={apiKeyInput}
                placeholder="AIzaSy..."
                class="flex-1 border-[2px] border-black p-2 font-mono text-xs bg-white outline-none"
              />
              <button
                type="button"
                onclick={handleSaveKey}
                class="px-3 py-1 bg-black text-white border-[2px] border-black font-mono-label text-xs font-bold hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:[...]
              >
                Guardar
              </button>
            </div>
            {#if successMsg}
              <span class="text-[11px] font-bold text-green-700">{successMsg}</span>
            {/if}
          </div>

          <!-- Noir Theme Settings Toggle Block -->
          <div class="p-3 border-[2px] border-black bg-amber-50/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div class="pr-2">
              <div class="flex items-center gap-1.5 font-headline text-xs font-extrabold uppercase text-black">
                <span class="material-symbols-outlined text-base">movie_filter</span>
                Modo Noir 1930 (Sepia & Cine)
              </div>
              <p class="text-[10px] text-neutral-600 font-mono font-bold leading-tight mt-0.5">
                Alto contraste en tonos sepia y grano de película antigua de los años 30.
              </p>
            </div>
            <button
              type="button"
              onclick={() => onToggleNoirDarkMode?.()}
              class="px-3 py-1.5 border-[2px] border-black font-mono-label text-xs font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:s[...]
            >
              {isNoirDarkMode ? 'ACTIVADO' : 'DESACTIVADO'}
            </button>
          </div>

          <button
            type="button"
            onclick={handleLogout}
            class="w-full py-2.5 bg-red-600 text-white border-[2.5px] border-black font-headline text-sm font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:tran[...]
          >
            <span class="material-symbols-outlined text-lg">logout</span>
            CERRAR SESIÓN
          </button>
        </div>

      {:else}
        <!-- Logged Out State -->
        <div class="flex flex-col gap-4">
          <!-- Google Sign In Button -->
          <button
            type="button"
            onclick={handleGoogleAuth}
            disabled={loading}
            class="w-full py-3 bg-white text-black border-[3px] border-black font-headline text-base font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translat[...]">
            <span class="material-symbols-outlined text-xl">g_mobiledata</span>
            INICIAR SESIÓN CON GOOGLE
          </button>

          <div class="flex items-center gap-2 my-1">
            <div class="flex-1 h-[2px] bg-neutral-300"></div>
            <span class="font-mono-label text-[10px] text-neutral-500 uppercase font-bold">O EMAIL</span>
            <div class="flex-1 h-[2px] bg-neutral-300"></div>
          </div>

          <form onsubmit={handleEmailAuth} class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="font-mono-label text-xs font-bold uppercase text-black" for="auth-email">
                Correo Electrónico
              </label>
              <input
                id="auth-email"
                type="email"
                bind:value={email}
                placeholder="tu@email.com"
                required
                class="w-full border-[2.5px] border-black p-2 font-mono text-xs bg-neutral-50 outline-none"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-mono-label text-xs font-bold uppercase text-black" for="auth-password">
                Contraseña
              </label>
              <input
                id="auth-password"
                type="password"
                bind:value={password}
                placeholder="••••••••"
                required
                class="w-full border-[2.5px] border-black p-2 font-mono text-xs bg-neutral-50 outline-none"
              />
            </div>

            <label class="flex items-center gap-2 text-xs font-bold">
              <input type="checkbox" bind:checked={rememberDevice} />
              <span>Recordar este dispositivo (protegido con passphrase)</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              class="w-full py-3 bg-black text-white border-[3px] border-black font-headline text-base font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:transl[...]">
              {loading ? 'Cargando...' : isSignUp ? 'REGISTRAR CUENTA' : 'INICIAR SESIÓN'}
            </button>
          </form>

          <div class="flex justify-between items-center text-xs font-bold border-t-[1.5px] border-neutral-300 pt-3">
            <button
              type="button"
              onclick={() => (isSignUp = !isSignUp)}
              class="text-neutral-700 underline hover:text-black cursor-pointer"
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
            <button
              type="button"
              onclick={handleAnonymousAuth}
              class="text-neutral-500 hover:text-black cursor-pointer font-mono-label text-[10px] uppercase"
            >
              Acceso Anónimo →
            </button>
          </div>

          <!-- Noir Theme Toggle Block -->
          <div class="mt-1 p-3 border-[2px] border-black bg-amber-50/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div class="pr-2">
              <div class="flex items-center gap-1.5 font-headline text-xs font-extrabold uppercase text-black">
                <span class="material-symbols-outlined text-base">movie_filter</span>
                Modo Noir 1930 (Sepia & Cine)
              </div>
              <p class="text-[10px] text-neutral-600 font-mono font-bold leading-tight mt-0.5">
                Alto contraste en tonos sepia y grano de película antigua de los años 30.
              </p>
            </div>
            <button
              type="button"
              onclick={() => onToggleNoirDarkMode?.()}
              class="px-3 py-1.5 border-[2px] border-black font-mono-label text-xs font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:s[...]
            >
              {isNoirDarkMode ? 'ACTIVADO' : 'DESACTIVADO'}
            </button>
          </div>
        </div>
      {/if}

      <PassphraseModal
        bind:open={showPassphraseModal}
        on:confirm={async (e) => {
          const { passphrase } = e.detail;
          try {
            const current = await auth.currentUser!.getIdToken();
            await encryptAndPersistToken(current, passphrase);
            showPassphraseModal = false;
          } catch (err) {
            passphraseAttempts += 1;
            if (passphraseAttempts >= 3) {
              removePersistedEncryptedToken();
              showPassphraseModal = false;
            }
          }
        }}
        on:cancel={() => {
          showPassphraseModal = false;
        }}
      />
    </div>
  </div>
{/if}
