import { stringSet as cnStringSet } from '@/constants/languages/cn';
import { MessengerConfig, MessengerInstance } from '@/types';
import { loadMessengerSDK } from '@/utils/loadMessengerSDK';
import { useEffect, useRef } from 'react';

export function useMessengerCore() {
  const messengerRef = useRef<MessengerInstance | null>(null);

  const initializeWithConfig = async (configOptions: Partial<MessengerConfig> = {}) => {
    try {
      messengerRef.current = null;

      const loadMessenger = await loadMessengerSDK();
      const messengerInstance = await loadMessenger();
      messengerInstance.initialize({
        appId: import.meta.env.VITE_APP_ID,
        aiAgentId: import.meta.env.VITE_AI_AGENT_ID,
        ...configOptions,
      });

      messengerRef.current = messengerInstance;
      messengerInstance.onLoad(() => {
        messengerInstance.open();
      });

      return messengerInstance;
    } catch (error) {
      console.error('Failed to initialize messenger:', error);
      return null;
    }
  };

  useEffect(() => {
    // Initialize messenger when component mounts
    initializeWithConfig();

    // Cleanup when component unmounts
    return () => {
      if (messengerRef.current) {
        messengerRef.current.destroy();
        messengerRef.current = null;
      }
    };
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
      onSessionTokenRequired: async (resolve) => resolve(import.meta.env.VITE_NEW_USER_AUTH_TOKEN),
    });
  };

  const updateLocale = async () => {
    await initializeWithConfig({
      language: 'ko-KR',
      countryCode: 'KR',
    });
  };

  const updateContext = async () => {
    await initializeWithConfig({
      context: {
        userPreference: 'technical',
        customerTier: 'premium',
      },
    });
  };

  const customizeSpanishStringSet = async () => {
    await initializeWithConfig({
      language: 'es-ES',
      stringSet: {
        MESSAGE_INPUT__PLACE_HOLDER: '¡Pregúntame cualquier cosa!',
        CONVERSATION_LIST__HEADER_TITLE: 'Lista de conversaciones anteriores',
      },
    });
  };

  const switchToChineseLanguage = async () => {
    await initializeWithConfig({
      language: 'zh-CN',
      stringSet: cnStringSet,
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
    updateContext,
    customizeSpanishStringSet,
    switchToChineseLanguage,
    open,
    close,
    deauthenticate,
    destroy,
  };
}
