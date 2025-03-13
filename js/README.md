[iOS](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/README.md) / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / **JS**

# Sendbird AI Agent Quick Start Guide (JS)

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your Web. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quick Start Guide (JS)](#sendbird-ai-agent-quick-start-guide-js)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Running Your Application](#running-your-application)
  - [Advanced Features](#advanced-features)

## Prerequisites

Add the SDK to your web page by importing it as a module:
```html
<script type="module">
    import { loadMessenger } from "https://aiagent.sendbird.com/orgs/<org_name>/index.js";
</script>
```

## Getting Started

Initialize the SDK by providing the app ID and configuration parameters:

```javascript
const messenger = await loadMessenger();
await messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_BOT_ID',
});
```

## Running Your Application

- ### Setup User Session
  For proper user session management, you can update the session information using the following methods:

    ```javascript
    // Update entire session configuration
    await messenger.updateUserSession({
        userId: 'new_user_id',
        authToken: 'new_auth_token',
        // this callback should handle session token refresh:
        onSessionTokenRequest: async () => {
            const response = await fetch('new-token-endpoint');
            return response.token;
        }
    });
    ```

- ### Launching Messenger
  ![Image](https://github.com/user-attachments/assets/74eea8d0-a984-4fb9-9c35-299b6b35b283)
  The SDK automatically handles the messenger display:

    ```javascript
    const messenger = await loadMessenger();
    await messenger.initialize({
        appId: 'YOUR_APP_ID',
        aiAgentId: 'YOUR_AI_AGENT_ID',
    });
    ```

  The messenger view can be programmatically controlled using the `open()` and `close()` methods:

    ```javascript
    // Open the messenger view automatically after 1 second after initialized
    await messenger.initialize({ appId, aiAgentId });
    setTimeout(() => {
        messenger.open();
    }, 1000);

    // Close the messenger view by clicking a button
    <button onClick={() => messenger.close()}>Close</button>
    ```

  To update the configurations:

    ```javascript
    // Update configuration
    await messenger.updateConfig({
        appId: 'NEW_APP_ID',
        aiAgentId: 'NEW_BOT_ID',
        // ... other config options
    });
    ```

## Advanced Features
- ### Display the conversation view without the launcher 
    ![Image](https://github.com/user-attachments/assets/348ccad1-ec9a-4851-9324-084eaf569e34)
    ```javascript
    const messenger = await loadMessenger();
    await messenger.initialize({
        appId: 'APP_ID',
        aiAgentId: 'AI_AGENT_ID',
        // Use Conversation component to display only the messenger without the launcher
        customMainComponent: (coreModule) => (props) => (
            <coreModule.AgentProviderContainer {...props}>
                <coreModule.Conversation />
            </coreModule.AgentProviderContainer>
        ),
    });
    ```
- ### Cleanup on logout
    It is not specifically required on the web, but if needed, please run it as shown below.
    ```javascript
    messenger.destroy();
    ```
