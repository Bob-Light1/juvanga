import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { contentValidationPlugin } from '../scripts/content.mjs';
import { overviewPlugin } from '../scripts/discovery.mjs';
import { practicePlugin } from '../scripts/practice.mjs';
import { readerPlugin } from '../scripts/reader.mjs';
import { staticPreviewPlugin } from '../scripts/static-preview.mjs';
import { siteOrigin } from '../scripts/site-output.mjs';

// Only the explicit test runner supplies this directory; production has no override.
const directory = process.env.JUVANGA_READER_FIXTURE_ROOT;
if (!directory) throw new Error('Run the reader fixture through npm run test:reader');
export default defineConfig({
  plugins: [react(), overviewPlugin({ publicDirectory: directory }), readerPlugin(directory), practicePlugin(directory), contentValidationPlugin(directory), staticPreviewPlugin()],
  define: { __PSEUDO_LOCALIZATION__: false, __SITE_ORIGIN__: JSON.stringify(siteOrigin(process.env.SITE_URL)) },
  build: { target: 'es2022' },
});
