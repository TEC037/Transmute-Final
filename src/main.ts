import './index.css';
import App from './App.svelte';
import { mount } from 'svelte';
import { startRewardHandler } from './lib/rewardHandler';

const app = mount(App, {
  target: document.getElementById('root')!,
});

// Start reward handler for global reward events
startRewardHandler();

export default app;
