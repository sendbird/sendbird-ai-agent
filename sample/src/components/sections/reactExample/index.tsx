import { ReactMessengerProvider, useReactMessengerState } from '@/hooks/useReactMessengerState.tsx';

import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

import { ReactAdvancedFeatures } from './AdvancedFeatures';
import { ReactGettingStarted } from './GettingStarted';

const ReactExampleContent = () => {
  const { appConfig, updateAppConfig, getStringSet } = useReactMessengerState();

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold leading-6 text-gray-900">React (npm) Integration</h2>
        <p className="mb-6 mt-3 text-base text-gray-500">
          This example demonstrates how to integrate the AI Agent Messenger into your React application using the npm
          package. This method provides type safety, better tree-shaking, and seamless integration with your React build
          process.
        </p>
      </div>

      <ReactGettingStarted />
      <ReactAdvancedFeatures />

      {/* Live Demo */}
      <FixedMessenger
        key={`messenger-${appConfig.messengerKey}`}
        appId={appConfig.appId}
        aiAgentId={appConfig.aiAgentId}
        state={{
          opened: appConfig.opened,
          setOpened: (opened: boolean) => updateAppConfig({ opened }),
        }}
        language={appConfig.currentLanguage}
        countryCode={appConfig.currentLanguage === 'ko-KR' ? 'KR' : appConfig.currentLanguage === 'zh-CN' ? 'CN' : 'US'}
        stringSet={getStringSet()}
        context={
          appConfig.hasContext
            ? {
                userPreference: 'technical',
                customerTier: 'premium',
              }
            : undefined
        }
        userSessionInfo={
          appConfig.hasSession
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
            : undefined
        }
      />
    </div>
  );
};

export const ReactExample = () => {
  return (
    <ReactMessengerProvider>
      <ReactExampleContent />
    </ReactMessengerProvider>
  );
};
