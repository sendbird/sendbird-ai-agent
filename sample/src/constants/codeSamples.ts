export const CODE_SAMPLES = {
  loadScript: `<script type="module">
  import { loadMessenger } from "https://aiagent.stg.sendbirdtest.com/orgs/default/index.js";
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
  onSessionTokenRequest: async () => {
    const response = await fetch('new-token-endpoint');
    return response.token;
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
    // Override only specific keys
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
