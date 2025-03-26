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
  // ... other config options
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
};
