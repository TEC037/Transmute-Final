// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import path from 'path';

export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '$components': path.resolve(__dirname, 'src/components'),
      '$lib': path.resolve(__dirname, 'src/lib')
    },
    conditions: ['browser']
  },
  // No need for import.meta.env.SSR definition here as ssr is disabled in test config

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.ts'],
  },
});
