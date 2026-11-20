import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { contentValidationPlugin } from '../../scripts/content.mjs';
import { practicePlugin } from '../../scripts/practice.mjs';
import { readerPlugin } from '../../scripts/reader.mjs';
import { overviewPlugin } from '../../scripts/discovery.mjs';
import { staticPreviewPlugin } from '../../scripts/static-preview.mjs';
import { siteOrigin } from '../../scripts/site-output.mjs';

export default defineConfig({
  plugins: [
    react(),
    overviewPlugin(),
    readerPlugin(),
    practicePlugin(),
    staticPreviewPlugin(),
    contentValidationPlugin(),
  ],
  define: { __PSEUDO_LOCALIZATION__: process.env.JUVANGA_PSEUDO_LOCALE === '1', __SITE_ORIGIN__: JSON.stringify(siteOrigin(process.env.SITE_URL)) },
  build: { target: 'es2022' },
});
