import { useState } from 'react'
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react'
import '@sendbird/ai-agent-messenger-react/index.css'
import './App.css'

// Configuration from live example
const APP_ID = 'E86A36B6-1C6D-4ED7-8C3B-4BC996C07A1C'
const AI_AGENT_ID = '4ebf8a55-6c08-4e78-aef5-2f67c4a7c1f1'

function App() {
  const [opened, setOpened] = useState(false)
  const [hasSession, setHasSession] = useState(false)
  const [hasContext, setHasContext] = useState(false)

  const userSessionInfo = hasSession ? {
    userId: 'sample_user_id',
    authToken: 'sample_auth_token',
    sessionHandler: {
      onSessionTokenRequired: async (resolve: (token: string) => void) => {
        // In a real application, fetch a new token from your server
        resolve('sample_auth_token');
      },
      onSessionClosed: () => {
        console.log('Session closed');
      },
      onSessionError: (error: any) => {
        console.error('Session error:', error);
      },
      onSessionRefreshed: () => {
        console.log('Session refreshed');
      },
    },
  } : undefined;

  const context = hasContext ? {
    userPreference: 'technical',
    customerTier: 'premium',
  } : undefined;

  return (
    <>
      <div className="container">
        <h1>Sendbird AI Agent React Sample</h1>
        <p className="description">
          This is a basic React application demonstrating how to integrate the Sendbird AI Agent Messenger.
        </p>
        
        <div className="controls">
          <button onClick={() => setOpened(!opened)}>
            {opened ? 'Close' : 'Open'} Messenger
          </button>
          <label>
            <input 
              type="checkbox" 
              checked={hasSession}
              onChange={(e) => setHasSession(e.target.checked)}
            />
            Use authenticated session
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={hasContext}
              onChange={(e) => setHasContext(e.target.checked)}
            />
            Include context
          </label>
        </div>

        <div className="info">
          <h3>How to use:</h3>
          <ul>
            <li>Click "Open Messenger" to open the AI agent chat</li>
            <li>Enable "Use authenticated session" to test with user authentication</li>
            <li>Enable "Include context" to provide additional context to the AI agent</li>
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
  )
}

export default App