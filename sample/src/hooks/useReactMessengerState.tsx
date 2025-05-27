import type { AppConfig } from '@/utils/messengerProps';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export interface ReactMessengerState {
  appConfig: AppConfig;
  setAppConfig: (config: Partial<AppConfig>) => void;
  updateAppConfig: (updates: Partial<AppConfig>) => void;
  getStringSet: () => Record<string, string> | undefined;
  loadLanguageStringSet: (language: string) => Promise<void>;
}

type ReactMessengerContextType = ReactMessengerState;

const ReactMessengerContext = createContext<ReactMessengerContextType | undefined>(undefined);

export const useReactMessengerState = (): ReactMessengerContextType => {
  const context = useContext(ReactMessengerContext);
  if (!context) {
    throw new Error('useReactMessengerState must be used within a ReactMessengerProvider');
  }
  return context;
};

interface ReactMessengerProviderProps {
  children: ReactNode;
}

export const ReactMessengerProvider = ({ children }: ReactMessengerProviderProps) => {
  const [appConfig, setAppConfig] = useState<AppConfig>({
    opened: true,
    currentLanguage: 'en-US',
    hasSession: false,
    hasContext: false,
    messengerKey: 0,
    appId: import.meta.env.VITE_APP_ID,
    aiAgentId: import.meta.env.VITE_AI_AGENT_ID,
    customStringSet: null,
  });

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      setAppConfig((prev) => ({ ...prev, opened: false }));
    };
  }, []);

  const updateAppConfig = (updates: Partial<AppConfig>) => {
    setAppConfig((prev) => ({ ...prev, ...updates }));
  };

  const setAppConfigPartial = (config: Partial<AppConfig>) => {
    setAppConfig((prev) => ({ ...prev, ...config }));
  };

  const loadLanguageStringSet = async (language: string) => {
    try {
      let stringSet: Record<string, string> | null = null;

      switch (language) {
        case 'zh-CN':
          const cnModule = await import('@/constants/languages/cn');
          stringSet = cnModule.stringSet;
          break;
        case 'es-ES':
          // Spanish custom strings
          stringSet = {
            MESSAGE_INPUT__PLACE_HOLDER: '¡Pregúntame cualquier cosa!',
            CONVERSATION_LIST__HEADER_TITLE: 'Lista de conversaciones anteriores',
          };
          break;
        default:
          stringSet = null;
      }

      updateAppConfig({
        customStringSet: stringSet,
        currentLanguage: language,
        messengerKey: appConfig.messengerKey + 1,
      });
    } catch (error) {
      console.error('Failed to load language strings:', error);
    }
  };

  const getStringSet = (): Record<string, string> | undefined => {
    return appConfig.customStringSet || undefined;
  };

  const value: ReactMessengerContextType = {
    appConfig,
    setAppConfig: setAppConfigPartial,
    updateAppConfig,
    getStringSet,
    loadLanguageStringSet,
  };

  return <ReactMessengerContext.Provider value={value}>{children}</ReactMessengerContext.Provider>;
};
