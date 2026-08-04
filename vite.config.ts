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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('svelte')) return 'vendor-svelte';
              return 'vendor';
            }
          },
        },
      },
      // The Firebase SDK is large by design; split into its own vendor chunk
      // so app updates don't re-download it, and acknowledge the size.
      chunkSizeWarningLimit: 700,
    },
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
