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

// Token management: persist Firebase ID token to localStorage and refresh periodically
// The server endpoint /api/sync is expected to verify this token (Authorization: Bearer <idToken>).
let refreshIntervalHandle: number | null = null;
const REFRESH_INTERVAL_MS = 1000 * 60 * 40; // refresh every 40 minutes

onAuthStateChanged(auth, async (user) => {
  try {
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);

      // Clear previous interval if any
      if (refreshIntervalHandle) {
        clearInterval(refreshIntervalHandle);
      }
      // Periodically force-refresh token
      refreshIntervalHandle = window.setInterval(async () => {
        try {
          if (auth.currentUser) {
            const refreshed = await auth.currentUser.getIdToken(true);
            localStorage.setItem('authToken', refreshed);
          }
        } catch (err) {
          console.warn('Failed to refresh ID token during interval', err);
          localStorage.removeItem('authToken');
        }
      }, REFRESH_INTERVAL_MS) as unknown as number;
    } else {
      localStorage.removeItem('authToken');
      if (refreshIntervalHandle) {
        clearInterval(refreshIntervalHandle);
        refreshIntervalHandle = null;
      }
    }
  } catch (err) {
    console.warn('Failed to refresh ID token for sync auth', err);
    localStorage.removeItem('authToken');
  }
});

// Start the background sync loop to deliver offline queue to server
startSyncLoop();

export default app;
