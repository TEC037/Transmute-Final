import './index.css';
import App from './App.svelte';
import { mount } from 'svelte';
import { startSyncLoop } from './lib/sync';
import { auth, onAuthStateChanged } from './lib/firebase';
import { setAuthToken, clearAuthToken } from './lib/authToken';

const app = mount(App, {
  target: document.getElementById('root')!,
});

// Token management: keep Firebase ID token in memory and refresh periodically
let refreshIntervalHandle: number | null = null;
const REFRESH_INTERVAL_MS = 1000 * 60 * 40; // refresh every 40 minutes

onAuthStateChanged(auth, async (user) => {
  try {
    if (user) {
      const token = await user.getIdToken();
      setAuthToken(token);

      // Clear previous interval if any
      if (refreshIntervalHandle) {
        clearInterval(refreshIntervalHandle);
      }
      // Periodically force-refresh token
      refreshIntervalHandle = window.setInterval(async () => {
        try {
          if (auth.currentUser) {
            const refreshed = await auth.currentUser.getIdToken(true);
            setAuthToken(refreshed);
          }
        } catch (err) {
          console.warn('Failed to refresh ID token during interval', err);
          clearAuthToken();
        }
      }, REFRESH_INTERVAL_MS) as unknown as number;
    } else {
      clearAuthToken();
      if (refreshIntervalHandle) {
        clearInterval(refreshIntervalHandle);
        refreshIntervalHandle = null;
      }
    }
  } catch (err) {
    console.warn('Failed to refresh ID token for sync auth', err);
    clearAuthToken();
  }
});

// Start the background sync loop to deliver offline queue to server
startSyncLoop();

export default app;
