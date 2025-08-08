import 'prismjs/themes/prism-tomorrow.css';
import { useEffect, useRef, useState } from 'react';

import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

import { CodeExamples } from './CodeExamples';
import { PlaygroundConfig } from './PlaygroundConfig';
import { AI_AGENT_ID, APP_ID, AUTH_TOKEN, CODE_EXAMPLES, USER_ID } from './constants';

function App() {
  // Core state
  const [activeTab, setActiveTab] = useState<'playground' | 'code'>('playground');
  const [config, setConfig] = useState({
    hasSession: false,
    language: 'en-US',
    context: null as any,
    enableRuntimeUpdate: false,
  });
  const [messengerKey, setMessengerKey] = useState(0);
  const messengerRef = useRef<any>(null);

  // Code examples state
  const [activeExample, setActiveExample] = useState<keyof typeof CODE_EXAMPLES>('basic');
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>({});

  // Helper functions
  const resetMessenger = () => setMessengerKey((prev) => prev + 1);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopyFeedback((prev) => ({ ...prev, [key]: false })), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const updateConfig = (updates: Partial<typeof config>) => {
    setConfig((prev) => ({ ...prev, ...updates }));

    // Handle runtime context updates
    if (updates.context && config.enableRuntimeUpdate && messengerRef.current) {
      messengerRef.current.patchContext(updates.context).catch(console.error);
    }
  };

  // User session info for messenger
  const userSessionInfo = config.hasSession
    ? {
        userId: USER_ID,
        authToken: AUTH_TOKEN,
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            resolve(AUTH_TOKEN);
          },
          onSessionClosed: () => console.log('Session closed'),
          onSessionError: (error: unknown) => console.error('Session error:', error),
          onSessionRefreshed: () => console.log('Session refreshed'),
        },
      }
    : undefined;

  // Handle syntax highlighting
  useEffect(() => {
    const loadPrism = async () => {
      if (typeof window !== 'undefined') {
        try {
          const Prism = (await import('prismjs')).default;
          await import('prismjs/components/prism-tsx' as any);
          Prism.highlightAll();
        } catch (error) {
          console.warn('Failed to load Prism.js:', error);
        }
      }
    };
    loadPrism();
  }, [activeTab, activeExample, config]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">React SDK Interactive Playground</h1>
              <p className="text-sm text-gray-600 mt-1">
                Learn how to integrate Sendbird AI Agent Messenger with React
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('playground')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'playground' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Interactive Playground
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'code' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Code Examples
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        {activeTab === 'playground' ? (
          <PlaygroundConfig
            config={config}
            onConfigChange={updateConfig}
            onReset={resetMessenger}
            messengerRef={messengerRef}
            copyFeedback={copyFeedback}
            onCopy={handleCopy}
          />
        ) : (
          <CodeExamples
            activeExample={activeExample}
            onExampleChange={setActiveExample}
            copyFeedback={copyFeedback}
            onCopy={handleCopy}
          />
        )}
      </main>

      {/* Messenger Component */}
      <FixedMessenger
        key={`messenger-${messengerKey}`}
        appId={APP_ID}
        aiAgentId={AI_AGENT_ID}
        userSessionInfo={userSessionInfo}
        context={config.context}
        language={config.language.split('-')[0]}
        countryCode={config.language.split('-')[1]}
      />
    </div>
  );
}

export default App;
