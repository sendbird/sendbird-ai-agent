import { AdvancedFeatures } from '@/components/sections/AdvancedFeatures';
import { GettingStarted } from '@/components/sections/GettingStarted';
import { MessengerInstance } from '@/types';
import { loadMessengerSDK } from '@/utils/loadMessengerSDK';
import { useEffect, useRef } from 'react';

export const App = () => {
  const messengerRef = useRef<MessengerInstance | null>(null);

  useEffect(() => {
    const initializeMessenger = async () => {
      try {
        const loadMessenger = await loadMessengerSDK();
        const messengerInstance = await loadMessenger();
        messengerInstance.initialize({
          appId: import.meta.env.VITE_APP_ID,
          aiAgentId: import.meta.env.VITE_AI_AGENT_ID,
        });

        messengerRef.current = messengerInstance;

        messengerInstance.onLoad(() => {
          messengerInstance.open();
        });
      } catch (error) {
        console.error('Failed to initialize messenger:', error);
      }
    };

    initializeMessenger();
  }, []);

  const handleUpdateConfig = () => {
    messengerRef.current?.updateConfig({
      appId: import.meta.env.VITE_NEW_APP_ID,
      aiAgentId: import.meta.env.VITE_NEW_AI_AGENT_ID,
    });
  };

  const handleUpdateSession = () => {
    messengerRef.current?.updateUserSession({
      userId: import.meta.env.VITE_NEW_USER_ID,
      authToken: import.meta.env.VITE_NEW_USER_AUTH_TOKEN,
      onSessionTokenRequest: async () => import.meta.env.VITE_NEW_USER_AUTH_TOKEN,
    });
  };

  const handleUpdateLocale = () => {
    if (!messengerRef.current) return;

    messengerRef.current.updateMetadata({
      language: 'ko-KR',
      countryCode: 'KR',
    });
  };

  const handleUpdateMetadata = () => {
    if (!messengerRef.current) return;

    messengerRef.current.updateMetadata({
      message: {
        contextObject: {
          userPreference: 'technical',
          customerTier: 'premium',
        },
      },
    });
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <h1 className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-3xl font-bold tracking-tight text-gray-900">
          AI Agent Messenger Quick Start
        </h1>
      </header>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="w-2/3 bg-white shadow sm:rounded-lg p-6 space-y-6">
          <GettingStarted />
          <AdvancedFeatures
            onUpdateConfig={handleUpdateConfig}
            onUpdateSession={handleUpdateSession}
            onUpdateMetadata={handleUpdateMetadata}
            onUpdateLocale={handleUpdateLocale}
            onOpen={() => messengerRef.current?.open()}
            onClose={() => messengerRef.current?.close()}
          />
        </div>
      </main>
    </div>
  );
};
