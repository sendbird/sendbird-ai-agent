export interface MessengerConfig {
  appId: string;
  aiAgentId: string;
  language?: string;
  countryCode?: string;
  context?: Record<string, string>;
  stringSet?: Record<string, string>;
  customApiHost?: string;
  customWebSocketHost?: string;
}

interface UserSession {
  userId: string;
  authToken: string;
  onSessionTokenRequired: (resolve: (authToken: string) => void, reject: (error: Error) => void) => Promise<void>;
}

export interface MessengerInstance {
  initialize: (config: MessengerConfig) => void;
  open: () => void;
  close: () => void;
  onLoad: (callback: () => void) => void;
  updateConfig: (config: Partial<MessengerConfig>) => void;
  updateUserSession: (session: UserSession) => void;
  deauthenticate: () => void;
  destroy: () => void;
}
