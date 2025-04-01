import { MessengerInstance } from '@/types';
import { loadMessengerSDK } from '@/utils/loadMessengerSDK';
import { useEffect, useRef } from 'react';

export function useMessengerCore() {
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

  const updateConfig = () => {
    messengerRef.current?.updateConfig({
      appId: import.meta.env.VITE_NEW_APP_ID,
      aiAgentId: import.meta.env.VITE_NEW_AI_AGENT_ID,
    });
  };

  const updateSession = () => {
    messengerRef.current?.updateUserSession({
      userId: import.meta.env.VITE_NEW_USER_ID,
      authToken: import.meta.env.VITE_NEW_USER_AUTH_TOKEN,
      onSessionTokenRequest: async () => import.meta.env.VITE_NEW_USER_AUTH_TOKEN,
    });
  };

  const updateLocale = () => {
    messengerRef.current?.updateMetadata({
      language: 'ko-KR',
      countryCode: 'KR',
    });
  };

  const updateMetadata = () => {
    messengerRef.current?.updateMetadata({
      message: {
        contextObject: {
          userPreference: 'technical',
          customerTier: 'premium',
        },
      },
    });
  };

  const open = () => messengerRef.current?.open();
  const close = () => messengerRef.current?.close();
  const deauthenticate = () => messengerRef.current?.deauthenticate();
  const destroy = () => messengerRef.current?.destroy();

  return {
    updateConfig,
    updateSession,
    updateLocale,
    updateMetadata,
    open,
    close,
    deauthenticate,
    destroy,
  };
}
