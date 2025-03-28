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
    import { loadMessenger } from "https://aiagent.stg.sendbirdtest.com/orgs/default/index.js";
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

For proper user session management, you can update the session information using the following methods.

```javascript
// Update entire session configuration
messenger.updateUserSession({
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

While it is not required, you can de-authenticate the SDK to clear session data and disconnect when a user logs out.

```javascript
messenger.destroy();
```

### Passing context object to Agent

You can predefine customer-specific information such as country, language, or other custom context data to guide the AI Agent in providing faster and more accurate responses.

This allows for a more personalized and context-aware interaction experience.

> Once the contexts are set, they will be used throughout the conversation to provide personalized and context-aware responses.


### Passing context object to Agent

You can predefine customer-specific information such as country, language, or other custom context data to guide the AI Agent in providing faster and more accurate responses.

This allows for a more personalized and context-aware interaction experience.

> Once the contexts are set, they will be used throughout the conversation to provide personalized and context-aware responses.

```javascript
// Metadata can be updated incrementally using updateMetadata().
// Top-level key-value pairs are merged across multiple calls.

messenger.updateMetadata({
    language: 'en-US', // default: navigator.language
});

messenger.updateMetadata({
    countryCode: 'US',
});

const newContextObject = { key1: 'value1', key2: 'value2' };
messenger.updateMetadata({
    message: { contextObject: newContextObject },
});

// Updating context with a new object replaces the previous one.
const removedContextObject = { key1: 'value1' };
messenger.updateMetadata({
    message: { contextObject: removedContextObject },
});

// Sending an empty object clears the context.
const emptyContextObject = {};
messenger.updateMetadata({
    message: { contextObject: emptyContextObject },
});
```
