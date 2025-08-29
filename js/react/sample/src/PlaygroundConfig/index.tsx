import { useRef, useState } from 'react';

import { FixedMessenger, MessengerSessionRef, ManualSessionInfo, AnonymousSessionInfo } from '@sendbird/ai-agent-messenger-react';

import { LayoutWrapper } from '../LayoutWrapper';
import { APP_CONFIG } from '../constants/appConfig';
import { Config, DEFAULT_PLAYGROUND_CONFIG } from '../types';
import { CodePreview } from './CodePreview';
import { ConfigurationSection } from './ConfigurationSection';
import { RuntimeUpdatesLog } from './RuntimeUpdatesLog';
import { usePlaygroundState } from './usePlaygroundState';

export function PlaygroundConfig() {
  const [playgroundConfig, setPlaygroundConfig] = useState<Config>(DEFAULT_PLAYGROUND_CONFIG);
  const messengerRef = useRef<MessengerSessionRef | null>(null);

  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>({});

  const updatePlaygroundConfig = (updates: Partial<Config>) => {
    setPlaygroundConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopyFeedback((prev) => ({ ...prev, [key]: false })), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const userSessionInfo = playgroundConfig.hasSession
    ? new ManualSessionInfo({
        userId: APP_CONFIG.userId || 'default-user',
        authToken: APP_CONFIG.authToken || 'default-token',
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            resolve(APP_CONFIG.authToken || 'default-token');
          },
          onSessionClosed: () => console.log('Session closed'),
          onSessionError: (error: unknown) => console.error('Session error:', error),
          onSessionRefreshed: () => console.log('Session refreshed'),
        },
      })
    : new AnonymousSessionInfo();

  const { state, handleConfigUpdate, handleContextChange, handleReset } = usePlaygroundState({
    config: playgroundConfig,
    onConfigChange: updatePlaygroundConfig,
    messengerRef,
  });

  const leftPanel = (
    <>
      <ConfigurationSection
        config={playgroundConfig}
        state={state}
        handleConfigUpdate={handleConfigUpdate}
        handleContextChange={handleContextChange}
        handleReset={handleReset}
      />
      <RuntimeUpdatesLog runtimeUpdates={state.runtimeUpdates} />
    </>
  );

  const rightPanel = <CodePreview config={playgroundConfig} copyFeedback={copyFeedback} onCopy={handleCopy} />;

  return (
    <>
      <LayoutWrapper leftPanel={leftPanel} rightPanel={rightPanel} />

      <FixedMessenger
        ref={messengerRef}
        appId={APP_CONFIG.appId}
        aiAgentId={APP_CONFIG.aiAgentId}
        userSessionInfo={userSessionInfo}
        context={playgroundConfig.context || undefined}
        language={playgroundConfig.language.split('-')[0]}
        countryCode={playgroundConfig.language.split('-')[1]}
      />
    </>
  );
}
