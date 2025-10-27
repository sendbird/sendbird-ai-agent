// Global type definitions
declare global {
  interface Window {
    ENV?: {
      NEW_APP_ID?: string;
      NEW_AI_AGENT_ID?: string;
      NEW_USER_ID?: string;
      NEW_USER_AUTH_TOKEN?: string;
    };
    Prism?: {
      highlightAll: () => void;
      highlightElement: (element: Element) => void;
    };
  }
}

export interface MessengerInitConfig {
  appId: string;
  aiAgentId: string;
  language?: string;
  countryCode?: string;
  context?: Record<string, string>;
}

export interface Config {
  hasSession: boolean;
  language: string;
  context: Record<string, string> | null;
  enableRuntimeUpdate: boolean;
}

export type ConfigKey = keyof Pick<Config, 'hasSession' | 'language' | 'enableRuntimeUpdate'>;

export const DEFAULT_PLAYGROUND_CONFIG: Config = {
  hasSession: false,
  language: 'en-US',
  context: null,
  enableRuntimeUpdate: false,
};

export interface AppState extends Config {
  activeTab: 'playground' | 'code';
  activeExample: string;
  messenger: any;
  contextPreset: number;
  useCustomContext: boolean;
  customContext: string;
  runtimeUpdates: Array<{ time: string; context: Record<string, string> | null }>;
  copyFeedback: { [key: string]: boolean };
}
