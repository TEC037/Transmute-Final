<script lang="ts">
  import type { User } from 'firebase/auth';
  import { db, collection, addDoc, query, where, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp } from '../lib/firebase';
  import type { UserGeneratedImage, AlbumCard } from '../types';

  interface Props {
    currentUser: User | null;
    customApiKey?: string;
    onOpenAuthModal: () => void;
    onTransmuteToCard?: (imageUrl: string, title: string) => void;
  }

  let { currentUser, customApiKey = '', onOpenAuthModal, onTransmuteToCard }: Props = $props();

  let mode = $state<'generate' | 'edit'>('generate');
  let prompt = $state('');
  let style = $state('vintage-ink');
  let aspectRatio = $state('1:1');
  let isGenerating = $state(false);
  let errorMsg = $state('');
  let currentGeneratedUrl = $state<string | null>(null);

  // Edit Mode state
  let editSourceBase64 = $state<string | null>(null);

  // Gallery
  let userGallery = $state<UserGeneratedImage[]>([]);
  let selectedGalleryImage = $state<UserGeneratedImage | null>(null);
  let cardTitleInput = $state('');

  // Styles preset
  const stylesList = [
    { id: 'vintage-ink', label: 'Historieta Vintage (Entintado & Halftone)' },
    { id: 'alchemy-engraving', label: 'Grabado Alquímico Medival' },
    { id: 'retro-pixel', label: 'Pixel Art 16-bit' },
    { id: 'fantasy-watercolor', label: 'Acuarela Fantasía' },
    { id: 'cyberpunk-neon', label: 'Ink Cyberpunk' },
    { id: 'none', label: 'Sin estilo predefinido' },
  ];

  // Subscribe to user generated images from Firebase Firestore
  $effect(() => {
    if (!currentUser) {
      userGallery = [];
      return;
    }

    try {
      const q = query(
        collection(db, 'user_images'),
        where('userId', '==', currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs: UserGeneratedImage[] = [];
        snapshot.forEach((docSnap) => {
          docs.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<UserGeneratedImage, 'id'>),
          });
        });
        // Sort newest first
        docs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        userGallery = docs;
      }, (err) => {
        console.warn('Firestore snapshot error:', err);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error(e);
    }
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    isGenerating = true;
    errorMsg = '';
    currentGeneratedUrl = null;

    try {
      let endpoint = '/api/generate-image';
      let payload: any = {
        prompt: prompt.trim(),
        aspectRatio,
        style,
        userApiKey,
      };

      if (mode === 'edit' && editSourceBase64) {
        endpoint = '/api/edit-image';
        payload = {
          prompt: prompt.trim(),
          base64Image: editSourceBase64,
          userApiKey,
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al conectar con la API de generación');
      }

      currentGeneratedUrl = data.imageUrl;

      // Automatically save to Firebase Firestore if logged in
      if (currentUser && data.imageUrl) {
        await addDoc(collection(db, 'user_images'), {
          userId: currentUser.uid,
          prompt: prompt.trim(),
          imageUrl: data.imageUrl,
          aspectRatio,
          style,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.error(err);
      errorMsg = err.message || 'Error al generar la imagen con la API';
    } finally {
      isGenerating = false;
    }
  };

  const handleFileUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        editSourceBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, 'user_images', imageId));
      if (selectedGalleryImage?.id === imageId) {
        selectedGalleryImage = null;
      }
    } catch (e) {
      console.error('Failed to delete image', e);
    }
  };

  const handleSaveAsCard = (imgUrl: string) => {
    const title = cardTitleInput.trim() || prompt.trim().slice(0, 20) || 'Cromo Alquímico';
    onTransmuteToCard?.(imgUrl, title);
    cardTitleInput = '';
    selectedGalleryImage = null;
  };
</script>

<div class="flex flex-col gap-8 max-w-2xl mx-auto pb-16">
  <!-- Top Banner for Auth Status -->
  <section class="bg-white border-[3px] border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] wobbly-border flex justify-between items-center gap-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 border-[2px] border-black bg-black text-white flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl">auto_awesome</span>
      </div>
      <div>
        <h2 class="font-headline text-lg md:text-xl font-extrabold text-black leading-tight">
          Laboratorio de Transmutación IA
        </h2>
        <p class="font-mono-label text-[11px] text-neutral-600 font-bold">
          {currentUser
            ? `Conectado como ${currentUser.displayName || currentUser.email || 'Alquimista'}`
            : 'Inicia sesión con Firebase para guardar tus ilustraciones'}
        </p>
      </div>
    </div>

    <button
      type="button"
      onclick={onOpenAuthModal}
      class="px-3 py-1.5 bg-black text-white border-[2px] border-black font-mono-label text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none shrink-0"
    >
      {currentUser ? 'MI CUENTA / API KEY' : 'INICIAR SESIÓN'}
    </button>
  </section>

  <!-- Generator Form Card -->
  <section class="bg-white border-[3px] border-black p-5 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] wobbly-border flex flex-col gap-5">
    <!-- Mode Tabs -->
    <div class="flex border-b-2 border-black pb-2 gap-2">
      <button
        type="button"
        onclick={() => (mode = 'generate')}
        class="px-4 py-1.5 font-headline text-sm font-extrabold border-[2px] border-black transition-all cursor-pointer {mode === 'generate'
          ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white text-black hover:bg-neutral-100'}"
      >
        ✨ Generar desde Cero (Texto)
      </button>
      <button
        type="button"
        onclick={() => (mode = 'edit')}
        class="px-4 py-1.5 font-headline text-sm font-extrabold border-[2px] border-black transition-all cursor-pointer {mode === 'edit'
          ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white text-black hover:bg-neutral-100'}"
      >
        🎨 Transmutar / Editar Imagen
      </button>
    </div>

    {#if mode === 'edit'}
      <div class="flex flex-col gap-2 p-3 border-[2px] border-dashed border-black bg-neutral-50">
        <label class="font-mono-label text-xs font-bold uppercase text-black" for="edit-image-file">
          Subir Imagen Base para Transmutar
        </label>
        <input
          id="edit-image-file"
          type="file"
          accept="image/*"
          onchange={handleFileUpload}
          class="font-mono text-xs cursor-pointer"
        />
        {#if editSourceBase64}
          <div class="mt-2 relative w-32 h-32 border-[2px] border-black bg-white">
            <img src={editSourceBase64} alt="Source Preview" class="w-full h-full object-cover" />
            <button
              type="button"
              onclick={() => (editSourceBase64 = null)}
              class="absolute top-1 right-1 bg-black text-white px-1 font-mono text-[10px] font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Prompt Input -->
    <div class="flex flex-col gap-1.5">
      <label class="font-mono-label text-xs font-bold uppercase text-black" for="gen-prompt">
        {mode === 'generate' ? 'Describe la imagen o cromo que deseas transmutar *' : 'Instrucciones de modificación *'}
      </label>
      <textarea
        id="gen-prompt"
        bind:value={prompt}
        rows="3"
        placeholder={mode === 'generate'
          ? 'Ej: Un sabio alquimista sosteniendo una piedra filosofal reluciente con destellos dorados, grabado vintage...'
          : 'Ej: Añade auras místicas de fuego azul y destellos de estrellas alrededor del personaje...'}
        class="w-full border-[2.5px] border-black p-3 font-headline text-sm bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-white resize-none"
      ></textarea>
    </div>

    <!-- Options: Style & Aspect Ratio -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label class="font-mono-label text-xs font-bold uppercase text-black" for="gen-style">
          Estilo Artístico
        </label>
        <select
          id="gen-style"
          bind:value={style}
          class="w-full border-[2.5px] border-black p-2 font-mono-label text-xs font-bold bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none"
        >
          {#each stylesList as st (st.id)}
            <option value={st.id}>{st.label}</option>
          {/each}
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-mono-label text-xs font-bold uppercase text-black" for="gen-aspect">
          Proporción de Imagen
        </label>
        <div id="gen-aspect" class="grid grid-cols-4 gap-1 pt-0.5">
          {#each ['1:1', '3:4', '4:3', '16:9'] as ratio (ratio)}
            <button
              type="button"
              onclick={() => (aspectRatio = ratio)}
              class="py-1.5 border-[2px] border-black font-mono-label text-xs font-bold transition-all cursor-pointer {aspectRatio === ratio
                ? 'bg-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-neutral-100 hover:bg-neutral-200 text-black'}"
            >
              {ratio}
            </button>
          {/each}
        </div>
      </div>
    </div>

    {#if errorMsg}
      <div class="p-3 bg-red-100 border-[2px] border-black text-xs font-bold text-red-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        ⚠️ {errorMsg}
      </div>
    {/if}

    <!-- Submit Button -->
    <button
      type="button"
      onclick={handleGenerate}
      disabled={isGenerating || !prompt.trim()}
      class="w-full py-4 bg-black text-white border-[3px] border-black font-headline text-xl font-extrabold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
    >
      {#if isGenerating}
        <span class="material-symbols-outlined text-2xl animate-spin">auto_starter</span>
        TRANSMUTANDO PIGMENTOS CON IA...
      {:else}
        <span class="material-symbols-outlined text-2xl">magic_button</span>
        {mode === 'generate' ? 'GENERAR ILUSTRACIÓN IA' : 'TRANSMUTAR IMAGEN'}
      {/if}
    </button>
  </section>

  <!-- Generated Preview Result -->
  {#if currentGeneratedUrl}
    <section class="bg-white border-[3px] border-black p-5 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] wobbly-border flex flex-col items-center gap-4 animate-in fade-in duration-300">
      <div class="w-full flex justify-between items-center border-b-2 border-black pb-2">
        <h3 class="font-headline text-xl font-extrabold text-black uppercase">
          ¡Resultado Transmutado!
        </h3>
        <span class="font-mono-label text-xs bg-black text-white px-2 py-0.5 font-bold">
          NUEVA CREACIÓN
        </span>
      </div>

      <div class="w-full max-w-sm border-[3px] border-black bg-neutral-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <img
          src={currentGeneratedUrl}
          alt="Imagen generada"
          class="w-full h-auto object-contain"
        />
      </div>

      <div class="flex flex-wrap gap-3 w-full max-w-sm">
        <button
          type="button"
          onclick={() => onTransmuteToCard?.(currentGeneratedUrl!, prompt.slice(0, 20))}
          class="flex-1 py-2.5 bg-black text-white border-[2px] border-black font-headline text-sm font-extrabold hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-1.5"
        >
          <span class="material-symbols-outlined text-base">style</span>
          CONVERTIR EN CROMO
        </button>

        <a
          href={currentGeneratedUrl}
          download="alchemical-art.jpg"
          class="px-4 py-2.5 bg-white text-black border-[2px] border-black font-headline text-sm font-extrabold hover:bg-neutral-100 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-1"
        >
          <span class="material-symbols-outlined text-base">download</span>
          DESCARGAR
        </a>
      </div>
    </section>
  {/if}

  <!-- Firebase User Gallery -->
  <section class="flex flex-col gap-4">
    <div class="flex justify-between items-center border-b-2 border-black pb-2">
      <h3 class="font-headline text-2xl font-extrabold text-black">
        Galería Personal (Firebase)
      </h3>
      <span class="font-mono-label text-xs font-bold text-neutral-600">
        {userGallery.length} IMÁGENES GUARDADAS
      </span>
    </div>

    {#if !currentUser}
      <div class="p-6 border-[3px] border-dashed border-black bg-white text-center flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-4xl text-neutral-400">cloud_off</span>
        <p class="font-headline text-base font-bold text-neutral-700">
          Inicia sesión para sincronizar tus creaciones generadas por IA en tu cuenta de Firebase.
        </p>
        <button
          type="button"
          onclick={onOpenAuthModal}
          class="px-4 py-2 bg-black text-white border-[2px] border-black font-mono-label text-xs font-bold hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          CONECTAR MI CUENTA
        </button>
      </div>

    {:else if userGallery.length === 0}
      <div class="p-6 border-[3px] border-dashed border-black bg-white text-center flex flex-col items-center gap-2">
        <span class="material-symbols-outlined text-4xl text-neutral-400">photo_library</span>
        <p class="font-headline text-base font-bold text-neutral-700">
          Aún no tienes ilustraciones en tu galería Firebase. ¡Genera la primera arriba!
        </p>
      </div>

    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {#each userGallery as item (item.id)}
          <button
            type="button"
            onclick={() => (selectedGalleryImage = item)}
            class="group relative aspect-square bg-white border-[2.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all p-0 text-left"
          >
            <img
              src={item.imageUrl}
              alt={item.prompt}
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white">
              <p class="font-headline text-xs font-bold line-clamp-2 leading-tight">
                {item.prompt}
              </p>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Gallery Image Detail Modal -->
  {#if selectedGalleryImage}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div class="bg-white border-[4px] border-black p-6 w-full max-w-md wobbly-border shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative flex flex-col gap-4">
        <button
          type="button"
          onclick={() => (selectedGalleryImage = null)}
          class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          ✕
        </button>

        <h3 class="font-headline text-xl font-extrabold text-black pr-8">
          Detalles de Ilustración IA
        </h3>

        <div class="w-full aspect-square border-[3px] border-black bg-neutral-100 overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <img src={selectedGalleryImage.imageUrl} alt={selectedGalleryImage.prompt} class="w-full h-full object-contain" />
        </div>

        <p class="text-xs font-bold text-neutral-800 bg-neutral-100 p-2.5 border-[2px] border-black">
          "{selectedGalleryImage.prompt}"
        </p>

        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={cardTitleInput}
              placeholder="Nombre del Cromo (opcional)"
              class="flex-1 border-[2px] border-black p-2 font-headline text-xs bg-neutral-50"
            />
            <button
              type="button"
              onclick={() => handleSaveAsCard(selectedGalleryImage!.imageUrl)}
              class="px-3 py-2 bg-black text-white border-[2px] border-black font-headline text-xs font-extrabold hover:bg-neutral-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              CREAR CROMO
            </button>
          </div>

          <button
            type="button"
            onclick={() => handleDeleteImage(selectedGalleryImage!.id!)}
            class="w-full py-2 bg-red-600 text-white border-[2px] border-black font-mono-label text-xs font-bold hover:bg-red-700 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            ELIMINAR DE FIREBASE
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
