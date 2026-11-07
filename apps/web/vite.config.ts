import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { contentValidationPlugin } from '../../scripts/content.mjs';
import { overviewPlugin } from '../../scripts/discovery.mjs';
import { staticPreviewPlugin } from '../../scripts/static-preview.mjs';
import { siteOrigin } from '../../scripts/site-output.mjs';

export default defineConfig({
  plugins: [
    react(),
    overviewPlugin(),
    staticPreviewPlugin(),
    contentValidationPlugin(),
  ],
  define: { __SITE_ORIGIN__: JSON.stringify(siteOrigin(process.env.SITE_URL)) },
  build: { target: 'es2022' },
});
