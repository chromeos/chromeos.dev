// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SANITY_STUDIO_PROJECT: string;
  readonly SANITY_STUDIO_API_DATASET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
