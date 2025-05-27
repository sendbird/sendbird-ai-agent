import { ReactMessengerProvider, useReactMessengerState } from '@/hooks/useReactMessengerState.tsx';
import { createCommonMessengerProps } from '@/utils/messengerProps';

import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

import { AdvancedFeatures } from './AdvancedFeatures';
import { GettingStarted } from './GettingStarted';

const ReactExampleContent = () => {
  const { appConfig, updateAppConfig, getStringSet } = useReactMessengerState();
  const commonProps = createCommonMessengerProps(appConfig, getStringSet);

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold leading-6 text-gray-900">React (npm) Integration</h2>
        <p className="mb-6 mt-3 text-base text-gray-500">
          This example demonstrates how to integrate the AI Agent Messenger into your React application using the npm
          package. This method provides type safety, and seamless integration with your React build process.
        </p>
      </div>

      <GettingStarted />
      <AdvancedFeatures />

      {/* Live Demo */}
      <FixedMessenger
        key={`messenger-${appConfig.messengerKey}`}
        {...commonProps}
        state={{
          opened: appConfig.opened,
          setOpened: (opened: boolean) => updateAppConfig({ opened }),
        }}
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
