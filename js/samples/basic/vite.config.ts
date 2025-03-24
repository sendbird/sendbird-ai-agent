import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/sendbird-ai-agent',
  plugins: [tailwindcss()],
  build: {
    target: 'esnext',
  },
});
