export const CODE_SAMPLES = {
  loadScript: `<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";
</script>`,

  initialize: `const messenger = await loadMessenger();
messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
});

// open the messenger on load
messenger.onLoad(() => {
  messenger.open();
});`,

  updateConfig: `messenger.updateConfig({
  appId: 'NEW_APP_ID',
  aiAgentId: 'NEW_AI_AGENT_ID',
  // Other configuration options
});`,

  updateSession: `messenger.updateUserSession({
  userId: 'new_user_id',
  authToken: 'new_auth_token',
  // this callback should handle session token refresh:
  onSessionTokenRequired: async (resolve) => {
    const response = await fetch('new-token-endpoint');
    resolve(response.token);
  }
});`,

  controls: `function openAgent() {
  messenger.open();
}

function closeAgent() {
  messenger.close();
}

// If you want to hide the default launcher button:
// 1. Initialize with useShadowDOM: false to access elements
// const messenger = await loadMessenger({ useShadowDOM: false });
// 2. Then hide the launcher
// document.getElementById('sb-agent-launcher').style.display = 'none';`,

  messenger_locale: `// language and country code settings for the messenger
messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',

  // Should follow the IETF BCP 47 format.
  // e.g. "ko-KR" for Korean in South Korea or "en-US" for English in the United States.
  // default: navigator.language
  language: 'ko-KR',

  // Should follow the ISO 3166 format.
  // e.g. "KR" for South Korea or "US" for the United States.
  countryCode: 'KR',
});`,

  messenger_context: `// IMPORTANT: Context can only be set during initialization
messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
  context: {
    userPreference: 'technical',
    customerTier: 'premium'
  }
});`,

  customDisplay: `messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
  // Access the AI Agent Messenger components and React instance through the first argument
  customMainComponent: ({ messenger, react }) => (props) => {
    return react.createElement(messenger.AgentProviderContainer, props, [
      react.createElement(messenger.ConversationList),
    ]);
  }
});`,

  cleanup: `// Clear session data and disconnect from chat SDK
// Note: The input field will be disabled immediately after disconnection
messenger.deauthenticate();

// Remove messenger UI components from DOM
messenger.destroy();`,

  custom_stringset: `// Example 1: Customize specific strings in a supported language(Spanish)
const customLanguageConfig = {
  language: 'es-ES',
  stringSet: {
    // You can still customize certain stringSet keys even in supported language
    MESSAGE_INPUT__PLACE_HOLDER: '¡Pregúntame cualquier cosa!', // original: 'Hacer una pregunta',
    CONVERSATION_LIST__HEADER_TITLE: 'Lista de conversaciones anteriores' // original: 'Historial de conversaciones',
  }
}

messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
  ...customLanguageConfig,
});

// You can also set these stringSet values in runtime with updateConfig.
// but this will update UI with the new language only
// and won't impact on the AI Agent's response.
messenger.updateConfig({
  ...customLanguageConfig,
});
`,

  unsupported_language: `// Example 2: Add support for a language not provided by Sendbird(Chinese)
messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
  language: 'zh-CN',
  // Must provide all stringSet keys for unsupported languages
  stringSet: {
    // Channel - Common
    CHANNEL_FROZEN: '频道已冻结',
    PLACE_HOLDER__WRONG: '出现问题',
    PLACE_HOLDER__NO_MESSAGES: '没有消息',
    UNKNOWN__UNKNOWN_MESSAGE_TYPE: '(未知消息类型)',

    // Channel - Header
    HEADER_BUTTON__AGENT_HANDOFF: '连接客服',

    // Message Input
    MESSAGE_INPUT__PLACE_HOLDER: '请输入问题',
    MESSAGE_INPUT__PLACE_HOLDER__WAIT_AI_AGENT_RESPONSE: '等待回复中...',
    MESSAGE_INPUT__PLACE_HOLDER__DISABLED: '此频道不可用',

    // Common UI
    BUTTON__CANCEL: '取消',
    BUTTON__SAVE: '保存',
    BUTTON__OK: '确定',
    NO_NAME: '(无名)',
    RETRY: '重试',

    // ... other string key-value pairs
  }
});`,
};

export const REACT_CODE_SAMPLES = {
  installation: `npm install @sendbird/ai-agent-messenger-react
# or
yarn add @sendbird/ai-agent-messenger-react`,

  basicUsage: `import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  return (
    <FixedMessenger appId="YOUR_APP_ID" aiAgentId="YOUR_AI_AGENT_ID" />
  );
}`,

  agentProviderUsage: `import { AgentProviderContainer, Conversation } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  return (
    <AgentProviderContainer appId="YOUR_APP_ID" aiAgentId="YOUR_AI_AGENT_ID">
      <Conversation />
    </AgentProviderContainer>
  );
}`,

  switchApplication: `// Update to different application configuration
<FixedMessenger
  appId="NEW_APP_ID"
  aiAgentId="NEW_AI_AGENT_ID"
/>`,

  userAuthentication: `<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  userSessionInfo={{
    userId: 'user_id',
    authToken: 'auth_token',
    sessionHandler: {
      onSessionTokenRequired: async (resolve, reject) => {
        try {
          const response = await fetch('new-token-endpoint');
          resolve(response.token);
        } catch (error) {
          reject(error);
        }
      },
      onSessionClosed: () => { },
      onSessionError: (error) => { },
      onSessionRefreshed: () => { }
    }
  }}
/>`,

  manualControls: `function App() {
  const [opened, setOpened] = useState(true);

  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      state={{ opened, setOpened }}
      enableCloseConversationButton
    />
  );
}`,

  customDisplay: `import { AgentProviderContainer, Conversation } from '@sendbird/ai-agent-messenger-react';

function App() {
  return (
    <div style={{ height: '400px', border: '1px solid #ccc' }}>
      <AgentProviderContainer
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
      >
        <Conversation />
      </AgentProviderContainer>
    </div>
  );
}`,

  localeConfiguration: `<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  language="ko-KR"
  countryCode="KR"
/>`,

  customStringSet: `<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  language="es-ES"
  // You can still customize certain stringSet keys even in supported language
  stringSet={{
    MESSAGE_INPUT__PLACE_HOLDER: '¡Pregúntame cualquier cosa!',
    CONVERSATION_LIST__HEADER_TITLE: 'Lista de conversaciones anteriores'
  }}
/>`,

  unsupportedLanguage: `<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  language="zh-CN"
  // All stringSet keys for unsupported languages must be provided
  stringSet={{
    // Channel - Common
    CHANNEL_FROZEN: '频道已冻结',
    PLACE_HOLDER__WRONG: '出现问题',
    PLACE_HOLDER__NO_MESSAGES: '没有消息',
    UNKNOWN__UNKNOWN_MESSAGE_TYPE: '(未知消息类型)',

    // Channel - Header
    HEADER_BUTTON__AGENT_HANDOFF: '连接客服',

    // Message Input
    MESSAGE_INPUT__PLACE_HOLDER: '请输入问题',
    MESSAGE_INPUT__PLACE_HOLDER__WAIT_AI_AGENT_RESPONSE: '等待回复中...',
    MESSAGE_INPUT__PLACE_HOLDER__DISABLED: '此频道不可用',

    // Common UI
    BUTTON__CANCEL: '取消',
    BUTTON__SAVE: '保存',
    BUTTON__OK: '确定',
    NO_NAME: '(无名)',
    RETRY: '重试',

    // ... other string key-value pairs
  }}
/>`,

  contextObject: `<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  context={{
    userPreference: 'technical',
    customerTier: 'premium'
  }}
/>`,

  cleanup: `// Component cleanup is handled automatically by React
// when the component unmounts, but you can also
// control the messenger state manually:

function App() {
  const [messengerKey, setMessengerKey] = useState(0);

  const resetMessenger = () => {
    setMessengerKey(prev => prev + 1); // Force remount
  };

  return (
    <FixedMessenger
      key={messengerKey}
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
    />
  );
}`,
};
