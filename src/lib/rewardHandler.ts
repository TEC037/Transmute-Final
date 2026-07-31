import { rewardEventStore, uiStore } from './stores';
import confetti from 'canvas-confetti';

// Lightweight handler that listens for reward events and triggers UI side-effects.
// Components can also subscribe to rewardEventStore to show toasts or animations.

let unsub: (() => void) | null = null;

export function startRewardHandler() {
  if (unsub) return;
  unsub = rewardEventStore.subscribe((ev) => {
    if (!ev) return;

    // Confetti intensity proportional to XP
    const particleCount = Math.min(220, 30 + ev.xp * 2);
    confetti({ particleCount, spread: 60, origin: { y: 0.6 } });

    // If level up, open level modal and confetti variation
    if (ev.levelUp) {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.4 }, colors: ['#000000', '#ffffff', '#ffd700'] });
      uiStore.update((s) => ({ ...s, modals: { ...s.modals, levelInfo: true } }));
    }

    // After short delay clear event (consumers should snapshot if needed)
    setTimeout(() => rewardEventStore.set(null), 1200);
  });
}

export function stopRewardHandler() {
  if (unsub) {
    unsub();
    unsub = null;
  }
}
