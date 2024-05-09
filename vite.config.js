import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: [
      {
        find: /^\$(.*)$/,
        replacement: resolve(__dirname, './src/$1'),
      },
    ]
  },
})
