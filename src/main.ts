import './index.css';
import App from './App.svelte';
import { mount } from 'svelte';
import { startRewardHandler } from './lib/rewardHandler';
import { startSyncLoop } from './lib/sync';
import { auth, onAuthStateChanged } from './lib/firebase';

const app = mount(App, {
  target: document.getElementById('root')!,
});

// Start reward handler for global reward events
startRewardHandler();

// Persist Firebase ID token to localStorage for server-side sync authentication.
// The server endpoint /api/sync is expected to verify this token (Authorization: Bearer <idToken>).
onAuthStateChanged(auth, async (user) => {
  try {
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  } catch (err) {
    console.warn('Failed to refresh ID token for sync auth', err);
    localStorage.removeItem('authToken');
  }
});

// Start the background sync loop to deliver offline queue to server
startSyncLoop();

export default app;
