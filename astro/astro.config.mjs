import * as path from 'path';
import * as url from 'url';

import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
import mdx from '@astrojs/mdx';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
console.log(__dirname);

// https://astro.build/config
export default defineConfig({
  site: 'https://chromeos.dev',
  integrations: [svelte(), mdx()],
  vite: {
    resolve: {
      alias: [
        {
          find: '$toolkit',
          replacement: path.join(
            __dirname,
            './node_modules/sass-toolkit/stylesheets/toolkit',
          ),
        },
        {
          find: '$breakpoint',
          replacement: path.join(
            __dirname,
            './node_modules/breakpoint-sass/stylesheets/breakpoint',
          ),
        },
      ],
    },
  },
});
