import type { AIAgentProps } from '@sendbird/ai-agent-messenger-react';

export interface AppConfig {
  opened: boolean;
  currentLanguage: string;
  hasSession: boolean;
  hasContext: boolean;
  messengerKey: number;
  appId: string;
  aiAgentId: string;
  customStringSet: Record<string, string> | null;
}

export function createCommonMessengerProps(
  appConfig: AppConfig,
  getStringSet: () => Record<string, string> | undefined,
): AIAgentProps {
  return {
    appId: appConfig.appId,
    aiAgentId: appConfig.aiAgentId,
    language: appConfig.currentLanguage,
    countryCode: getCountryCodeFromLanguage(appConfig.currentLanguage),
    stringSet: getStringSet(),
    context: appConfig.hasContext
      ? {
          userPreference: 'technical',
          customerTier: 'premium',
        }
      : undefined,
    userSessionInfo: appConfig.hasSession
      ? {
          userId: import.meta.env.VITE_NEW_USER_ID,
          authToken: import.meta.env.VITE_NEW_USER_AUTH_TOKEN,
          sessionHandler: {
            onSessionTokenRequired: async (resolve) => {
              resolve(import.meta.env.VITE_NEW_USER_AUTH_TOKEN);
            },
            onSessionClosed: () => {
              console.log('Session closed');
            },
            onSessionError: (error) => {
              console.error('Session error:', error);
            },
            onSessionRefreshed: () => {
              console.log('Session refreshed');
            },
          },
        }
      : undefined,
  };
}

function getCountryCodeFromLanguage(language: string): string {
  switch (language) {
    case 'ko-KR':
      return 'KR';
    case 'zh-CN':
      return 'CN';
    default:
      return 'US';
  }
}
