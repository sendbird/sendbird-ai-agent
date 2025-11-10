# Conversations

In Sendbird AI agent, a conversation refers to a channel where an AI Agent communicates with a user. Sendbird AI agent supports two different conversation modes: Single active conversation and Multiple active conversation mode, which is the default.

When the launcher is clicked, a user can be led to either their conversation list or a conversation depending on your choice of the conversation mode.

| Feature| Single active conversation| Multiple active conversations (Default)|
|-------------------|------------------|----------------|
| Number of active conversation| A user can have only one active conversation with your AI agent at a time.| A user can have multiple active conversations with your AI agent at the same time.|
| Starting a new conversation | A new conversation can't be created if there is an active conversation at the moment. The existing conversation must end first.| New conversations can be created anytime through the SDK methods.|

>__Note__: Whichever conversation mode you choose, if there is no active conversation, a new conversation is automatically created and the user can start a dialogue with your AI agent. This provides seamless user experience without requiring manual conversation setup.

This guide explains:

- [Conversations](#conversations)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
    - [Basic setup](#basic-setup)
    - [Without Shadow DOM](#without-shadow-dom)
    - [With custom main component](#with-custom-main-component)
  - [Launcher customization](#launcher-customization)
    - [Set the launcher position](#set-the-launcher-position)
    - [Customize the launcher appearance](#customize-the-launcher-appearance)
  - [Managing conversations](#managing-conversations)
    - [Open and close messenger](#open-and-close-messenger)
    - [Update configuration](#update-configuration)
    - [Update user session](#update-user-session)
    - [Deauthenticate](#deauthenticate)
    - [Destroy messenger](#destroy-messenger)
  - [API Reference](#api-reference)

---

## Installation

The Sendbird AI Agent Messenger is available via ES module import from the Sendbird CDN:

```javascript
import { loadMessenger } from 'https://aiagent.sendbird.com/orgs/default/index.js';
```

---

## Getting Started

The CDN provides a module-based API to integrate the Sendbird AI Agent Messenger into your web application without requiring a build process.

### Basic setup

Load the messenger and initialize it with your application credentials:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Agent Messenger</title>
</head>
<body>
    <script type="module">
        import { loadMessenger } from 'https://aiagent.sendbird.com/orgs/default/index.js';

        // Load messenger
        const messenger = await loadMessenger();

        // Initialize messenger
        messenger.initialize({
            appId: 'YOUR_APP_ID',
            aiAgentId: 'YOUR_AI_AGENT_ID',
            userSessionInfo: new messenger.AnonymousSessionInfo()
        });
    </script>
</body>
</html>
```

### Without Shadow DOM

By default, the messenger uses Shadow DOM for style encapsulation. You can disable it if needed:

```javascript
const messenger = await loadMessenger({
    useShadowDOM: false
});

messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_AI_AGENT_ID',
    userSessionInfo: new messenger.AnonymousSessionInfo()
});
```

### With custom main component

You can provide a custom main component for advanced customization:

```javascript
const messenger = await loadMessenger({
    customMainComponent: ({ messenger, react }) => {
        return (props) => {
            return react.createElement(
                messenger.AgentProviderContainer,
                props,
                [react.createElement(messenger.Conversation)]
            );
        };
    }
});

messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_AI_AGENT_ID'
});
```

---

## Launcher customization

The messenger includes a floating launcher button that can be customized in terms of position and appearance.

### Set the launcher position

You can dynamically change the launcher position and margins:

```javascript
messenger.setPosition({
    position: 'end-bottom',
    margin: {
        top: 24,
        bottom: 24,
        start: 24,
        end: 24
    }
});
```

**Available positions:**

| Position | Description |
|----------|-------------|
| `'start-top'` | Top-left corner of the screen |
| `'start-bottom'` | Bottom-left corner of the screen |
| `'end-top'` | Top-right corner of the screen |
| `'end-bottom'` | Bottom-right corner of the screen (default) |

**Margin options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `top` | number | 24 | Top margin in pixels |
| `bottom` | number | 24 | Bottom margin in pixels |
| `start` | number | 24 | Start margin in pixels (left in LTR, right in RTL) |
| `end` | number | 24 | End margin in pixels (right in LTR, left in RTL) |

### Customize the launcher appearance

The launcher's icon and color can be configured through the [Sendbird AI agent dashboard](https://dashboard.sendbird.com) - no code changes required. Simply go to **[Build > Channels > Messenger](https://dashboard.sendbird.com/ai-agent/{application-id}/channels/messenger/?active_tab=Appearance)** in the dashboard and click on the **Appearance** tab to customize your launcher.

<img width="441" height="737" src="https://sendbird-files.s3.ap-northeast-1.amazonaws.com/docs/aa-launcher.png" />

---

## Managing conversations

The messenger provides methods to control visibility and manage conversations.

### Open and close messenger

Control the messenger visibility programmatically:

```javascript
// Open the messenger
messenger.open();

// Close the messenger
messenger.close();
```

### Update configuration

Update messenger configuration after initialization:

```javascript
messenger.updateConfig({
    appId: 'NEW_APP_ID',
    aiAgentId: 'NEW_AI_AGENT_ID',
    language: 'ko-KR',
    countryCode: 'KR',
    theme: {
        palette: {
            primary: '#6210CC'
        }
    }
});
```

### Update user session

Update user session information dynamically:

```javascript
// With ManualSessionInfo
const sessionInfo = new messenger.ManualSessionInfo({
    userId: 'user_123',
    authToken: 'your_auth_token',
    sessionHandler: {
        onSessionTokenRequired: (resolve, reject) => {
            // Fetch new token when required
            fetchNewToken()
                .then(token => resolve(token))
                .catch(error => reject(error));
        },
        onSessionError: (error) => {
            console.error('Session error:', error);
        },
        onSessionRefreshed: () => {
            console.log('Session refreshed');
        },
        onSessionClosed: () => {
            console.log('Session closed');
        }
    }
});

messenger.updateUserSession(sessionInfo);
```

### Deauthenticate

Log out the current user:

```javascript
messenger.deauthenticate();
```

### Destroy messenger

Completely remove the messenger instance:

```javascript
messenger.destroy();
```

---

## API Reference

### loadMessenger()

Loads the AI Agent Messenger module.

```javascript
await loadMessenger(config)
```

**Parameters:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `useShadowDOM` | boolean | true | Use Shadow DOM for style encapsulation (set to false to disable) |
| `customMainComponent` | function | - | Custom main component function for advanced customization |

**Returns:** Promise<Messenger>

### messenger.initialize()

Initializes the AI Agent Messenger with configuration.

```javascript
messenger.initialize(config)
```

**Parameters:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `appId` | string | Required | Your Sendbird application ID |
| `aiAgentId` | string | Required | AI agent identifier for conversation target |
| `userSessionInfo` | ManualSessionInfo \| AnonymousSessionInfo | - | User session information for authentication |
| `entryPoint` | 'Conversation' \| 'ConversationList' | 'Conversation' | Which screen to show when the messenger is first loaded |
| `language` | string | navigator.language | Language setting following IETF BCP 47 format (e.g., "en-US", "ko-KR") |
| `countryCode` | string | - | Country code following ISO 3166 format (e.g., "US", "KR") |
| `context` | Record<string, string> | - | Context object for personalized AI agent responses |
| `config` | object | - | AI agent configuration object |
| `theme` | object | - | Theme customization for palette and typography |
| `stringSet` | Partial<StringSet> | - | Localization string set for the messenger |
| `logLevel` | LogLevel | - | Log level for the AI agent client |

### Messenger Methods

**Lifecycle Methods:**

| Method | Parameters | Description |
|--------|------------|-------------|
| `open()` | - | Open the messenger |
| `close()` | - | Close the messenger |
| `destroy()` | - | Completely remove the messenger instance |

**Configuration Methods:**

| Method | Parameters | Description |
|--------|------------|-------------|
| `updateConfig(config)` | config: Partial<InitializeConfig> | Update messenger configuration |
| `updateUserSession(session)` | session: ManualSessionInfo \| AnonymousSessionInfo | Update user session information |
| `setPosition(params)` | params: { position?, margin? } | Set launcher position and margins |

**Session Methods:**

| Method | Description |
|--------|-------------|
| `deauthenticate()` | Log out the current user |

### Session Info Classes

**ManualSessionInfo:**

```javascript
new messenger.ManualSessionInfo({
    userId: string,
    authToken: string,
    sessionHandler: {
        onSessionTokenRequired?: (resolve, reject) => void,
        onSessionError?: (error) => void,
        onSessionRefreshed?: () => void,
        onSessionClosed?: () => void
    }
})
```

**AnonymousSessionInfo:**

```javascript
new messenger.AnonymousSessionInfo()
```

### Position Parameters

Parameters for `setPosition()` method:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | 'start-top' \| 'start-bottom' \| 'end-top' \| 'end-bottom' | - | Position of the launcher button |
| `margin` | Partial<{ top: number; bottom: number; start: number; end: number }> | - | Margin around the launcher in pixels |
