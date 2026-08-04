<script lang="ts">
  import CelebrationStamp from './components/CelebrationStamp.svelte';
  import Toast from './components/Toast.svelte';
  import HelpModal from './components/HelpModal.svelte';
  import {
    INITIAL_USER_PROFILE,
    ZERO_USER_PROFILE,
    INITIAL_HABITS,
  } from './data/initialData';
  import type { HabitCard, UserProfile } from './types';
  import Header from './components/Header.svelte';
  import BottomNav, { type TabType } from './components/BottomNav.svelte';
  import DeckView from './components/DeckView.svelte';
  import ProfileView from './components/ProfileView.svelte';
  import CalendarView from './components/CalendarView.svelte';
  import AuthModal from './components/AuthModal.svelte';
  import OnboardingModal from './components/OnboardingModal.svelte';
  import AttributeModal from './components/AttributeModal.svelte';
  import NewHabitModal from './components/NewHabitModal.svelte';
  import DailyShareModal from './components/DailyShareModal.svelte';
  import AssistantModal from './components/AssistantModal.svelte';

  import { auth, onAuthStateChanged, db, doc, getDoc, setDoc, type User } from './lib/firebase';
  import {
    saveHabitsLocal,
    loadHabitsLocal,
    saveUserProfileLocal,
    loadUserProfileLocal,
  } from './lib/storage';
  import { enqueueSync } from './lib/sync';
  import { popIn, popOut, overlayFade } from './lib/modalTransitions';

  // Load initial state from LocalStorage
  const loadInitialState = () => {
    try {
      const savedUser = loadUserProfileLocal();
      const savedHabits = loadHabitsLocal();

      const normalizedHabits = (savedHabits && savedHabits.length > 0 ? savedHabits : INITIAL_HABITS).map(
        (h: HabitCard) => ({ ...h, targetType: 'checkbox' })
      );

      return {
        user: savedUser || INITIAL_USER_PROFILE,
        habits: normalizedHabits,
      };
    } catch (e) {
      console.error('Failed loading state from localStorage', e);
      return {
        user: INITIAL_USER_PROFILE,
        habits: INITIAL_HABITS,
      };
    }
  };

  const initial = loadInitialState();

  let activeTab = $state<TabType>('deck');
  let user = $state<UserProfile>(initial.user);
  let habits = $state<HabitCard[]>(initial.habits);

  // Online / Offline state tracking
  let isOnline = $state(typeof navigator !== 'undefined' ? navigator.onLine : true);

  $effect(() => {
    const updateOnlineStatus = () => {
      isOnline = navigator.onLine;
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  });

  // Firebase Auth & User profile
  let currentUser = $state<User | null>(null);
  let authModalOpen = $state(false);
  let onboardingModalOpen = $state(false);

  // Listen to Auth State
  $effect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      currentUser = u;
      if (u) {
        // Sync user profile with Firestore document
        try {
          const userRef = doc(db, 'users', u.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data();
            user = {
              ...user,
              uid: u.uid,
              email: u.email || undefined,
              name: data.displayName || u.displayName || user.name,
              avatarUrl: u.photoURL || user.avatarUrl,
              level: data.level ?? user.level,
              currentXp: data.currentXp ?? user.currentXp,
              maxXp: data.maxXp ?? user.maxXp,
              totalXp: data.totalXp ?? user.totalXp,
            };
          } else {
            // Create user document if first time (Starts from 0!)
            user = {
              ...ZERO_USER_PROFILE,
              uid: u.uid,
              email: u.email || '',
              name: u.displayName || 'Alquimista Novato',
              avatarUrl: u.photoURL || ZERO_USER_PROFILE.avatarUrl,
            };
            await setDoc(userRef, {
              uid: u.uid,
              email: u.email || '',
              displayName: u.displayName || user.name,
              photoURL: u.photoURL || '',
              level: 1,
              currentXp: 0,
              maxXp: 100,
              totalXp: 0,
              createdAt: new Date().toISOString(),
            });
          }
          // Accompany user right after login!
          onboardingModalOpen = true;
        } catch (err) {
          console.error('Failed syncing user doc from Firestore', err);
          showToast('Error al sincronizar con el servidor', 'error');
        }
      }
    });

    return () => unsubscribe();
  });

  const handleResetProgressToZero = async () => {
    user = {
      ...ZERO_USER_PROFILE,
      uid: currentUser?.uid,
      email: currentUser?.email || undefined,
      name: currentUser?.displayName || user.name || 'Alquimista Novato',
      avatarUrl: currentUser?.photoURL || user.avatarUrl,
    };

    habits = INITIAL_HABITS.map((h) => ({
      ...h,
      completed: false,
      failed: false,
      currentCount: 0,
      streak: 0,
    }));

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), {
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || user.name,
          photoURL: currentUser.photoURL || '',
          level: 1,
          currentXp: 0,
          maxXp: 100,
          totalXp: 0,
          quote: user.quote,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        console.error('Error resetting user state in Firestore', err);
        showToast('Error al reiniciar progreso', 'error');
      }
    }

    onboardingModalOpen = true;
    showStamp({ icon: 'auto_awesome', title: 'ALQUIMIA REINICIADA', subtitle: 'Nivel 1 · 0 XP' });
  };

  // Modals state
  let newHabitModalOpen = $state(false);
  let dailyShareModalOpen = $state(false);
  let assistantModalOpen = $state(false);
  let habitToEdit = $state<HabitCard | null>(null);
  let claimedBonusToday = $state(false);
  let attributeModalOpen = $state(false);
  let levelInfoModalOpen = $state(false);
  let helpModalOpen = $state(false);

  // Toast state
  type ToastItem = { id: number; message: string; type: 'error' | 'success' | 'warning' | 'info' | 'undo'; duration?: number; onUndo?: () => void };
  let toasts = $state<ToastItem[]>([]);
  let toastCounter = 0;

  const showToast = (message: string, type: ToastItem['type'] = 'info', duration = 4000, onUndo?: () => void) => {
    const id = ++toastCounter;
    toasts = [...toasts, { id, message, type, duration, onUndo }];
  };

  const removeToast = (id: number) => {
    toasts = toasts.filter((t) => t.id !== id);
  };

  // Transmutation stamp (celebración alquímica en el lenguaje del sistema)
  type StampPayload = { icon: string; title: string; subtitle: string; tone?: 'amber' | 'black' };
  let stamp = $state<StampPayload | null>(null);
  let stampTimer: ReturnType<typeof setTimeout> | undefined;

  const showStamp = (payload: StampPayload) => {
    stamp = payload;
    if (stampTimer) clearTimeout(stampTimer);
    stampTimer = setTimeout(() => {
      stamp = null;
    }, 1500);
  };

  // Noir Dark Mode State (1930s Sepia Film Reel Theme)
  let isNoirDarkMode = $state(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('transmute_noir_dark_mode') === 'true'
      : false
  );

  $effect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-noir', isNoirDarkMode);
      localStorage.setItem('transmute_noir_dark_mode', String(isNoirDarkMode));
    }
  });

  const handleToggleNoirDarkMode = () => {
    isNoirDarkMode = !isNoirDarkMode;
  };

  // Auto-Save to LocalStorage
  $effect(() => {
    saveUserProfileLocal(user);
  });

  $effect(() => {
    saveHabitsLocal(habits);
  });

  // Level Up Helper
  const checkLevelUp = (currentXp: number, maxXp: number, level: number) => {
    if (currentXp >= maxXp) {
      const newXp = currentXp - maxXp;
      const newLevel = level + 1;
      const newMaxXp = Math.round(maxXp * 1.25);

      showStamp({ icon: 'workspace_premium', title: 'NIVEL ' + newLevel, subtitle: '¡Subiste de nivel! +2 pts atributo', tone: 'black' });

      return {
        currentXp: newXp,
        maxXp: newMaxXp,
        level: newLevel,
        availablePoints: user.availablePoints + 2,
      };
    }
    return null;
  };

  const addXp = (amount: number) => {
    const updatedTotalXp = user.totalXp + amount;
    const updatedCurrentXp = user.currentXp + amount;

    const levelUpData = checkLevelUp(updatedCurrentXp, user.maxXp, user.level);

    let newUser: UserProfile;
    if (levelUpData) {
      newUser = {
        ...user,
        totalXp: updatedTotalXp,
        currentXp: levelUpData.currentXp,
        maxXp: levelUpData.maxXp,
        level: levelUpData.level,
        availablePoints: levelUpData.availablePoints,
      };
    } else {
      newUser = {
        ...user,
        totalXp: updatedTotalXp,
        currentXp: updatedCurrentXp,
      };
    }
    user = newUser;
    enqueueSync({ entity: 'user', action: 'update', id: newUser.uid, payload: newUser });
  };

  // Habit Actions
  const handleToggleHabit = (id: string) => {
    const prev = habits.find((h) => h.id === id);
    habits = habits.map((h) => {
      if (h.id === id) {
        const nextCompleted = !h.completed;
        if (nextCompleted) {
          addXp(h.xpReward);
          showStamp({ icon: 'auto_awesome', title: 'TRANSMUTADO', subtitle: '+' + h.xpReward + ' XP' });
        }
        return {
          ...h,
          completed: nextCompleted,
          failed: false,
          streak: nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
        };
      }
      return h;
    });
    const changed = habits.find((h) => h.id === id);
    if (changed) enqueueSync({ entity: 'habit', action: 'update', id: changed.id, payload: changed });

    if (prev && !prev.completed) {
      showToast('Hábito completado', 'undo', 5000, () => {
        habits = habits.map((h) => h.id === id ? { ...h, completed: false, failed: false, streak: prev.streak } : h);
      });
    }
  };

  const handleFailHabit = (id: string) => {
    const prev = habits.find((h) => h.id === id);
    habits = habits.map((h) =>
      h.id === id
        ? { ...h, completed: false, failed: true, streak: 0 }
        : h
    );
    const changed = habits.find((h) => h.id === id);
    if (changed) enqueueSync({ entity: 'habit', action: 'update', id: changed.id, payload: changed });

    showToast('Fallo reconocido', 'undo', 5000, () => {
      habits = habits.map((h) => h.id === id ? { ...h, failed: false, streak: prev?.streak ?? 0 } : h);
    });
  };

  const handleRestoreHabit = (id: string) => {
    habits = habits.map((h) =>
      h.id === id ? { ...h, completed: false, failed: false } : h
    );
    const changed = habits.find((h) => h.id === id);
    if (changed) enqueueSync({ entity: 'habit', action: 'update', id: changed.id, payload: changed });
  };

  const handleIncrementCounter = (id: string) => {
    habits = habits.map((h) => {
      if (h.id === id) {
        const nextCount = h.currentCount + 1;
        const reachedTarget = nextCount >= h.targetCount;
        if (reachedTarget && h.currentCount < h.targetCount) {
          addXp(h.xpReward);
          showStamp({ icon: 'auto_awesome', title: 'TRANSMUTADO', subtitle: '+' + h.xpReward + ' XP' });
        }
        return {
          ...h,
          currentCount: nextCount,
          completed: reachedTarget,
          failed: false,
        };
      }
      return h;
    });
    const changed = habits.find((h) => h.id === id);
    if (changed) enqueueSync({ entity: 'habit', action: 'update', id: changed.id, payload: changed });
  };

  const handleSaveHabit = (
    habitData: Partial<HabitCard>,
    id?: string
  ) => {
    if (id) {
      habits = habits.map((h) => (h.id === id ? ({ ...h, ...habitData } as HabitCard) : h));
      const changed = habits.find((h) => h.id === id);
      if (changed) enqueueSync({ entity: 'habit', action: 'update', id: changed.id, payload: changed });
      showToast('Hábito actualizado', 'success');
    } else {
      const newHabit: HabitCard = {
        title: habitData.title || 'Nuevo Hábito',
        category: habitData.category || 'Diario',
        streak: 0,
        targetType: habitData.targetType || 'checkbox',
        currentCount: 0,
        targetCount: habitData.targetCount || 1,
        unit: habitData.unit || 'veces',
        completed: false,
        minLevel: habitData.minLevel || 1,
        xpReward: habitData.xpReward || 20,
        id: `habit-${Date.now()}`,
      };
      habits = [newHabit, ...habits];
      enqueueSync({ entity: 'habit', action: 'create', id: newHabit.id, payload: newHabit });
      showToast('Hábito creado', 'success');
    }
    habitToEdit = null;
  };

  const handleDeleteHabit = (id: string) => {
    const deleted = habits.find((h) => h.id === id);
    habits = habits.filter((h) => h.id !== id);
    enqueueSync({ entity: 'habit', action: 'delete', id, payload: null });
    if (habitToEdit?.id === id) {
      habitToEdit = null;
    }
    if (deleted) {
      showToast('Hábito eliminado', 'warning', 5000, () => {
        habits = [deleted, ...habits];
        enqueueSync({ entity: 'habit', action: 'create', id: deleted.id, payload: deleted });
      });
    }
  };

  const handleOpenEditHabit = (habit: HabitCard) => {
    habitToEdit = habit;
    newHabitModalOpen = true;
  };

  const handleOpenNewHabitModal = () => {
    habitToEdit = null;
    newHabitModalOpen = true;
  };

  const handleClaimDailyBonus = () => {
    addXp(25);
    claimedBonusToday = true;
    showStamp({ icon: 'workspace_premium', title: 'BONO RECLAMADO', subtitle: '+25 XP' });
  };

  // Profile Actions
  const handleAllocatePoint = (attr: 'strength' | 'focus' | 'vitality') => {
    if (user.availablePoints <= 0) return;
    user = {
      ...user,
      availablePoints: user.availablePoints - 1,
      attributes: {
        ...user.attributes,
        [attr]: Math.min(100, user.attributes[attr] + 5),
      },
    };
  };

  const handleUpdateQuote = (quote: string) => {
    user = { ...user, quote };
  };
</script>

<div class="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col">
  <!-- Header -->
  <Header
    {user}
    {isOnline}
    onOpenLevelInfo={() => (levelInfoModalOpen = true)}
    onOpenAuthModal={() => (authModalOpen = true)}
    onOpenAssistant={() => (assistantModalOpen = true)}
    onOpenHelp={() => (helpModalOpen = true)}
    onToggleNoirDarkMode={handleToggleNoirDarkMode}
  />

  <!-- Main View Area -->
  <main class="flex-grow pt-20 pb-24 px-4 md:px-8 max-w-4xl mx-auto w-full">
    {#if activeTab === 'deck'}
      <DeckView
        {habits}
        userLevel={user.level}
        onToggleHabit={handleToggleHabit}
        onFailHabit={handleFailHabit}
        onRestoreHabit={handleRestoreHabit}
        onIncrementCounter={handleIncrementCounter}
        onOpenNewHabitModal={handleOpenNewHabitModal}
        onEditHabitRequest={handleOpenEditHabit}
        onDeleteHabit={handleDeleteHabit}
        onOpenDailyShare={() => (dailyShareModalOpen = true)}
      />
    {:else if activeTab === 'calendar'}
      <CalendarView
        {habits}
        userLevel={user.level}
      />
    {:else if activeTab === 'me'}
      <ProfileView
        {user}
        {habits}
        {isNoirDarkMode}
        onOpenAttributeModal={() => (attributeModalOpen = true)}
        onUpdateQuote={handleUpdateQuote}
        onAllocatePoint={handleAllocatePoint}
        onOpenOnboardingModal={() => (onboardingModalOpen = true)}
        onResetProgressToZero={handleResetProgressToZero}
        onToggleNoirDarkMode={handleToggleNoirDarkMode}
      />
    {/if}
  </main>

  <!-- Navigation Bar -->
  <BottomNav
    {activeTab}
    onChangeTab={(tab) => (activeTab = tab)}
  />

  <!-- Modals -->
  <OnboardingModal
    isOpen={onboardingModalOpen}
    userName={user.name}
    onClose={() => (onboardingModalOpen = false)}
    onChangeTab={(t) => (activeTab = t)}
    onResetToZero={handleResetProgressToZero}
  />
  <AuthModal
    isOpen={authModalOpen}
    {currentUser}
    onClose={() => (authModalOpen = false)}
  />

  <AttributeModal
    {user}
    isOpen={attributeModalOpen}
    onClose={() => (attributeModalOpen = false)}
    onAllocatePoint={handleAllocatePoint}
  />

  <NewHabitModal
    isOpen={newHabitModalOpen}
    {habitToEdit}
    onClose={() => {
      newHabitModalOpen = false;
      habitToEdit = null;
    }}
    onSaveHabit={handleSaveHabit}
    onDeleteHabit={handleDeleteHabit}
  />

  <DailyShareModal
    isOpen={dailyShareModalOpen}
    {habits}
    userLevel={user.level}
    userName={user.name}
    {claimedBonusToday}
    onClose={() => (dailyShareModalOpen = false)}
    onClaimBonus={handleClaimDailyBonus}
  />

  <AssistantModal
    isOpen={assistantModalOpen}
    onClose={() => (assistantModalOpen = false)}
    {user}
    {habits}
    onAddHabit={(h) => {
      habits = [h, ...habits];
    }}
    onToggleHabit={handleToggleHabit}
    onNavigateTab={(t) => (activeTab = t)}
  />

  <HelpModal
    isOpen={helpModalOpen}
    onClose={() => (helpModalOpen = false)}
  />

  <!-- Floating Action Buttons -->
  <div class="fixed bottom-20 right-4 z-40 flex flex-col gap-2">
    <button
      type="button"
      onclick={handleOpenNewHabitModal}
      class="bg-amber-300 text-black border-[3px] border-black p-3 rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-400 hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2 group font-mono font-black text-xs"
      title="Nuevo Hábito"
    >
      <span class="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
      <span class="hidden sm:inline-block uppercase tracking-tight pr-1 font-extrabold">Nuevo</span>
    </button>

    <button
      type="button"
      onclick={() => (assistantModalOpen = true)}
      class="bg-black text-white border-[3px] border-black p-3 rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2 group font-mono font-black text-xs"
      title="Asistente de Flujos AI"
    >
      <span class="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">auto_awesome</span>
      <span class="hidden sm:inline-block uppercase tracking-tight pr-1 font-extrabold">Asistente</span>
    </button>
  </div>

  {#if levelInfoModalOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs" in:overlayFade out:overlayFade>
      <div in:popIn out:popOut class="bg-white border-[4px] border-black p-6 w-full max-w-sm wobbly-border shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onclick={() => (levelInfoModalOpen = false)}
          class="absolute top-3 right-3 w-8 h-8 border-[2px] border-black bg-white flex items-center justify-center font-extrabold hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          ✕
        </button>
        <div class="text-center py-2">
          <div class="w-16 h-16 border-[3px] border-black bg-black text-white flex items-center justify-center font-headline text-3xl font-extrabold mx-auto mb-3 rotate-[-3deg]">
            {user.level}
          </div>
          <h3 class="font-headline text-2xl font-extrabold text-black">
            Nivel del Alquimista
          </h3>
          <p class="font-mono-label text-xs font-bold text-neutral-600 mt-1">
            {user.currentXp} / {user.maxXp} XP PARA EL SIGUIENTE NIVEL
          </p>
          <div class="w-full h-4 border-[2.5px] border-black bg-neutral-200 mt-4 overflow-hidden relative">
            <div
              class="h-full bg-black halftone transition-all duration-500"
              style="width: {Math.min(100, Math.round((user.currentXp / user.maxXp) * 100))}%;"
            ></div>
          </div>
          <div class="mt-4 p-3 border-[2px] border-black bg-neutral-50 text-left">
            <p class="font-mono-label text-[11px] font-bold text-neutral-700 leading-relaxed">
              <strong>Cada nivel</strong> te da <strong>2 puntos de atributo</strong> para asignar a Fuerza, Enfoque o Vitalidad.
              El XP requerido crece ×1.25 por nivel.
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if stamp}
    <CelebrationStamp {...stamp} />
  {/if}

  <!-- Toast notifications -->
  {#each toasts as toast (toast.id)}
    <Toast
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      onUndo={toast.onUndo}
      onClose={() => removeToast(toast.id)}
    />
  {/each}
</div>
