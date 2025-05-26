[iOS](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/README.md) / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / [JS](https://github.com/sendbird/sendbird-ai-agent/blob/main/js/README.md) / **React**

# Sendbird AI Agent Quickstart guide (React)

The **Sendbird AI Agent Messenger React** allows seamless integration of chatbot features into your React application.

- [Sendbird AI Agent Quickstart guide (React)](#sendbird-ai-agent-quickstart-guide-react)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Step 1. Install AI Agent SDK](#step-1-install-ai-agent-sdk)
    - [Step 2. Initialize AI Agent SDK](#step-2-initialize-ai-agent-sdk)
  - [Component Overview](#component-overview)
    - [FixedMessenger vs AgentProviderContainer](#fixedmessenger-vs-agentprovidercontainer)
  - [Running your application](#running-your-application)
    - [Manage user sessions](#manage-user-sessions)
    - [Launch the messenger](#launch-the-messenger)
  - [Advanced Features](#advanced-features)
    - [Switch Application](#switch-application)
    - [User Authentication](#user-authentication)
    - [Manual Controls](#manual-controls)
    - [Custom Display](#custom-display)
    - [Locale Configuration](#locale-configuration)
    - [Localization Customization](#localization-customization)
    - [Passing context object to Agent](#passing-context-object-to-agent)
    - [Cleanup](#cleanup)

## Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**.
<br><br/>
You can find it under the **Channels** > **Messenger** menu on the Sendbird Dashboard.

![ai-agent-app-id-agent-id](https://github.com/user-attachments/assets/37d2873e-f35d-45dd-97cc-3d7c7e638a0c)

---

## Getting Started

Quickly install and initialize the AI Agent SDK by following the steps below.

### Step 1. Install AI Agent SDK

Install the package using npm or yarn:

```bash
npm install @sendbird/ai-agent-messenger-react
# or
yarn add @sendbird/ai-agent-messenger-react
```

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

### Manage user sessions

To properly manage user sessions, provide session information when initializing the messenger:

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  userSessionInfo={{
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
  }}
/>
```

### Launch the messenger

The messenger can be controlled using the `state` prop:

```tsx
function App() {
  const [opened, setOpened] = useState(true);

  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      state={{ opened, setOpened }}
      enableCloseConversationButton
    />
  );
}
```

---

## Advanced Features

### Switch Application

Update to different application configuration:

```tsx
// Update to different application configuration
<FixedMessenger
  appId="NEW_APP_ID"
  aiAgentId="NEW_AI_AGENT_ID"
/>
```

### User Authentication

Provide user session information for authenticated experiences:

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  userSessionInfo={{
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
  }}
/>
```

### Manual Controls

Control messenger state programmatically:

```tsx
function App() {
  const [opened, setOpened] = useState(true);

  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      state={{ opened, setOpened }}
      enableCloseConversationButton
    />
  );
}
```

### Custom Display

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

### Locale Configuration

Set language and country code:

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  language="ko-KR"
  countryCode="KR"
/>
```

### Localization Customization

**Scenario 1: Customizing Strings in Supported Languages**

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  language="es-ES"
  // You can still customize certain stringSet keys even in supported language
  stringSet={{
    MESSAGE_INPUT__PLACE_HOLDER: '¡Pregúntame cualquier cosa!',
    CONVERSATION_LIST__HEADER_TITLE: 'Lista de conversaciones anteriores'
  }}
/>
```

**Scenario 2: Adding Support for Unsupported Languages**

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  language="zh-CN"
  // All stringSet keys for unsupported languages must be provided
  stringSet={{
    // Channel - Common
    CHANNEL_FROZEN: '频道已冻结',
    PLACE_HOLDER__WRONG: '出现问题',
    PLACE_HOLDER__NO_MESSAGES: '没有消息',
    UNKNOWN__UNKNOWN_MESSAGE_TYPE: '(未知消息类型)',

    // Channel - Header
    HEADER_BUTTON__AGENT_HANDOFF: '连接客服',

    // Message Input
    MESSAGE_INPUT__PLACE_HOLDER: '请输入问题',
    MESSAGE_INPUT__PLACE_HOLDER__WAIT_AI_AGENT_RESPONSE: '等待回复中...',
    MESSAGE_INPUT__PLACE_HOLDER__DISABLED: '此频道不可用',

    // Common UI
    BUTTON__CANCEL: '取消',
    BUTTON__SAVE: '保存',
    BUTTON__OK: '确定',
    NO_NAME: '(无名)',
    RETRY: '重试',

    // ... other string key-value pairs
  }}
/>
```

### Passing context object to Agent

You can provide context information to guide the AI Agent:

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  context={{
    userPreference: 'technical',
    customerTier: 'premium'
  }}
/>
```

### Cleanup

Component cleanup is handled automatically by React when the component unmounts, but you can also control the messenger state manually:

```tsx
// Component cleanup is handled automatically by React
// when the component unmounts, but you can also
// control the messenger state manually:

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

For detailed information about localization options and full list of available string sets, refer to our [Localization Guide](./MULTILANGUAGE.md).
