import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { contentValidationPlugin } from '../../scripts/content.mjs';

export default defineConfig({
  plugins: [
    react(),
    contentValidationPlugin(),
  ],
  build: { target: 'es2022' },
});
