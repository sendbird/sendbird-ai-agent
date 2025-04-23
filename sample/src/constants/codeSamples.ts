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
}`,

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
};
