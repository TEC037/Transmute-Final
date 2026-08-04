import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Ensure Svelte components render in client mode for Vitest
  const defineEnv = { 'import.meta.env.SSR': false };

  return {
    define: defineEnv,
    base: './',
    plugins: [svelte(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '$components': path.resolve(__dirname, 'src/components'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Proxy API calls to the backend server (server.ts) during `vite` dev mode.
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };
});
