import { APP_CONFIG } from './appConfig';

export interface CodeGenerationParams {
  hasSession: boolean;
  language: string;
  context: Record<string, string> | null;
}

export const generateCode = (params: CodeGenerationParams): string => {
  const { hasSession, context, language } = params;

  const userSessionSection = hasSession
    ? `
      userSessionInfo={{
        userId: "${APP_CONFIG.userId}",
        authToken: "${APP_CONFIG.authToken}",
        sessionHandler: {
          onSessionTokenRequired: async (resolve) => {
            resolve("${APP_CONFIG.authToken}");
          },
          onSessionClosed: () => {
            console.log('Session closed');
          },
          onSessionError: (error) => {
            console.error('Session error:', error);
          },
          onSessionRefreshed: () => {
            console.log('Session refreshed');
          }
        }
      }}`
    : '';

  const contextSection = context
    ? `
      context={${JSON.stringify(context, null, 8).replace(/\n/g, '\n      ')}}`
    : '';

  const languageSection =
    language !== 'en-US'
      ? `
      language="${language.split('-')[0]}"
      countryCode="${language.split('-')[1]}"`
      : '';

  return `import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  return (
    <FixedMessenger
      appId="${APP_CONFIG.appId}"
      aiAgentId="${APP_CONFIG.aiAgentId}"${userSessionSection}${contextSection}${languageSection}
    />
  );
}`;
};

export const CODE_EXAMPLES = {
  basic: {
    title: 'Basic Setup',
    code: `
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  return (
    <FixedMessenger
      appId="${APP_CONFIG.appId}"
      aiAgentId="${APP_CONFIG.aiAgentId}"
    />
  );
}`,
  },
  authenticated: {
    title: 'With Authentication',
    code: `
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  const userSessionInfo = {
    userId: "${APP_CONFIG.userId}",
    authToken: "${APP_CONFIG.authToken}",
    sessionHandler: {
      onSessionTokenRequired: async (resolve) => {
        const newAuthToken = await fetchNewToken();
        resolve(newAuthToken);
      },
      onSessionClosed: () => {
        console.log('Session closed');
      },
      onSessionError: (error) => {
        console.error('Session error:', error);
      },
      onSessionRefreshed: () => {
        console.log('Session refreshed');
      }
    }
  };

  return (
    <FixedMessenger
      appId="${APP_CONFIG.appId}"
      aiAgentId="${APP_CONFIG.aiAgentId}"
      userSessionInfo={userSessionInfo}
    />
  );
}`,
  },
  context: {
    title: 'With Context',
    code: `
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  const context = {
    userType: "premium",
    department: "engineering",
    customerId: "12345"
  };

  return (
    <FixedMessenger
      appId="${APP_CONFIG.appId}"
      aiAgentId="${APP_CONFIG.aiAgentId}"
      context={context}
    />
  );
}`,
  },
  runtime: {
    title: 'Runtime Context Updates',
    code: `
import { useRef } from 'react';
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

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
        appId="${APP_CONFIG.appId}"
        aiAgentId="${APP_CONFIG.aiAgentId}"
      />
    </>
  );
}`,
  },
  localization: {
    title: 'Multi-language',
    code: `
import { useState } from 'react';
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  const [language, setLanguage] = useState('en');
  const [countryCode, setCountryCode] = useState('US');

  const handleLanguageChange = (value) => {
    const [lang, country] = value.split('-');
    setLanguage(lang);
    setCountryCode(country);
  };

  return (
    <>
      <select onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="en-US">English</option>
        <option value="ko-KR">한국어</option>
        <option value="ja-JP">日本語</option>
      </select>

      <FixedMessenger
        key={\`\${language}-\${countryCode}\`} // Reset on language change
        appId="${APP_CONFIG.appId}"
        aiAgentId="${APP_CONFIG.aiAgentId}"
        language={language}
        countryCode={countryCode}
      />
    </>
  );
}`,
  },
};

export const SETUP_SNIPPETS = {
  install: `npm install @sendbird/ai-agent-messenger-react`,
  import: `import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';`,
  basic: generateCode({ hasSession: false, language: 'en-US', context: null }),
};
