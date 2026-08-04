<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import CelebrationStamp from './components/CelebrationStamp.svelte';
  import Toast from './components/Toast.svelte';
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

  import { auth, onAuthStateChanged, db, doc, getDoc, setDoc, type User } from './lib/firebase';
  import {
    saveHabitsLocal,
    loadHabitsLocal,
    saveUserProfileLocal,
    loadUserProfileLocal,
    getDeletedHabitIds,
    markHabitDeleted,
    unmarkHabitDeleted,
    getClaimedBonusDate,
    setClaimedBonusDate,
    mergeClaimedBonusDate,
  } from './lib/storage';
  import { enqueueSync, subscribeSyncPending, subscribeSyncDropped } from './lib/sync';
  import { persistTodayHistory, todayKey, clearHistory } from './lib/habitHistory';
  import { getAuthToken } from './lib/authToken';
  import { mergeHabits, isUntouchedDefaults } from './lib/mergeHabits';
  import { popIn, popOut, overlayFade } from './lib/modalTransitions';

  // Modals are lazy-loaded on first open so heavy chunks (e.g. html-to-image
  // inside DailyShareModal) don't bloat the initial bundle. The component is
  // cached after the first import, so subsequent opens are instant.
  type ModalKey =
    | 'auth'
    | 'onboarding'
    | 'attribute'
    | 'newHabit'
    | 'dailyShare'
    | 'assistant'
    | 'help';
  const modalCtors = $state<Record<ModalKey, Component | null>>({
    auth: null,
    onboarding: null,
    attribute: null,
    newHabit: null,
    dailyShare: null,
    assistant: null,
    help: null,
  });

  const modalLoaders: Record<ModalKey, () => Promise<{ default: Component }>> = {
    auth: () => import('./components/AuthModal.svelte'),
    onboarding: () => import('./components/OnboardingModal.svelte'),
    attribute: () => import('./components/AttributeModal.svelte'),
    newHabit: () => import('./components/NewHabitModal.svelte'),
    dailyShare: () => import('./components/DailyShareModal.svelte'),
    assistant: () => import('./components/AssistantModal.svelte'),
    help: () => import('./components/HelpModal.svelte'),
  };

  const openModal = async (key: ModalKey, setOpen: (v: boolean) => void) => {
    try {
      if (!modalCtors[key]) {
        const mod = await modalLoaders[key]();
        modalCtors[key] = mod.default;
      }
      setOpen(true);
    } catch (err) {
      console.error(`Failed to load modal ${key}`, err);
      showToast('No se pudo abrir la ventana', 'error');
    }
  };

  const AuthModalCtor = $derived(modalCtors.auth);
  const OnboardingModalCtor = $derived(modalCtors.onboarding);
  const AttributeModalCtor = $derived(modalCtors.attribute);
  const NewHabitModalCtor = $derived(modalCtors.newHabit);
  const DailyShareModalCtor = $derived(modalCtors.dailyShare);
  const AssistantModalCtor = $derived(modalCtors.assistant);
  const HelpModalCtor = $derived(modalCtors.help);

  // Load initial state from LocalStorage
  const loadInitialState = () => {
    try {
      const savedUser = loadUserProfileLocal();
      const savedHabits = loadHabitsLocal();

      const normalizedHabits = (savedHabits && savedHabits.length > 0 ? savedHabits : INITIAL_HABITS).map(
        (h: HabitCard) => ({ ...h, targetType: h.targetType || 'checkbox' })
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

  // Firebase sync status: how many tasks are queued for delivery
  let syncPending = $state(0);
  // Initial hydration: skeleton loading until auth + Firestore settle
  let isHydrating = $state(true);
  let authResolved = $state(false);
  let minHydrationElapsed = $state(false);

  onMount(() => {
    const unsub = subscribeSyncPending((n) => {
      syncPending = n;
    });
    const unsubDropped = subscribeSyncDropped((_task, reason) => {
      showToast(reason, 'warning', 6000);
    });
    const t = setTimeout(() => {
      minHydrationElapsed = true;
    }, 800);
    return () => {
      clearTimeout(t);
      unsub();
      unsubDropped();
    };
  });

  // Persist today's completion snapshot for the weekly/monthly charts.
  // Runs on every habits change (cheap: single small entry, skipped when unchanged).
  $effect(() => {
    persistTodayHistory(habits, user.level);
  });

  $effect(() => {
    if (authResolved && minHydrationElapsed) {
      isHydrating = false;
    }
  });

  const syncStatus = $derived(
    !isOnline ? 'offline' : syncPending > 0 ? 'syncing' : 'synced'
  );

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
            // Multi-device: the bonus can only be claimed once per day. Adopt
            // the latest claim between this device and the cloud.
            if (mergeClaimedBonusDate(data.lastBonusClaim) === todayKey()) {
              claimedBonusToday = true;
            }
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
              lastBonusClaim: getClaimedBonusDate() || '',
              createdAt: new Date().toISOString(),
            });
          }
          // Accompany user right after login!
          void openModal('onboarding', (v) => (onboardingModalOpen = v));
          // Restore cloud habits after the profile doc is synced.
          void hydrateHabitsFromCloud(u.uid);
        } catch (err) {
          console.error('Failed syncing user doc from Firestore', err);
          showToast('Error al sincronizar con el servidor', 'error');
        }
      }
      authResolved = true;
    });

    return () => unsubscribe();
  });

  // Restore cloud habits on login (new device / reinstall / multi-device).
  const hydrateHabitsFromCloud = async (uid: string) => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/habits', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
      if (!res.ok) {
        console.warn('Hydration fetch failed', res.status);
        return;
      }
      const data = await res.json();
      const remote = (Array.isArray(data?.habits) ? data.habits : []) as HabitCard[];
      if (!remote.length) return;

      // Prune tombstones older than 60 days (they only guard against old copies).
      const now = Date.now();
      const tombstones = Object.fromEntries(
        Object.entries(getDeletedHabitIds()).filter(([, t]) => now - Date.parse(t) < 60 * 24 * 3600 * 1000)
      );

      // Fresh install: cloud copy is authoritative instead of union-merged.
      const merged = isUntouchedDefaults(habits)
        ? remote
        : mergeHabits(habits, remote, tombstones);

      const changed =
        merged.length !== habits.length ||
        merged.some((h, i) => h.id !== habits[i].id || h.updatedAt !== habits[i].updatedAt);
      if (changed) {
        habits = merged;
        showToast('Hábitos restaurados desde la nube', 'success');
      }
    } catch (err) {
      console.warn('Hydration failed', err);
    }
  };

  const handleResetProgressToZero = async () => {
    const previousHabits = habits;
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

    // A true restart: wipe calendar/streak history too.
    clearHistory();

    // Tombstone + cloud-delete the previous habits so they don't resurrect
    // from the cloud on the next hydration (multi-device consistency).
    for (const h of previousHabits) {
      markHabitDeleted(h.id);
      if (currentUser) enqueueSync({ entity: 'habit', action: 'delete', id: h.id, payload: null });
    }

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

    void openModal('onboarding', (v) => (onboardingModalOpen = v));
    showStamp({ icon: 'auto_awesome', title: 'ALQUIMIA REINICIADA', subtitle: 'Nivel 1 · 0 XP' });
  };

  // Modals state
  let newHabitModalOpen = $state(false);
  let dailyShareModalOpen = $state(false);
  let assistantModalOpen = $state(false);
  let habitToEdit = $state<HabitCard | null>(null);
  let claimedBonusToday = $state(
    typeof localStorage !== 'undefined' && getClaimedBonusDate() === todayKey()
  );
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
    let xp = Math.max(0, currentXp);
    let max = maxXp;
    let lvl = level;
    let points = 0;
    // Apply repeated level-ups (a large XP gain can cross several levels).
    // 20 is a generous safety cap against pathological inputs.
    for (let i = 0; i < 20 && xp >= max; i++) {
      xp -= max;
      max = Math.round(max * 1.25);
      lvl += 1;
      points += 2;
    }
    if (points === 0) return null;

    showStamp({
      icon: 'workspace_premium',
      title: 'NIVEL ' + lvl,
      subtitle: '¡Subiste de nivel! +' + points + ' pts atributo',
      tone: 'black',
    });

    return {
      currentXp: xp,
      maxXp: max,
      level: lvl,
      availablePoints: user.availablePoints + points,
    };
  };

  const addXp = (amount: number) => {
    const updatedTotalXp = Math.max(0, user.totalXp + amount);
    const updatedCurrentXp = Math.max(0, user.currentXp + amount);

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
          updatedAt: new Date().toISOString(),
        };
      }
      return h;
    });
    const changed = habits.find((h) => h.id === id);
    if (changed) enqueueSync({ entity: 'habit', action: 'update', id: changed.id, payload: changed });

    if (prev && !prev.completed) {
      const awardedXp = changed?.xpReward ?? 0;
      showToast('Hábito completado', 'undo', 5000, () => {
        habits = habits.map((h) =>
          h.id === id
            ? { ...h, completed: false, failed: false, streak: prev.streak, updatedAt: new Date().toISOString() }
            : h
        );
        const reverted = habits.find((h) => h.id === id);
        if (reverted) {
          // Refund the XP awarded on completion (clamped, and no level-down).
          addXp(-awardedXp);
          enqueueSync({ entity: 'habit', action: 'update', id, payload: reverted });
        }
      });
    }
  };

  const handleFailHabit = (id: string) => {
    const prev = habits.find((h) => h.id === id);
    habits = habits.map((h) =>
      h.id === id
        ? { ...h, completed: false, failed: true, streak: 0, updatedAt: new Date().toISOString() }
        : h
    );
    const changed = habits.find((h) => h.id === id);
    if (changed) enqueueSync({ entity: 'habit', action: 'update', id: changed.id, payload: changed });

    showToast('Fallo reconocido', 'undo', 5000, () => {
      habits = habits.map((h) =>
        h.id === id
          ? { ...h, failed: false, streak: prev?.streak ?? 0, updatedAt: new Date().toISOString() }
          : h
      );
      const reverted = habits.find((h) => h.id === id);
      if (reverted) enqueueSync({ entity: 'habit', action: 'update', id, payload: reverted });
    });
  };

  const handleRestoreHabit = (id: string) => {
    habits = habits.map((h) =>
      h.id === id
        ? { ...h, completed: false, failed: false, updatedAt: new Date().toISOString() }
        : h
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
          updatedAt: new Date().toISOString(),
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
      habits = habits.map((h) =>
        (h.id === id ? ({ ...h, ...habitData, updatedAt: new Date().toISOString() } as HabitCard) : h)
      );
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
        updatedAt: new Date().toISOString(),
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
    markHabitDeleted(id);
    enqueueSync({ entity: 'habit', action: 'delete', id, payload: null });
    if (habitToEdit?.id === id) {
      habitToEdit = null;
    }
    if (deleted) {
      showToast('Hábito eliminado', 'warning', 5000, () => {
        unmarkHabitDeleted(id);
        habits = [deleted, ...habits];
        enqueueSync({ entity: 'habit', action: 'create', id: deleted.id, payload: deleted });
      });
    }
  };

  const handleOpenEditHabit = async (habit: HabitCard) => {
    habitToEdit = habit;
    await openModal('newHabit', (v) => (newHabitModalOpen = v));
  };

  const handleOpenNewHabitModal = async () => {
    habitToEdit = null;
    await openModal('newHabit', (v) => (newHabitModalOpen = v));
  };

  const handleClaimDailyBonus = () => {
    addXp(25);
    claimedBonusToday = true;
    setClaimedBonusDate(todayKey());
    if (currentUser) {
      // Mirror the claim to the cloud so other devices respect the once-per-day rule.
      setDoc(doc(db, 'users', currentUser.uid), { lastBonusClaim: todayKey() }, { merge: true }).catch(
        (err) => console.error('Failed syncing daily bonus', err)
      );
    }
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
    onOpenAuthModal={() => void openModal('auth', (v) => (authModalOpen = v))}
    onOpenAssistant={() => void openModal('assistant', (v) => (assistantModalOpen = v))}
    onOpenHelp={() => void openModal('help', (v) => (helpModalOpen = v))}
    onToggleNoirDarkMode={handleToggleNoirDarkMode}
  />

  <!-- Main View Area -->
  <main class="flex-grow pt-20 pb-24 px-4 md:px-8 max-w-4xl mx-auto w-full">
    {#if activeTab === 'deck'}
      <DeckView
        {habits}
        userLevel={user.level}
        {isHydrating}
        {syncStatus}
        onToggleHabit={handleToggleHabit}
        onFailHabit={handleFailHabit}
        onRestoreHabit={handleRestoreHabit}
        onIncrementCounter={handleIncrementCounter}
        onOpenNewHabitModal={handleOpenNewHabitModal}
        onEditHabitRequest={handleOpenEditHabit}
        onDeleteHabit={handleDeleteHabit}
        onOpenDailyShare={() => void openModal('dailyShare', (v) => (dailyShareModalOpen = v))}
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
        onOpenAttributeModal={() => void openModal('attribute', (v) => (attributeModalOpen = v))}
        onUpdateQuote={handleUpdateQuote}
        onAllocatePoint={handleAllocatePoint}
        onOpenOnboardingModal={() => void openModal('onboarding', (v) => (onboardingModalOpen = v))}
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

  <!-- Modals (lazy-loaded on first open) -->
  {#if onboardingModalOpen && OnboardingModalCtor}
    <OnboardingModalCtor
      isOpen={onboardingModalOpen}
      userName={user.name}
      onClose={() => (onboardingModalOpen = false)}
      onChangeTab={(t) => (activeTab = t)}
      onResetToZero={handleResetProgressToZero}
    />
  {/if}

  {#if authModalOpen && AuthModalCtor}
    <AuthModalCtor
      isOpen={authModalOpen}
      {currentUser}
      onClose={() => (authModalOpen = false)}
    />
  {/if}

  {#if attributeModalOpen && AttributeModalCtor}
    <AttributeModalCtor
      {user}
      isOpen={attributeModalOpen}
      onClose={() => (attributeModalOpen = false)}
      onAllocatePoint={handleAllocatePoint}
    />
  {/if}

  {#if newHabitModalOpen && NewHabitModalCtor}
    <NewHabitModalCtor
      isOpen={newHabitModalOpen}
      {habitToEdit}
      onClose={() => {
        newHabitModalOpen = false;
        habitToEdit = null;
      }}
      onSaveHabit={handleSaveHabit}
      onDeleteHabit={handleDeleteHabit}
    />
  {/if}

  {#if dailyShareModalOpen && DailyShareModalCtor}
    <DailyShareModalCtor
      isOpen={dailyShareModalOpen}
      {habits}
      userLevel={user.level}
      userName={user.name}
      {claimedBonusToday}
      onClose={() => (dailyShareModalOpen = false)}
      onClaimBonus={handleClaimDailyBonus}
    />
  {/if}

  {#if assistantModalOpen && AssistantModalCtor}
    <AssistantModalCtor
      isOpen={assistantModalOpen}
      onClose={() => (assistantModalOpen = false)}
      {user}
      {habits}
      onAddHabit={(h) => {
        const stamped = { ...h, updatedAt: new Date().toISOString() } as HabitCard;
        habits = [stamped, ...habits];
        enqueueSync({ entity: 'habit', action: 'create', id: stamped.id, payload: stamped });
      }}
      onToggleHabit={handleToggleHabit}
      onNavigateTab={(t) => (activeTab = t)}
    />
  {/if}

  {#if helpModalOpen && HelpModalCtor}
    <HelpModalCtor
      isOpen={helpModalOpen}
      onClose={() => (helpModalOpen = false)}
    />
  {/if}

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
      onclick={() => void openModal('assistant', (v) => (assistantModalOpen = v))}
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
