import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import nodejs from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import virtual from '@rollup/plugin-virtual';
import AstroPWA from '@vite-pwa/astro';
import manifest from './src/manifest.json';
import 'dotenv/config';
import * as path from 'path';
import * as url from 'url';
import tsconfig from './tsconfig.json';

// Get the current directory
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Get the aliases from tsconfig
const aliases = Object.entries(tsconfig.compilerOptions.paths).map(
  ([key, value]) => ({
    find: key.replace(/\/\*$/, ''),
    replacement: path.join(__dirname, value[0]).replace(/\/\*$/, ''),
  }),
);

// Add custom aliases
aliases.push({
  find: '$toolkit',
  replacement: path.join(
    __dirname,
    './node_modules/sass-toolkit/stylesheets/toolkit',
  ),
});
aliases.push({
  find: '$breakpoint',
  replacement: path.join(
    __dirname,
    './node_modules/breakpoint-sass/stylesheets/breakpoint',
  ),
});

// https://astro.build/config
export default defineConfig({
  site: 'https://chromeos.dev',
  output: 'hybrid',
  adapter: nodejs({
    mode: 'middleware',
  }),
  integrations: [
    svelte(),
    sitemap(),
    // eslint-disable-next-line new-cap
    AstroPWA({
      injectRegister: false,
      manifest,
      srcDir: './src',
      filename: 'sw.js',
      strategies: 'injectManifest',
      injectManifest: {
        globPatterns: [
          '_astro/**/*.css',
          '_astro/Offline*.js',
          'pagefind/**/*',
          'images/icons/**/*',
          'offline/index.html',
        ],
      },
    }),
  ],
  compressHTML: true,
  vite: {
    plugins: [
      virtual({
        'virtual:search': '',
      }),
    ],
    resolve: {
      alias: aliases,
    },
  },
});
