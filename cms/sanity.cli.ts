import { defineCliConfig } from 'sanity/cli';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import process from 'process';

dotenv.config();

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT,
    dataset: process.env.SANITY_STUDIO_API_DATASET,
  },

  vite(config) {
    return Object.assign(config, {
      resolve: {
        alias: {
          $lib: resolve(process.cwd(), 'lib'),
        },
      },
    });
  },
});
