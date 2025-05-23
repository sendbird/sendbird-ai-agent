[iOS](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/README.md) / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / **JS**

# Sendbird AI Agent Quickstart guide (JS)

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your Web. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quickstart guide (JS)](#sendbird-ai-agent-quickstart-guide-js)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Step 1. Install AI Agent SDK](#step-1-install-ai-agent-sdk)
    - [Step 2. Initialize AI Agent SDK](#step-2-initialize-ai-agent-sdk)
  - [Running your application](#running-your-application)
    - [Manage user sessions](#manage-user-sessions)
    - [Launch the messenger](#launch-the-messenger)
  - [Advanced Features](#advanced-features)
    - [Display messenger without launcher button](#display-messenger-without-launcher-button)
    - [Deauthenticate and clear session](#deauthenticate-and-clear-session)
    - [Passing context object to Agent](#passing-context-object-to-agent)
    - [Localization and Language Support](#localization-and-language-support)

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
    import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";
</script>
```

### Step 2. Initialize AI Agent SDK

```javascript
const messenger = await loadMessenger();
messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_BOT_ID',
});
```
---

## Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

### Manage user sessions

To properly manage user sessions, provide session information when initializing the messenger.
```javascript
messenger.initialize({
    // ... Other initialization configurations
    userSessionInfo: {
        userId: 'user_id',
        authToken: 'auth_token',
        sessionHandler: {
            // A new session token is required in the SDK to refresh the session.
            onSessionTokenRequired: async (resolve, reject) => {
                try {
                    // Refresh the session token and pass it onto the SDK through resolve(NEW_TOKEN).
                    // If you don't want to refresh the session, pass on a null value through resolve(null).
                    const response = await fetch('new-token-endpoint');
                    resolve(response.token);
                } catch (error) {
                    // If any error occurs while refreshing the token, let the SDK know about it through reject(error).
                    reject(error);
                }
            },
            // Called when the session refresh has been denied.
            // This event can occur if the client app doesn't explicitly refresh the token, the token is revoked, or the user is deactivated.
            // In this case, the client app should handle the UX appropriately — such as redirecting the user to a login page or hiding/destroying the messenger.
            onSessionClosed: () => { },
            // Optional: Called when an error occurs during session refresh.
            onSessionError: (error) => { },
            // Optional: Called when the session is refreshed.
            onSessionRefreshed: () => { },
        }
    }
});
```

For updating session information at runtime, use the `updateUserSession()` method as follows:

```javascript
messenger.updateUserSession({
    userId: 'new_user_id',
    authToken: 'new_auth_token',
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
    onSessionRefreshed: () => { },
});
```

### Launch the messenger

![Image](https://github.com/user-attachments/assets/74eea8d0-a984-4fb9-9c35-299b6b35b283)

Once the authentication information has been successfully registered, you can launch the messenger to start a conversation with the ai agent.

To launch and display the messenger, implement the code below:

>__Note__: Replace `YOUR_APP_ID` AND `YOUR_AI_AGENT_ID` with your Application ID and AI agent ID which you can obtain from the Sendbird Dashboard. To learn how do to so, refer to the [prerequisites](#prerequisites) section.

```javascript
const messenger = await loadMessenger();
messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_AI_AGENT_ID',
});
```

The messenger view can be programmatically controlled using the `open()` and `close()` methods:

```javascript
// Open the messenger view automatically after initialized
messenger.initialize({ appId, aiAgentId });
messenger.onLoad(() => {
    messenger.open();
});

// Close the messenger view by clicking a button
<button onClick={() => messenger.close()}>Close</button>
```

To update the configurations:

```javascript
// Update configuration
messenger.updateConfig({
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
const messenger = await loadMessenger({
  // Use Conversation component to display only the messenger without the launcher
  customMainComponent: ({ messenger, react }) => {
    return (props) => {
        return react.createElement(messenger.AgentProviderContainer, props, [
            react.createElement(messenger.Conversation),
        ]);
    };
  }
});
messenger.initialize({
    appId: 'APP_ID',
    aiAgentId: 'AI_AGENT_ID',
});
```

### Deauthenticate and clear session

The messenger provides two different methods for cleanup:

1. Use `deauthenticate()` to handle user logout by clearing session data and disconnecting from the chat SDK:
```javascript
messenger.deauthenticate();
```

2. Use `destroy()` to remove the messenger components from the DOM:
```javascript
messenger.destroy();
```

> Note: `deauthenticate()` is used for user session management and handles the chat SDK disconnection internally. `destroy()` is used for UI cleanup, removing the rendered components from the page without affecting the session state.

### Passing context object to Agent

You can predefine customer-specific information such as country, language, or other custom context data to guide the AI Agent in providing faster and more accurate responses.

This allows for a more personalized and context-aware interaction experience.

> **Important**: These settings can only be configured during initialization.

```javascript
const messenger = await loadMessenger();
messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_BOT_ID',
    // Language setting (IETF BCP 47 format)
    // default: navigator.language
    language: 'en-US',
    // Country code setting (ISO 3166 format)
    countryCode: 'US',
    // Context object for the AI Agent
    context: {
        userPreference: 'technical',
        customerTier: 'premium'
    }
});
```

### Localization and Language Support

The SDK supports multiple languages and allows you to customize UI strings. You can:

- Set the language during initialization or update it later
- Customize specific strings in a supported language
- Add support for languages not built into the SDK
- Dynamically load language files as needed for better performance

For detailed information about localization options and full list of available string sets, refer to our [Localization Guide](./MULTILANGUAGE.md).
