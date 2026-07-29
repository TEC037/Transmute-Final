<script lang="ts">
  import confetti from 'canvas-confetti';
  import {
    INITIAL_USER_PROFILE,
    ZERO_USER_PROFILE,
    INITIAL_HABITS,
    INITIAL_ALBUM_CARDS,
    INITIAL_SHOP_ITEMS,
  } from './data/initialData';
  import type { HabitCard, AlbumCard, UserProfile, ShopItem } from './types';
  import Header from './components/Header.svelte';
  import BottomNav, { type TabType } from './components/BottomNav.svelte';
  import DeckView from './components/DeckView.svelte';
  import CollectionView from './components/CollectionView.svelte';
  import ShopView from './components/ShopView.svelte';
  import ProfileView from './components/ProfileView.svelte';
  import ImageGeneratorView from './components/ImageGeneratorView.svelte';
  import AuthModal from './components/AuthModal.svelte';
  import OnboardingModal from './components/OnboardingModal.svelte';
  import BoosterPackModal from './components/BoosterPackModal.svelte';
  import CardDetailModal from './components/CardDetailModal.svelte';
  import AttributeModal from './components/AttributeModal.svelte';
  import NewHabitModal from './components/NewHabitModal.svelte';
  import DailySummaryModal from './components/DailySummaryModal.svelte';

  import { auth, onAuthStateChanged, db, doc, getDoc, setDoc, updateDoc, type User } from './lib/firebase';

  // Load from LocalStorage or Fallback
  const loadInitialState = () => {
    try {
      const savedUser = localStorage.getItem('transmute_user');
      const savedHabits = localStorage.getItem('transmute_habits');
      const savedCards = localStorage.getItem('transmute_cards');

      const rawHabits = savedHabits ? JSON.parse(savedHabits) : INITIAL_HABITS;
      const normalizedHabits = rawHabits.map((h: HabitCard) => ({
        ...h,
        targetType: 'checkbox',
      }));

      return {
        user: savedUser ? JSON.parse(savedUser) : INITIAL_USER_PROFILE,
        habits: normalizedHabits,
        cards: savedCards ? JSON.parse(savedCards) : INITIAL_ALBUM_CARDS,
      };
    } catch (e) {
      console.error('Failed loading state from localStorage', e);
      return {
        user: INITIAL_USER_PROFILE,
        habits: INITIAL_HABITS,
        cards: INITIAL_ALBUM_CARDS,
      };
    }
  };

  const initial = loadInitialState();

  let activeTab = $state<TabType>('deck');
  let user = $state<UserProfile>(initial.user);
  let habits = $state<HabitCard[]>(initial.habits);
  let cards = $state<AlbumCard[]>(initial.cards);
  let shopItems = $state<ShopItem[]>(INITIAL_SHOP_ITEMS);

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
              customApiKey: data.customApiKey || user.customApiKey || '',
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
      customApiKey: user.customApiKey || '',
    };

    habits = INITIAL_HABITS.map((h) => ({
      ...h,
      completed: false,
      currentCount: 0,
      streak: 0,
    }));

    cards = INITIAL_ALBUM_CARDS;

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
      }
    }

    onboardingModalOpen = true;
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  const handleSaveApiKey = async (newKey: string) => {
    user = { ...user, customApiKey: newKey };
    if (currentUser) {
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          customApiKey: newKey,
        });
      } catch (e) {
        console.error('Failed updating API key in Firestore', e);
      }
    }
  };

  const handleTransmuteToCard = (imageUrl: string, title: string) => {
    const newCard: AlbumCard = {
      id: `card-ai-${Date.now()}`,
      title,
      category: 'alchemy',
      rarity: 'legendary',
      icon: 'auto_awesome',
      imageUrl,
      status: 'unlocked',
      levelReq: 1,
      maxLevel: 5,
      currentLevel: 1,
      description: 'Ilustración transmutada con IA Gemini e Imagen 3.',
      lore: 'Creada por el Alquimista a partir de los pigmentos primordiales de la IA.',
      slotNumber: cards.length + 1,
    };

    cards = [newCard, ...cards];
    activeTab = 'collection';
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  // Modals state
  let boosterModalOpen = $state(false);
  let newHabitModalOpen = $state(false);
  let dailySummaryModalOpen = $state(false);
  let habitToEdit = $state<HabitCard | null>(null);
  let claimedBonusToday = $state(false);
  let attributeModalOpen = $state(false);
  let levelInfoModalOpen = $state(false);
  let selectedCardForModal = $state<AlbumCard | null>(null);

  // Auto-Save to LocalStorage
  $effect(() => {
    try {
      localStorage.setItem('transmute_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  });

  $effect(() => {
    try {
      localStorage.setItem('transmute_habits', JSON.stringify(habits));
    } catch (e) {
      console.error(e);
    }
  });

  $effect(() => {
    try {
      localStorage.setItem('transmute_cards', JSON.stringify(cards));
    } catch (e) {
      console.error(e);
    }
  });

  // Level Up Helper
  const checkLevelUp = (currentXp: number, maxXp: number, level: number) => {
    if (currentXp >= maxXp) {
      const newXp = currentXp - maxXp;
      const newLevel = level + 1;
      const newMaxXp = Math.round(maxXp * 1.25);
      
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.4 },
        colors: ['#000000', '#ffffff', '#555555'],
      });

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

    if (levelUpData) {
      user = {
        ...user,
        totalXp: updatedTotalXp,
        currentXp: levelUpData.currentXp,
        maxXp: levelUpData.maxXp,
        level: levelUpData.level,
        availablePoints: levelUpData.availablePoints,
      };
    } else {
      user = {
        ...user,
        totalXp: updatedTotalXp,
        currentXp: updatedCurrentXp,
      };
    }
  };

  // Habit Actions
  const handleToggleHabit = (id: string) => {
    habits = habits.map((h) => {
      if (h.id === id) {
        const nextCompleted = !h.completed;
        if (nextCompleted) {
          addXp(h.xpReward);
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.8 },
          });
        }
        return {
          ...h,
          completed: nextCompleted,
          streak: nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
        };
      }
      return h;
    });
  };

  const handleIncrementCounter = (id: string) => {
    habits = habits.map((h) => {
      if (h.id === id) {
        const nextCount = h.currentCount + 1;
        const reachedTarget = nextCount >= h.targetCount;
        if (reachedTarget && h.currentCount < h.targetCount) {
          addXp(h.xpReward);
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
          });
        }
        return {
          ...h,
          currentCount: nextCount,
          completed: reachedTarget,
        };
      }
      return h;
    });
  };

  const handleSaveHabit = (
    habitData: Partial<HabitCard>,
    id?: string
  ) => {
    if (id) {
      habits = habits.map((h) => (h.id === id ? ({ ...h, ...habitData } as HabitCard) : h));
    } else {
      const newHabit: HabitCard = {
        title: habitData.title || 'Nuevo Hábito',
        category: habitData.category || 'Diario',
        icon: habitData.icon || 'fitness_center',
        streak: 0,
        targetType: habitData.targetType || 'checkbox',
        currentCount: 0,
        targetCount: habitData.targetCount || 1,
        unit: habitData.unit || 'veces',
        completed: false,
        minLevel: habitData.minLevel || 1,
        xpReward: habitData.xpReward || 20,
        tags: habitData.tags || ['General'],
        id: `habit-${Date.now()}`,
      };
      habits = [newHabit, ...habits];
    }
    habitToEdit = null;
  };

  const handleDeleteHabit = (id: string) => {
    habits = habits.filter((h) => h.id !== id);
    if (habitToEdit?.id === id) {
      habitToEdit = null;
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
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  // Card Actions
  const handleGrantCards = (grantedCards: AlbumCard[]) => {
    cards = cards.map((c) => {
      const match = grantedCards.find((gc) => gc.id === c.id);
      if (match) {
        return {
          ...c,
          status: 'unlocked',
          currentLevel: Math.min(c.maxLevel, Math.max(1, c.currentLevel + 1)),
        };
      }
      return c;
    });
  };

  const handleUpgradeCard = (cardId: string) => {
    cards = cards.map((c) => {
      if (c.id === cardId && c.currentLevel < c.maxLevel) {
        return {
          ...c,
          currentLevel: c.currentLevel + 1,
        };
      }
      return c;
    });

    if (selectedCardForModal && selectedCardForModal.id === cardId) {
      selectedCardForModal = {
        ...selectedCardForModal,
        currentLevel: Math.min(
          selectedCardForModal.maxLevel,
          selectedCardForModal.currentLevel + 1
        ),
      };
    }
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

  const handleToggleBuff = (buffId: string) => {
    user = {
      ...user,
      activeBuffs: user.activeBuffs.map((b) =>
        b.id === buffId ? { ...b, active: !b.active } : b
      ),
    };
  };

  const handleUpdateQuote = (quote: string) => {
    user = { ...user, quote };
  };

  // Shop Action
  const handleBuyShopItem = (item: ShopItem) => {
    if (user.currentXp < item.priceXp) return;

    user = {
      ...user,
      currentXp: user.currentXp - item.priceXp,
    };

    if (item.id === 'booster-vintage' || item.id === 'booster-gold' || item.id.startsWith('booster-')) {
      boosterModalOpen = true;
    } else if (item.id === 'potion-focus' || item.id.includes('caffeine')) {
      handleToggleBuff('caffeine');
    } else if (item.id === 'potion-str' || item.id.includes('shield')) {
      handleToggleBuff('guard');
    }
  };
</script>

<div class="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-body">
  <!-- Header -->
  <Header
    {user}
    {currentUser}
    onOpenLevelInfo={() => (levelInfoModalOpen = true)}
    onOpenAuthModal={() => (authModalOpen = true)}
  />

  <!-- Main View Area -->
  <main class="flex-grow pt-20 pb-24 px-4 md:px-8 max-w-4xl mx-auto w-full">
    {#if activeTab === 'deck'}
      <DeckView
        {habits}
        userLevel={user.level}
        onToggleHabit={handleToggleHabit}
        onIncrementCounter={handleIncrementCounter}
        onOpenNewHabitModal={handleOpenNewHabitModal}
        onEditHabitRequest={handleOpenEditHabit}
        onDeleteHabit={handleDeleteHabit}
        onOpenDailySummary={() => (dailySummaryModalOpen = true)}
      />
    {:else if activeTab === 'collection'}
      <CollectionView
        {cards}
        onSelectCard={(c) => (selectedCardForModal = c)}
        onOpenBoosterPackModal={() => (boosterModalOpen = true)}
      />
    {:else if activeTab === 'studio'}
      <ImageGeneratorView
        {currentUser}
        customApiKey={user.customApiKey || ''}
        onOpenAuthModal={() => (authModalOpen = true)}
        onTransmuteToCard={handleTransmuteToCard}
      />
    {:else if activeTab === 'shop'}
      <ShopView
        {user}
        items={shopItems}
        onBuyItem={handleBuyShopItem}
      />
    {:else if activeTab === 'me'}
      <ProfileView
        {user}
        onOpenAttributeModal={() => (attributeModalOpen = true)}
        onToggleBuff={handleToggleBuff}
        onUpdateQuote={handleUpdateQuote}
        onOpenOnboardingModal={() => (onboardingModalOpen = true)}
        onResetProgressToZero={handleResetProgressToZero}
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
    customApiKey={user.customApiKey || ''}
    onClose={() => (authModalOpen = false)}
    onSaveApiKey={handleSaveApiKey}
  />
  <BoosterPackModal
    isOpen={boosterModalOpen}
    onClose={() => (boosterModalOpen = false)}
    onGrantCards={handleGrantCards}
    availableCards={cards}
  />

  <CardDetailModal
    card={selectedCardForModal}
    isOpen={!!selectedCardForModal}
    onClose={() => (selectedCardForModal = null)}
    onUpgradeCard={handleUpgradeCard}
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

  <DailySummaryModal
    isOpen={dailySummaryModalOpen}
    {habits}
    userLevel={user.level}
    {claimedBonusToday}
    onClose={() => (dailySummaryModalOpen = false)}
    onClaimBonus={handleClaimDailyBonus}
  />

  {#if levelInfoModalOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div class="bg-white border-[4px] border-black p-6 w-full max-w-sm wobbly-border shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative">
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
        </div>
      </div>
    </div>
  {/if}
</div>
