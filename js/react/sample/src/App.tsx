import { useState } from 'react';

import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

const APP_ID = import.meta.env.VITE_NEW_APP_ID;
const AI_AGENT_ID = import.meta.env.VITE_NEW_AI_AGENT_ID;
const USER_ID = import.meta.env.VITE_NEW_USER_ID;
const AUTH_TOKEN = import.meta.env.VITE_NEW_USER_AUTH_TOKEN;

function App() {
  const [opened, setOpened] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [hasContext, setHasContext] = useState(false);

  const userSessionInfo = hasSession
    ? {
        userId: USER_ID,
        authToken: AUTH_TOKEN,
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            // In a real application, fetch a new token from your server
            resolve(AUTH_TOKEN);
          },
          onSessionClosed: () => {
            console.log('Session closed');
          },
          onSessionError: (error: unknown) => {
            console.error('Session error:', error);
          },
          onSessionRefreshed: () => {
            console.log('Session refreshed');
          },
        },
      }
    : undefined;

  const context = hasContext
    ? {
        userPreference: 'technical',
        customerTier: 'premium',
      }
    : undefined;

  return (
    <>
      <div className="max-w-2xl mx-auto p-5 text-center">
        <h1 className="text-5xl font-bold leading-tight mb-2 text-gray-900 dark:text-white">
          Sendbird AI Agent React Sample
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          This is a basic React application demonstrating how to integrate the Sendbird AI Agent Messenger.
        </p>

        <div className="flex flex-col items-center gap-4 mb-8">
          <button
            onClick={() => setOpened(!opened)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            {opened ? 'Close' : 'Open'} Messenger
          </button>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hasSession}
              onChange={(e) => setHasSession(e.target.checked)}
              className="rounded"
            />
            <span>Use authenticated session</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hasContext}
              onChange={(e) => setHasContext(e.target.checked)}
              className="rounded"
            />
            <span>Include context</span>
          </label>
        </div>

        <div className="text-left bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mt-0 mb-3">How to use:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <li>Click &quot;Open Messenger&quot; to open the AI agent chat</li>
            <li>Enable &quot;Use authenticated session&quot; to test with user authentication</li>
            <li>Enable &quot;Include context&quot; to provide additional context to the AI agent</li>
          </ul>
        </div>
      </div>

      <FixedMessenger
        appId={APP_ID}
        aiAgentId={AI_AGENT_ID}
        state={{
          opened,
          setOpened,
        }}
        userSessionInfo={userSessionInfo}
        context={context}
      />
    </>
  );
}

export default App;
