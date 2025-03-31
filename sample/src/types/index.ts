interface MessengerConfig {
  appId: string;
  aiAgentId: string;
}

interface UserSession {
  userId: string;
  authToken: string;
  onSessionTokenRequest: () => Promise<string>;
}

interface MessengerMetadata {
  language?: string;
  countryCode?: string;
  message?: {
    contextObject?: Record<string, string>;
  };
}
export interface MessengerInstance {
  initialize: (config: MessengerConfig) => void;
  open: () => void;
  close: () => void;
  onLoad: (callback: () => void) => void;
  updateConfig: (config: MessengerConfig) => void;
  updateUserSession: (session: UserSession) => void;
  updateMetadata: (metadata: MessengerMetadata) => void;
  deauthenticate: () => void;
  destroy: () => void;
}
