import * as path from 'path';
import * as url from 'url';

import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
import mdx from '@astrojs/mdx';

import tsconfig from './tsconfig.json';

// Get the current directory
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
console.log(__dirname);

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
  integrations: [svelte(), mdx()],
  compressHTML: true,
  experimental: {
    middleware: true,
  },
  vite: {
    resolve: {
      alias: aliases,
    },
  },
});
