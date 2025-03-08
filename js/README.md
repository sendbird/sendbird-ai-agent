# Sendbird AI Agent SDK for Web

The Sendbird AI Agent SDK allows seamless integration of chatbot features into your web application. Below are the steps to initialize and utilize the SDK effectively.



## Prerequisites

Add the SDK to your web page by including the following script tag:

```html
<script src="https://aiagent.sendbird.com/loader/v0/index.js"></script>
```


## SDK Initialization

Initialize the SDK by providing the app ID and configuration parameters:

```html
<script>
const loader = new AIAgentLoader({
  appId: 'YOUR_APP_ID',
  aiAgentId: 'YOUR_BOT_ID',
});

await loader.initialize();
</script>
```

---

## Session Info Management

For proper session management, you can update the session information using the following methods:

```javascript
// Update entire session configuration
await loader.updateSession({
  userId: 'new_user_id',
  authToken: 'new_auth_token',
  sessionHandler: async () => {
    const response = await fetch('new-token-endpoint');
    return response.token;
  }
});
```

The `sessionHandler` callback should handle session token refresh:

```javascript
const loader = new AIAgentLoader({
  // ... other config options
  sessionHandler: async () => {
    try {
      // Request a new session token from your server
      const response = await fetch('your-token-endpoint');
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }
});
```

---

## Launching Chat Views

The SDK automatically handles the chat view display. You can customize the container by providing an ID:

```html
<script>
const loader = new AIAgentLoader({
  appId: 'YOUR_APP_ID',
  aiAgentId: 'YOUR_AI_AGENT_ID',
});
</script>
```

To update the configurations:

```javascript
// Update configuration
await loader.updateConfig({
  appId: 'NEW_APP_ID',
  aiAgentId: 'NEW_BOT_ID',
  // ... other config options
});
```

---

## Updating SDK Theme

The SDK automatically adapts to your website's color scheme, but you can also explicitly set the theme:

```javascript
await loader.updateConfig({
  appearance: { theme: 'light' } // Options: 'light', 'dark'
});
```

---

## Advanced Examples

Here's a complete example showing various SDK operations:

```javascript
// Initialize
const loader = new AIAgentLoader({
  appId: 'initial_app_id',
  aiAgentId: 'initial_ai_agent_id',
});
await loader.initialize();

// Update app ID or ai agent ID
await loader.updateConfig({
  appId: 'new_app_id',
  aiAgentId: 'new_ai_agent_id'
});

// Update user session
await loader.updateSession({
  userId: 'new_user',
  authToken: 'new_token',
  sessionHandler: async () => {
    const response = await fetch('new_token_endpoint');
    return response.token;
  }
});

// Cleanup on logout
loader.destroy();
```

#### Dynamic State Management

You can also control the chat window state dynamically after initialization:

```javascript
// Toggle chat window visibility
await loader.updateConfig({
  state: { opened: true }  // Open chat window
});

await loader.updateConfig({
  state: { opened: false }  // Close chat window
});

// Control expanded state (if supported by the theme)
await loader.updateConfig({
  state: { 
    expanded: true,  // Expand chat window
    setExpanded: (value) => {
      // Custom logic for expansion state changes
      console.log('Chat window expansion state:', value);
    }
  }
});
```
