const APP_ID = import.meta.env.VITE_NEW_APP_ID;
const AI_AGENT_ID = import.meta.env.VITE_NEW_AI_AGENT_ID;
const USER_ID = import.meta.env.VITE_NEW_USER_ID;
const AUTH_TOKEN = import.meta.env.VITE_NEW_USER_AUTH_TOKEN;

// Language options
export const LANGUAGES = [
  { code: 'en-US', label: 'English', countryCode: 'US' },
  { code: 'ko-KR', label: '한국어', countryCode: 'KR' },
  { code: 'ja-JP', label: '日本語', countryCode: 'JP' },
  { code: 'es-ES', label: 'Español', countryCode: 'ES' },
  { code: 'fr-FR', label: 'Français', countryCode: 'FR' },
];

// Context presets
export const CONTEXT_PRESETS = [
  { label: 'No Context', value: null },
  {
    label: 'Technical User',
    value: { userPreference: 'technical', customerTier: 'premium' },
  },
  {
    label: 'Business User',
    value: { userPreference: 'business', customerTier: 'enterprise' },
  },
  {
    label: 'Support Request',
    value: { userType: 'customer', issueType: 'technical_support', priority: 'high' },
  },
];

// Code examples for developers
export const CODE_EXAMPLES = {
  basic: `// Basic initialization
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  return (
    <FixedMessenger
      appId="${APP_ID}"
      aiAgentId="${AI_AGENT_ID}"
    />
  );
}`,
  authenticated: `// With authenticated user session
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  const userSessionInfo = {
    userId: "${USER_ID}",
    authToken: "${AUTH_TOKEN}",
    sessionHandler: {
      onSessionTokenRequired: async (resolve) => {
        // Refresh token logic here
        resolve(newAuthToken);
      }
    }
  };

  return (
    <FixedMessenger
      appId="${APP_ID}"
      aiAgentId="${AI_AGENT_ID}"
      userSessionInfo={userSessionInfo}
    />
  );
}`,
  context: `// With context configuration
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  const context = {
    userType: "premium",
    department: "engineering",
    customerId: "12345"
  };

  return (
    <FixedMessenger
      appId="${APP_ID}"
      aiAgentId="${AI_AGENT_ID}"
      context={context}
    />
  );
}`,
  runtime: `// Runtime context updates using ref
import { useRef } from 'react';
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  const messenger = useRef(null);

  const updateContext = async () => {
    if (messenger.current) {
      await messenger.current.patchContext({
        newData: 'updated value'
      });
    }
  };

  return (
    <>
      <button onClick={updateContext}>Update Context</button>
      <FixedMessenger
        ref={messenger}
        appId="${APP_ID}"
        aiAgentId="${AI_AGENT_ID}"
      />
    </>
  );
}`,
  localization: `// Multi-language support
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  const [language, setLanguage] = useState('en-US');
  
  return (
    <>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="en-US">English</option>
        <option value="ko-KR">한국어</option>
        <option value="ja-JP">日本語</option>
      </select>
      
      <FixedMessenger
        key={language} // Reset on language change
        appId="${APP_ID}"
        aiAgentId="${AI_AGENT_ID}"
        language={language}
      />
    </>
  );
}`,
};

export { APP_ID, AI_AGENT_ID, USER_ID, AUTH_TOKEN };
