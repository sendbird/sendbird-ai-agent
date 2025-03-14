[iOS](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/README.md) / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / **JS**

# Sendbird AI Agent Quickstart guide (JS)

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your Web. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quickstart guide (JS)](#sendbird-ai-agent-quickstart-guide-js)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
    - [Step 1. Install AI Agent SDK](#step-1-install-ai-agent-sdk)
    - [Step 2. Initialize AI Agent SDK](#step-2-initialize-ai-agent-sdk)
  - [Running your application](#running-your-application)
    - [Manage user sessions](#manage-user-sessions)
    - [Launch the messenger](#launch-the-messenger)
  - [Advanced features](#advanced-features)
    - [Display messenger without launcher button](#display-messenger-without-launcher-button)
    - [Deauthenticate and clear session](#deauthenticate-and-clear-session)

## Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**. 
<br><br/>
You can find it under the **Channels** > **Messenger** menu on the Sendbird Dashboard.

![ai-agent-app-id-agent-id](https://github.com/user-attachments/assets/37d2873e-f35d-45dd-97cc-3d7c7e638a0c)

---

## Getting Started

Quickly install and initalize the AI Agent SDK by following the steps below.

### Step 1. Install AI Agent SDK

Add the AI Agent SDK to your web page by importing it as a module.

```html
<script type="module">
    import { loadMessenger } from "https://aiagent.sendbird.com/orgs/<org_name>/index.js";
</script>
```

### Step 2. Initialize AI Agent SDK

```javascript
const messenger = await loadMessenger();
await messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_BOT_ID',
});
```

---

## Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

### Manage user sessions

For proper user session management, you can update the session information using the following methods.

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

### Launch the messenger

![Image](https://github.com/user-attachments/assets/74eea8d0-a984-4fb9-9c35-299b6b35b283)

Once the authentication information has been successfully registered, you can launch the messenger to start a conversation with the ai agent.

To launch and display the messenger, implement the code below:

>__Note__: Replace `YOUR_APP_ID` AND `YOUR_AI_AGENT_ID` with your Application ID and AI agent ID which you can obtain from the Sendbird Dashboard. To learn how do to so, refer to the [prerequisites](#prerequisites) section.

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

---

## Advanced Features

The following are available advanced features.

### Display messenger without launcher button

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

### Deauthenticate and clear session

While it is not required, you can de-authenticate the SDK to clear session data and disconnect when a user logs out.

    ```javascript
    messenger.destroy();
    ```
