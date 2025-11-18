# Quickstart guide (Messenger)

{% hint style="warning" %}
Release notes

* Version 1.5.0 released: Sendbird AI Agent SDK for JavaScript (CDN) **v1.5.0** was released on **September 25, 2025**.
* Feature support: We recommend you install the latest version as any features introduced after this date will be supported only in the latest version.
{% endhint %}

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your Web. Follow the steps below to initialize and utilize the SDK effectively.

### Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**.\
\
You can find it under the **Build > Channels** > **Messenger > Basic information** menu on the Sendbird Dashboard.

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 1.58.39.png" alt=""><figcaption></figcaption></figure>

***

### Getting Started

Quickly install and initialize the AI Agent SDK by following the steps below.

#### Step 1. Install AI Agent SDK

Add the AI Agent SDK to your web page by importing it as a module.

```javascript
<script type="module">
    import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";
</script>
```

#### Step 2. Initialize AI Agent SDK

```javascript
const messenger = await loadMessenger();
messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_AIAGENT_ID',
    userSessionInfo: new messenger.AnonymousSessionInfo(),
});
```

#### Custom host configuration

If needed, you can specify custom API and WebSocket hosts during initialization:

```
messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_BOT_ID',
    customApiHost: 'https://your-proxy-api.example.com',
    customWebSocketHost: 'wss://your-proxy-websocket.example.com'
});
```

Both parameters are optional and only need to be configured if required.

***

### Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

#### Manage user sessions

To properly manage user sessions, provide session information when initializing the messenger.

```javascript
messenger.initialize({
  // ... Other initialization configurations
  userSessionInfo: new messenger.ManualSessionInfo({
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
  })
});
```

For updating session information at runtime, use the `updateUserSession()` method as follows:

```javascript
const newManualSessionInfo = new messenger.ManualSessionInfo({
  userId: 'new_user_id',
  authToken: 'new_auth_token',
  sessionHandler: {
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
  },
});
messenger.updateUserSession(newManualSessionInfo);
```

#### Launch the messenger

<figure><img src="../../.gitbook/assets/image (41).png" alt=""><figcaption></figcaption></figure>

Once the authentication information has been successfully registered, you can launch the messenger to start a conversation with the AI agent.

To launch and display the messenger, implement the code below:

> **Note**: Replace `YOUR_APP_ID` AND `YOUR_AI_AGENT_ID` with your Application ID and AI agent ID which you can obtain from the Sendbird Dashboard. To learn how do to so, refer to the [prerequisites](quickstart-guide-messenger.md#prerequisites) section.

```javascript
const messenger = await loadMessenger();
messenger.initialize({
  appId: 'YOUR_APP_ID',
  aiAgentId: 'YOUR_AI_AGENT_ID',
  userSessionInfo: new messenger.AnonymousSessionInfo(),
});
```

The messenger view can be programmatically controlled using the `messenger.open()` and `messenger.close()` methods:

```javascript
// Open the messenger view automatically after initialized
messenger.initialize({ appId, aiAgentId, userSessionInfo });
messenger.onLoad(() => {
  messenger.open();
});

// Close the messenger view by clicking a button
<button onClick={() => messenger.close()}>Close</button>;
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

***

### Advanced Features

The following are available advanced features.

#### Display messenger without launcher button

<figure><img src="../../.gitbook/assets/image (42).png" alt=""><figcaption></figcaption></figure>

```javascript
const messenger = await loadMessenger({
  // Use Conversation component to display only the messenger without the launcher
  customMainComponent: ({ messenger, react }) => {
    return (props) => {
        return react.createElement(messenger.AgentProviderContainer, props, [
        react.createElement(messenger.Conversation),
      ]);
    };
  },
});
messenger.initialize({
  appId: 'APP_ID',
  aiAgentId: 'AI_AGENT_ID',
  userSessionInfo: new messenger.AnonymousSessionInfo(),
});
```

***

#### De-authenticate and clear session

The messenger provides two different methods for cleanup:

1. Use `deauthenticate()` to handle user logout by clearing session data and disconnecting from the chat SDK:

```
messenger.deauthenticate();
```

2. Use `destroy()` to remove the messenger components from the DOM:

```
messenger.destroy();
```

{% hint style="info" %}
Note: `deauthenticate()` is used for user session management and handles the chat SDK disconnection internally. `destroy()` is used for UI cleanup, removing the rendered components from the page without affecting the session state.
{% endhint %}

***

### Passing context object to AI agent

You can predefine customer-specific information such as country, language, or other custom context data to guide the AI agent in providing faster and more accurate responses.

This allows for a more personalized and context-aware interaction experience.

{% hint style="info" %}
**Important**: These settings can only be configured during initialization.
{% endhint %}

```java
const messenger = await loadMessenger();
messenger.initialize({
  appId: 'YOUR_APP_ID',
  aiAgentId: 'YOUR_BOT_ID',
  userSessionInfo: new messenger.AnonymousSessionInfo(),
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

{% hint style="info" %}
Note: You can also update or patch the context object after initialization using the `updateContext()` or `patchContext()` methods on the `messenger` instance. For details, see the [Context object](context-object.md) page.
{% endhint %}

***

### Localization and multi-language support

The SDK supports multiple languages and allows you to customize UI strings. You can:

* Set the language during initialization or update it later
* Customize specific strings in a supported language
* Add support for languages not built into the SDK
* Dynamically load language files as needed for better performance

For more information, see the [Multi-language support](multi-language-support.md) page.
