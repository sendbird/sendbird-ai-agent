[# Sendbird AI Agent SDK for Web

The Sendbird AI Agent SDK allows seamless integration of chatbot features into your web application. Below are the steps to initialize and utilize the SDK effectively.



## Prerequisites

Add the SDK to your web page by importing it as a module:

```html
<script type="module">
  import loadAIAgent from "https://aiagent.sendbird.com/orgs/netflix/index.js";
</script>
```


## SDK Initialization

Initialize the SDK by providing the app ID and configuration parameters:

```javascript
const aiAgent = await loadAIAgent({
  appId: 'YOUR_APP_ID',
  aiAgentId: 'YOUR_BOT_ID',
});

await aiAgent.initialize();
```

---

## Session Info Management

For proper session management, you can update the session information using the following methods:

```javascript
// Update entire session configuration
await aiAgent.updateSession({
  userId: 'new_user_id',
  authToken: 'new_auth_token',
  // this callback should handle session token refresh:
  onSessionTokenRequest: async () => {
    const response = await fetch('new-token-endpoint');
    return response.token;
  }
});
```

---

## Launching Messenger

The SDK automatically handles the messenger display:

```javascript
const aiAgent = await loadAIAgent({
  appId: 'YOUR_APP_ID',
  aiAgentId: 'YOUR_AI_AGENT_ID',
});

await aiAgent.initialize();
```

To update the configurations:

```javascript
// Update configuration
await aiAgent.updateConfig({
  appId: 'NEW_APP_ID',
  aiAgentId: 'NEW_BOT_ID',
  // ... other config options
});
```

---

## Advanced Examples

Here's a complete example showing various SDK operations:

```javascript
// Initialize
const aiAgent = await loadAIAgent({
  appId: 'initial_app_id',
  aiAgentId: 'initial_ai_agent_id',
});
await aiAgent.initialize();

// Update app ID or ai agent ID
await aiAgent.updateConfig({
  appId: 'new_app_id',
  aiAgentId: 'new_ai_agent_id'
});

// Update user session
await aiAgent.updateSession({
  userId: 'new_user',
  authToken: 'new_token',
  onSessionTokenRequest: async () => {
    const response = await fetch('new_token_endpoint');
    return response.token;
  }
});

// Cleanup on logout
aiAgent.destroy();
```
](https://github.com/sendbird/sendbird-ai-agent/pull/8)
