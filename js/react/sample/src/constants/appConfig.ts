type CONFIG = {
  appId: string;
  aiAgentId: string;
  userId?: string;
  authToken?: string;
};

const DEFAULT_CONFIG: CONFIG = {
  appId: 'F7879BE3-A59C-4134-A04A-702A1E62A9C0',
  aiAgentId: '9ec48481-26d4-41b3-a3d7-68f20c0aeb1c',
  userId: 'aiagent-test-user',
  authToken: 'ee30a94f682cf6cd169e7254780e18368f3054fe',
};

export const APP_CONFIG: CONFIG = {
  appId: import.meta.env.VITE_NEW_APP_ID || DEFAULT_CONFIG.appId,
  aiAgentId: import.meta.env.VITE_NEW_AI_AGENT_ID || DEFAULT_CONFIG.aiAgentId,
  userId: import.meta.env.VITE_NEW_USER_ID || DEFAULT_CONFIG.userId,
  authToken: import.meta.env.VITE_NEW_USER_AUTH_TOKEN || DEFAULT_CONFIG.authToken,
};
