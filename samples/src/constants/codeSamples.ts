export const CODE_SAMPLES = {
  loadScript: `<script type="module">
  import { loadMessenger } from "https://aiagent.stg.sendbirdtest.com/orgs/default/index.js";
</script>`,

  initialize: `const messenger = await loadMessenger();
await messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
});

// open the messenger automatically after 2 seconds
setTimeout(() => {
  messenger.open();
}, 2000);`,

  updateConfig: `await messenger.updateConfig({
  appId: 'NEW_APP_ID',
  aiAgentId: 'NEW_AI_AGENT_ID',
  // ... other config options
});`,

  updateSession: `await messenger.updateUserSession({
  userId: 'new_user_id',
  authToken: 'new_auth_token',
  // this callback should handle session token refresh:
  onSessionTokenRequest: async () => {
      const response = await fetch('new-token-endpoint');
      return response.token;
  }
});`,

  controls: `function openAgent() {
  if (!messenger) return;
  messenger.open();
}

function closeAgent() {
  if (!messenger) return;
  messenger.close();
}`,

  customDisplay: `await messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
  // Access the AI Agent Messenger components through the first argument
  customMainComponent: ({ messenger }) => (props) => {
    return (
      <messenger.AgentProviderContainer {...props}>
        <messenger.ConversationList />
      </messenger.AgentProviderContainer>
    );
  }
});

// For environments that don't support JSX,
// you can use the React instance from the first argument to create UI components:
await messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
  customMainComponent: ({ messenger, react }) => (props) => {
    return react.createElement(messenger.AgentProviderContainer, props, [
      react.createElement(messenger.ConversationList),
    ]);
  }
});`,
};
