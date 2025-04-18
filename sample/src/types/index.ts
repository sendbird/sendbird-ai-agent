interface MessengerConfig {
  appId: string;
  aiAgentId: string;
  language?: string;
  countryCode?: string;
  context?: Record<string, string>;
}

interface UserSession {
  userId: string;
  authToken: string;
  onSessionTokenRequest: () => Promise<string>;
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
