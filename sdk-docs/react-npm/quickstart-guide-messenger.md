# Quickstart guide (Messenger)

{% hint style="warning" %}
Release notes

* Version 1.5.0 released: Sendbird AI Agent SDK for React **v1.5.0** was released on **September 25, 2025**.
* Feature support: We recommend you install the latest version as any features introduced after this date will be supported only in the latest version.
{% endhint %}

The **Sendbird AI Agent Messenger React** allows seamless integration of chatbot features into your React application.

### Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**.\
\
You can find it under the **Build > Channels** > **Messenger > Basic information** menu on the Sendbird Dashboard.

![ai-agent-app-id-agent-id](<../../.gitbook/assets/스크린샷 2025-09-09 오후 1.58.39.png>)

**System requirements:**

* React >=18.0.0
* React DOM >=18.0.0
* @sendbird/chat ^4.19.0
* styled-components >=5.0.0

***

### Getting started

Quickly install and initialize the AI Agent SDK by following the steps below.

#### Step 1. Install AI Agent SDK

Install the package with its peer dependencies using npm or yarn:

```bash
npm install @sendbird/ai-agent-messenger-react @sendbird/chat styled-components
# or
yarn add @sendbird/ai-agent-messenger-react @sendbird/chat styled-components
```

> **Note:** Modern npm versions automatically install peer dependencies, but explicitly installing them ensures compatibility and avoids potential version conflicts.

#### Step 2. Initialize AI Agent SDK

The React SDK provides two main approaches for integration:

**Option 1: FixedMessenger (Recommended for quick setup)**

FixedMessenger provides a predefined UI toolkit with launcher and messenger at fixed position (bottom-right):

```tsx
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  return (
    <FixedMessenger appId="YOUR_APP_ID" aiAgentId="YOUR_AI_AGENT_ID" />
  );
}
```

**Option 2: AgentProviderContainer (For custom UI implementations)**

AgentProviderContainer allows for custom UI implementations and component-level integration:

```tsx
import { AgentProviderContainer, Conversation } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

function App() {
  return (
    <AgentProviderContainer appId="YOUR_APP_ID" aiAgentId="YOUR_AI_AGENT_ID">
      <Conversation />
    </AgentProviderContainer>
  );
}
```

#### **Custom host configuration**

If needed, you can specify custom API and WebSocket hosts:

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  customApiHost="https://your-proxy-api.example.com"
  customWebSocketHost="wss://your-proxy-websocket.example.com"
/>
```

Similarly, when using `AgentProviderContainer`:

```tsx
<AgentProviderContainer
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  customApiHost="https://your-proxy-api.example.com"
  customWebSocketHost="wss://your-proxy-websocket.example.com"
>
  <Conversation />
</AgentProviderContainer>
```

Both properties are optional and only need to be configured if required.

***

### Component overview

#### FixedMessenger vs AgentProviderContainer

**FixedMessenger:**

* Complete UI toolkit with launcher and messenger
* Fixed position (bottom-right corner)
* Includes all necessary providers internally
* Recommended for most use cases
* Use standalone without additional providers

**AgentProviderContainer:**

* Provider component for custom UI implementations
* Allows building custom messenger interfaces
* Use when you need specific UI layouts or custom components
* Must be combined with conversation components like `<Conversation />`

***

### Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

To launch and display the messenger, implement the code below:

> **Note:** Replace `YOUR_APP_ID` and `YOUR_AI_AGENT_ID` with your Application ID and AI agent ID which you can obtain from the Sendbird Dashboard. To learn how to do so, refer to the [prerequisites](quickstart-guide-messenger.md#prerequisites) section.

```tsx
function App() {
  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
    />
  );
}
```

#### FixedMessenger styles

When using the fixed messenger, `FixedMssenger.Style` allows you to customize its appearance and positioning:

* `margin`: Defines the margin around the fixed messenger and its launcher.
* `launcherSize`: Defines the size of the launcher button in pixels (width and height are equal).
* `position`: Determines which corner of the screen the launcher will appear in. Available options are: `start-top`, `start-bottom`, `end-top` and `end-bottom`.

```tsx
function App() {
  return (
    <FixedMessenger>
      <FixedMessenger.Style position={'start-bottom'} launcherSize={32} margin={{ start:0, end:0, bottom:0, top:0 }} />
    </FixedMessenger>
  );
}
```

#### Manage user sessions

To properly manage user sessions, provide session information when initializing the messenger:

```tsx
import { ManualSessionInfo } from '@sendbird/ai-agent-messenger-react';

<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  userSessionInfo={new ManualSessionInfo({
    userId: 'user_id',
    authToken: 'auth_token',
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
      onSessionRefreshed: () => { }
    }
  })}
/>
```

The messenger view can be programmatically controlled using the `state` prop:

```tsx
function App() {
  const [opened, setOpened] = useState(true);

  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      state={{ opened, setOpened }}
    />
  );
}
```

***

### Advanced features

The following are available advanced features.

#### Display messenger without launcher button

Build custom messenger UI using AgentProviderContainer:

```tsx
import { AgentProviderContainer, Conversation } from '@sendbird/ai-agent-messenger-react';

function App() {
  return (
    <div style={{ height: '400px', border: '1px solid #ccc' }}>
      <AgentProviderContainer
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
      >
        <Conversation />
      </AgentProviderContainer>
    </div>
  );
}
```

#### De-authenticate and clear session

Component cleanup is handled automatically by React when the component unmounts, but you can also control the messenger state manually:

```tsx
function App() {
  const [messengerKey, setMessengerKey] = useState(0);

  const resetMessenger = () => {
    setMessengerKey(prev => prev + 1); // Force remount
  };

  return (
    <FixedMessenger
      key={messengerKey}
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
    />
  );
}
```

***

### Passing context object to AI agent

You can predefine customer-specific information such as country, language, or other custom context data to guide the AI Agent in providing faster and more accurate responses.

This allows for a more personalized and context-aware interaction experience.

> **Important**: These settings can only be configured during initialization.

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  // Language setting (IETF BCP 47 format)
  // default: navigator.language
  language="en-US"
  // Country code setting (ISO 3166 format)
  countryCode="US"
  // Context object for the AI Agent
  context={{
    userPreference: 'technical',
    customerTier: 'premium'
  }}
/>
```

{% hint style="info" %}
Note: You can also update or patch the context object after initialization using the `updateContext()` or `patchContext()` methods on the `messengerRef` reference. For details, see the [Context object](context-object.md) page.
{% endhint %}

***

### Localization and multi-language support

The SDK supports multiple languages and allows you to customize UI strings. You can:

* Set the language during initialization
* Customize specific strings in supported languages
* Add support for additional languages
* Dynamically load language files
