/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEW_APP_ID: string;
  readonly VITE_NEW_AI_AGENT_ID: string;
  readonly VITE_NEW_USER_ID: string;
  readonly VITE_NEW_USER_AUTH_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
