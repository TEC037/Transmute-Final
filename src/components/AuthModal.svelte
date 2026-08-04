<script lang="ts">
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
  import { setAuthToken, clearAuthToken } from '../lib/authToken';

  interface Props {
    isOpen: boolean;
    currentUser: User | null;
    onClose: () => void;
  }

  let {
    isOpen,
    currentUser,
    onClose,
  }: Props = $props();

  let isSignUp = $state(false);
  let email = $state('');
  let password = $state('');
  let errorMsg = $state('');
  let loading = $state(false);

  const friendlyAuthError = (err: any): string => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/admin-restricted-operation':
        return 'El acceso anónimo no está habilitado en Firebase. Usa Google o correo electrónico, o habilita "Acceso anónimo" en la consola de Firebase (Authentication → Sign-in method).';
      case 'auth/operation-not-allowed':
        return 'Este método de acceso no está habilitado en la consola de Firebase.';
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con este correo electrónico.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Correo o contraseña incorrectos.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
      case 'auth/popup-blocked':
        return 'El navegador bloqueó la ventana de Google. Permite los popups e inténtalo de nuevo.';
      case 'auth/network-request-failed':
        return 'Sin conexión de red. Revisa tu internet e inténtalo de nuevo.';
      case 'auth/unauthorized-domain':
        return 'Este dominio no está autorizado en la consola de Firebase.';
      default:
        return err?.message || 'Error en la autenticación';
    }
  };

  const handleGoogleAuth = async () => {
    loading = true;
    errorMsg = '';
    try {
      await signInWithPopup(auth, googleProvider);
      const token = await auth.currentUser!.getIdToken();
      setAuthToken(token);
      onClose();
    } catch (err: any) {
      console.error(err);
      errorMsg = friendlyAuthError(err);
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
      onClose();
    } catch (err: any) {
      console.error(err);
      errorMsg = friendlyAuthError(err);
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
      onClose();
    } catch (err: any) {
      console.error(err);
      errorMsg = friendlyAuthError(err);
    } finally {
      loading = false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearAuthToken();
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div
      class="bg-white border-[3px] border-black p-6 w-full max-w-md wobbly-border shadow-[5px_5px_0_0_rgba(0,0,0,1)] relative overflow-hidden animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto"
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
        <div class="p-3 mb-4 bg-red-100 border-[2px] border-black text-xs font-bold text-red-700 shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-start gap-1.5">
          <span class="material-symbols-outlined text-sm">warning</span>
          <span>{errorMsg}</span>
        </div>
      {/if}

      {#if currentUser}
        <!-- Logged In State -->
        <div class="flex flex-col gap-4">
          <div class="p-4 border-[3px] border-black bg-neutral-50 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
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

          {#if loading}
            <div class="flex items-center justify-center gap-2 p-3 border-[2px] border-black bg-neutral-50">
              <div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span class="font-mono-label text-xs font-bold text-neutral-600">Cerrando sesión...</span>
            </div>
          {:else}
            <button type="button" onclick={handleLogout} class="w-full py-2.5 bg-red-600 text-white border-[2px] border-black font-headline text-sm font-extrabold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
              <span class="material-symbols-outlined text-lg">logout</span> CERRAR SESIÓN
            </button>
          {/if}
        </div>

      {:else}
        <!-- Logged Out State -->
        <div class="flex flex-col gap-4">
          <!-- Google Sign In Button -->
          <button
            type="button"
            onclick={handleGoogleAuth}
            disabled={loading}
            class="w-full py-3 bg-white text-black border-[3px] border-black font-headline text-base font-extrabold shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed">
            {#if loading}
              <div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
            {:else}
              <span class="material-symbols-outlined text-xl">g_mobiledata</span>
            {/if}
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
                class="w-full border-[2px] border-black p-2 font-mono text-xs bg-neutral-50 outline-none"
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
                class="w-full border-[2px] border-black p-2 font-mono text-xs bg-neutral-50 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              class="w-full py-3 bg-black text-white border-[3px] border-black font-headline text-base font-extrabold shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed">
              {#if loading}
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
              {/if}
              {loading ? 'Cargando...' : isSignUp ? 'REGISTRAR CUENTA' : 'INICIAR SESIÓN'}
            </button>
          </form>

          <div class="flex justify-between items-center text-xs font-bold border-t-2 border-neutral-300 pt-3">
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
        </div>
      {/if}

    </div>
  </div>
{/if}

