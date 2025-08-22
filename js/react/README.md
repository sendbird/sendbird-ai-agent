[iOS](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/README.md) / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / [JS](https://github.com/sendbird/sendbird-ai-agent/blob/main/js/)

# Sendbird AI Agent Quickstart guide (React)

The **Sendbird AI Agent Messenger React** allows seamless integration of chatbot features into your React application.

- [Sendbird AI Agent Quickstart guide (React)](#sendbird-ai-agent-quickstart-guide-react)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Step 1. Install AI Agent SDK](#step-1-install-ai-agent-sdk)
    - [Step 2. Initialize AI Agent SDK](#step-2-initialize-ai-agent-sdk)
      - [Custom Host Configuration](#custom-host-configuration)
  - [Component Overview](#component-overview)
    - [FixedMessenger vs AgentProviderContainer](#fixedmessenger-vs-agentprovidercontainer)
  - [Running your application](#running-your-application)
    - [FixedMessenger styles](#fixedmessenger-styles)
    - [Manage user sessions](#manage-user-sessions)
  - [Advanced Features](#advanced-features)
    - [Display messenger without launcher button](#display-messenger-without-launcher-button)
    - [Passing context object to Agent](#passing-context-object-to-agent)
    - [Localization and Language Support](#localization-and-language-support)

## Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**.
<br><br/>
You can find it under the **Channels** > **Messenger** menu on the Sendbird Dashboard.

![ai-agent-app-id-agent-id](https://github.com/user-attachments/assets/37d2873e-f35d-45dd-97cc-3d7c7e638a0c)

**System Requirements:**
- React >=18.0.0
- React DOM >=18.0.0
- @sendbird/chat ^4.19.0
- styled-components >=5.0.0

---

## Getting Started

Quickly install and initialize the AI Agent SDK by following the steps below.

### Step 1. Install AI Agent SDK

Install the package with its peer dependencies using npm or yarn:

```bash
npm install @sendbird/ai-agent-messenger-react @sendbird/chat styled-components
# or
yarn add @sendbird/ai-agent-messenger-react @sendbird/chat styled-components
```

> **Note:** Modern npm versions automatically install peer dependencies, but explicitly installing them ensures compatibility and avoids potential version conflicts.

### Step 2. Initialize AI Agent SDK

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

#### Custom Host Configuration

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

---

## Component Overview

### FixedMessenger vs AgentProviderContainer

**FixedMessenger:**
- Complete UI toolkit with launcher and messenger
- Fixed position (bottom-right corner)
- Includes all necessary providers internally
- Recommended for most use cases
- Use standalone without additional providers

**AgentProviderContainer:**
- Provider component for custom UI implementations
- Allows building custom messenger interfaces
- Use when you need specific UI layouts or custom components
- Must be combined with conversation components like `<Conversation />`

---

## Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

To launch and display the messenger, implement the code below:

> **Note:** Replace `YOUR_APP_ID` and `YOUR_AI_AGENT_ID` with your Application ID and AI agent ID which you can obtain from the Sendbird Dashboard. To learn how to do so, refer to the [prerequisites](#prerequisites) section.

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

### FixedMessenger styles
When using the fixed messenger, `FixedMssenger.Style` allows you to customize its appearance and positioning:
  - `margin`: Defines the margin around the fixed messenger and its launcher.
  - `launcherSize`: Defines the size of the launcher button in pixels (width and height are equal).
  - `position`: Determines which corner of the screen the launcher will appear in. Available options are: `start-top`, `start-bottom`, `end-top` and `end-bottom`.

```tsx
function App() {
  return (
    <FixedMessenger>
      <FixedMessenger.Style position={'start-bottom'} launcherSize={32} margin={{ start:0, end:0, bottom:0, top:0 }} />
    </FixedMessenger>
  );
}
```


### Manage user sessions

The SDK supports two types of user sessions: **Manual Session** for authenticated users and **Anonymous Session** for temporary users.

#### Session types

**1. Manual Session (ManualSessionInfo):**
Use this when you have an authenticated user with a specific user ID and session token.

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

**2. Anonymous Session (AnonymousSessionInfo):**
Use this for temporary users when you don't have user authentication. The server will automatically create a temporary user.

```tsx
import { AnonymousSessionInfo } from '@sendbird/ai-agent-messenger-react';

<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  userSessionInfo={new AnonymousSessionInfo()}
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

---

## Advanced Features

The following are available advanced features.

### Display messenger without launcher button

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

### Passing context object to Agent

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

### Localization and Language Support

The SDK supports multiple languages and allows you to customize UI strings. You can:

- Set the language during initialization
- Customize specific strings in supported languages
- Add support for additional languages
- Dynamically load language files

For detailed information about localization options and full list of available string sets, refer to our [Localization Guide](./MULTILANGUAGE.md).
