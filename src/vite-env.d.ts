/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ENV_LOCAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
