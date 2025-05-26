[iOS](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/README.md) / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / [JS](https://github.com/sendbird/sendbird-ai-agent/blob/main/js/README.md) / **React**

# Sendbird AI Agent Quickstart guide (React)

The **Sendbird AI Agent Messenger React** allows seamless integration of chatbot features into your React application.

## Component Overview

The React SDK provides two main approaches for integration:

- **`FixedMessenger`**: A predefined UI toolkit that renders a launcher button and messenger interface at a fixed position (bottom-right corner) on your website. This is the quickest way to add AI Agent functionality with minimal setup.

- **`AgentProviderContainer`**: A provider component that gives you access to individual UI modules and allows for custom messenger implementations. Use this when you want to customize the UI, integrate specific components into your existing interface, or build a completely custom messenger experience.

> **Note:**
> `FixedMessenger` already includes all required providers internally. You do **not** need to wrap it with `AgentProviderContainer`.
> Use `AgentProviderContainer` only if you want to build a custom messenger UI or use only part of the module.

- [Sendbird AI Agent Quickstart guide (React)](#sendbird-ai-agent-quickstart-guide-react)
  - [Component Overview](#component-overview)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Step 1. Install AI Agent SDK](#step-1-install-ai-agent-sdk)
    - [Step 2. Initialize AI Agent SDK](#step-2-initialize-ai-agent-sdk)
  - [Running your application](#running-your-application)
    - [Manage user sessions](#manage-user-sessions)
    - [Launch the messenger](#launch-the-messenger)
  - [Advanced Features](#advanced-features)
    - [Customizing Message Components](#customizing-message-components)
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

### Customizing Message Components

If you want to build a custom messenger UI or use only part of the module, use `AgentProviderContainer`:

```tsx
import { AgentProviderContainer, IncomingMessageLayout } from '@sendbird/ai-agent-messenger-react';

function CustomMessage() {
  const { Template: IncomingTemplate, components } = IncomingMessageLayout.useContext();

  const messageProps = {
    messageType: 'user',
    message: 'AI agent response will appear here.',
    createdAt: Date.now(),
    sender: { nickname: 'AI agent' },
    groupType: 'single',
    isBotMessage: true,
  };

  return (
    <IncomingTemplate
      {...messageProps}
      messageType="file"
      file={{
        type: 'image/jpg',
        url: 'https://picsum.photos/200/300',
      }}
    />
  );
}

function App() {
  return (
    <AgentProviderContainer appId="YOUR_APP_ID" aiAgentId="YOUR_AI_AGENT_ID">
      <CustomMessage />
    </AgentProviderContainer>
  );
}
```

### Deauthenticate and clear session

```tsx
import { FixedMessenger, useMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  const messenger = useMessenger();

  const handleLogout = () => {
    messenger.deauthenticate();
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <FixedMessenger appId="YOUR_APP_ID" aiAgentId="YOUR_AI_AGENT_ID" />
    </>
  );
}
```

### Passing context object to Agent

You can provide context information to guide the AI Agent:

```tsx
<FixedMessenger
  appId="YOUR_APP_ID"
  aiAgentId="YOUR_AI_AGENT_ID"
  language="en-US"
  countryCode="US"
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
