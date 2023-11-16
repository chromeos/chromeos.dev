import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import nodejs from '@astrojs/node';
import sanity from '@sanity/astro';

import 'dotenv/config';

import * as path from 'path';
import * as url from 'url';
import process from 'process';

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
  output: 'hybrid',
  adapter: nodejs({
    mode: 'middleware',
  }),
  integrations: [
    svelte(),
    sanity({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      token: process.env.SANITY_TOKEN,
      apiVersion: '2023-10-02',
      useCdn: process.env.NODE_ENV === 'production',
    }),
  ],
  compressHTML: true,
  vite: {
    resolve: {
      alias: aliases,
    },
  },
});
