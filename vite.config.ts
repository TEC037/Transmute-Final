@'
import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [svelte(), tailwindcss()],
});
'@ | Set-Content -Path "vite.config.ts" -Encoding utf8