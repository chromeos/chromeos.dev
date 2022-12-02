// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SANITY_STUDIO_PROJECT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
