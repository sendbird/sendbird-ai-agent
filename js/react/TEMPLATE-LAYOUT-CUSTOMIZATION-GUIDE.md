# Template-Based Layout Component Customization Guide

---

## Table of Contents

- [Template-Based Layout Component Customization Guide](#template-based-layout-component-customization-guide)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [How Template Components Work](#how-template-components-work)
  - [Available Layout Components](#available-layout-components)
  - [Component Hierarchy and Customization](#component-hierarchy-and-customization)
    - [IncomingMessageLayout](#incomingmessagelayout)
      - [Basic Customization Example](#basic-customization-example)
      - [Advanced Customization - Hiding Components](#advanced-customization---hiding-components)
    - [OutgoingMessageLayout](#outgoingmessagelayout)
      - [Customization Example](#customization-example)
    - [SystemMessageLayout](#systemmessagelayout)
      - [Customization Example](#customization-example-1)
    - [ConversationLayout](#conversationlayout)
      - [Customization Example](#customization-example-2)
    - [PlaceholderLayout](#placeholderlayout)
      - [Customization Example](#customization-example-3)
  - [Putting It All Together](#putting-it-all-together)
  - [Advanced Usage](#advanced-usage)
    - [Accessing Layout Context](#accessing-layout-context)
    - [Conditional Rendering](#conditional-rendering)
  - [Best Practices](#best-practices)

---

## Overview

The Sendbird AI Agent Messenger React SDK provides a powerful template-based layout system that allows for deep customization of UI components while maintaining the core functionality. This system uses a composition pattern where each layout component exposes a template and sub-components that can be individually customized or replaced.

### How Template Components Work

Each layout component in the SDK follows a consistent pattern:

1. **Template**: The main layout structure that orchestrates how sub-components are arranged
2. **Context**: Provides access to the template and components through `useContext()`
3. **Components**: Individual sub-components that can be customized independently

The template system uses React Context to inject custom components, allowing you to:
- Replace individual sub-components while keeping the rest of the layout intact
- Hide unwanted components by returning `null`
- Maintain the original layout structure while changing specific behaviors

---

## Available Layout Components

The SDK provides several main layout categories for customization:

- **IncomingMessageLayout**: Handles the display of messages received from AI agents or other users
- **OutgoingMessageLayout**: Controls the rendering of messages sent by the current user
- **SystemMessageLayout**: Manages system-generated messages like admin messages and CSAT surveys
- **ConversationLayout**: Orchestrates the overall conversation view structure
- **ConversationListLayout**: Controls the list view of multiple conversations
- **PlaceholderLayout**: Handles various placeholder states (loading, error, empty states)

---

## Component Hierarchy and Customization

### IncomingMessageLayout

The `IncomingMessageLayout` provides the most extensive customization options with these sub-components:

```tsx
IncomingMessageLayout.components = {
  SenderName,        // Display sender's name
  SenderAvatar,      // Display sender's avatar
  SentTime,          // Show message timestamp
  MessageBody,       // Main message content
  TypingIndicator,   // Typing animation
  SuggestedReplies,  // Quick reply buttons
  MessageTemplate,   // Rich message templates
  CTAButton,         // Call-to-action buttons
  Citation,          // Reference citations
  Form,              // Interactive forms
  MessageLogs,       // Debug/log information
}
```

#### Basic Customization Example

```tsx
import { IncomingMessageLayout, IncomingMessageProps } from '@sendbird/ai-agent-messenger-react';

// Custom message body with enhanced styling
const CustomMessageBody = (props: IncomingMessageProps) => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '12px' }}>
      {props.message}
    </div>
  );
};

// Using the custom component
export const CustomIncomingMessage = () => {
  const { Template } = IncomingMessageLayout.useContext();

  return (
    <Template>
      <IncomingMessageLayout.MessageBody component={CustomMessageBody} />
    </Template>
  );
};
```

#### Advanced Customization - Hiding Components

```tsx
export const MinimalIncomingMessage = () => {
  const { Template } = IncomingMessageLayout.useContext();

  return (
    <Template>
      <IncomingMessageLayout.MessageBody />
      <IncomingMessageLayout.TypingIndicator />
      {/* Hide these components by returning null */}
      <IncomingMessageLayout.SenderAvatar component={() => null} />
      <IncomingMessageLayout.SenderName component={() => null} />
      <IncomingMessageLayout.SentTime component={() => null} />
    </Template>
  );
};
```

### OutgoingMessageLayout

The `OutgoingMessageLayout` has a simpler structure with these components:

```tsx
OutgoingMessageLayout.components = {
  SendingStatus,  // Show sending/sent/failed status
  SentTime,       // Display timestamp
  MessageBody,    // Message content
}
```

#### Customization Example

```tsx
import { OutgoingMessageLayout, OutgoingMessageProps } from '@sendbird/ai-agent-messenger-react';

const CustomOutgoingBody = (props: OutgoingMessageProps) => {
  return (
    <div style={{ backgroundColor: '#cce5ff', padding: '10px' }}>
      {props.message}
      {props.sendingStatus === 'failed' && (
        <span style={{ color: 'red' }}>Failed to send</span>
      )}
    </div>
  );
};

export const CustomOutgoingMessage = () => {
  const { Template } = OutgoingMessageLayout.useContext();

  return <Template template={CustomOutgoingBody} />;
};
```

### SystemMessageLayout

System messages handle administrative content and surveys:

```tsx
SystemMessageLayout.components = {
  AdminMessage,  // General system messages
  CSATMessage,   // Customer satisfaction surveys
}
```

#### Customization Example

```tsx
import { SystemMessageLayout, SystemMessageProps } from '@sendbird/ai-agent-messenger-react';

const CustomAdminMessage = (props: SystemMessageProps) => {
  if (props.messageType !== 'admin') return null;

  return (
    <div style={{ textAlign: 'center', padding: '8px' }}>
      =� {props.message}
    </div>
  );
};

const CustomCSATMessage = (props: SystemMessageProps) => {
  if (props.messageType !== 'admin.csat') return null;

  return (
    <div style={{ padding: '16px' }}>
      <h3>Rate your experience</h3>
      {/* Custom rating UI */}
    </div>
  );
};

export const CustomSystemMessages = () => {
  return (
    <>
      <SystemMessageLayout.AdminMessage component={CustomAdminMessage} />
      <SystemMessageLayout.CSATMessage component={CustomCSATMessage} />
    </>
  );
};
```

### ConversationLayout

The conversation layout controls the overall chat interface structure:

```tsx
ConversationLayout.components = {
  Header,  // Conversation header/title bar
  Body,    // Message list container
  Footer,  // Input area and controls
}
```

#### Customization Example

```tsx
import { ConversationLayout } from '@sendbird/ai-agent-messenger-react';

const CustomHeader = () => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#2c3e50', color: 'white' }}>
      <h2>AI Support Chat</h2>
    </div>
  );
};

const CustomFooter = () => {
  return (
    <div style={{ padding: '16px' }}>
      <input type="text" placeholder="Type your message..." />
    </div>
  );
};

export const CustomConversation = () => {
  return (
    <>
      <ConversationLayout.Header component={CustomHeader} />
      <ConversationLayout.Body />
      <ConversationLayout.Footer component={CustomFooter} />
    </>
  );
};
```

### PlaceholderLayout

Placeholder layouts handle different states:

```tsx
PlaceholderLayout.components = {
  Loading,     // Loading state
  Error,       // Error state
  NoChannels,  // Empty conversation list
  NoMessages,  // Empty message list
}
```

#### Customization Example

```tsx
import { PlaceholderLayout, PlaceholderTemplateProps } from '@sendbird/ai-agent-messenger-react';

const CustomLoading = (props: PlaceholderTemplateProps) => {
  return <div>Loading conversations...</div>;
};

const CustomError = (props: PlaceholderTemplateProps) => {
  return (
    <div>
      <h3>Something went wrong</h3>
      <p>{props.error?.message}</p>
    </div>
  );
};

export const CustomPlaceholders = () => {
  const { Template } = PlaceholderLayout.useContext();

  return (
    <Template>
      <PlaceholderLayout.Loading component={CustomLoading} />
      <PlaceholderLayout.Error component={CustomError} />
    </Template>
  );
};
```

---

## Putting It All Together

After defining your custom components, you need to provide them to the SDK. All layout customizations should be wrapped within `AgentUIProviderContainer`:

```tsx
import {
  AgentUIProviderContainer,
  Conversation,
  IncomingMessageLayout,
  OutgoingMessageLayout,
  SystemMessageLayout,
  ConversationLayout,
  IncomingMessageProps,
  OutgoingMessageProps,
  SystemMessageProps,
} from '@sendbird/ai-agent-messenger-react';

// Your custom components
const CustomMessageBody = (props: IncomingMessageProps) => { /* ... */ };
const CustomOutgoingBody = (props: OutgoingMessageProps) => { /* ... */ };
const CustomAdminMessage = (props: SystemMessageProps) => { /* ... */ };
const CustomFooter = () => { /* ... */ };

export const MyCustomMessenger = () => {
  return (
    <AgentUIProviderContainer appearance={{ theme: 'light' }}>
      {/* Apply all customizations */}
      <IncomingMessageLayout.Template>
        <IncomingMessageLayout.MessageBody component={CustomMessageBody} />
        <IncomingMessageLayout.SenderAvatar component={() => null} />
      </IncomingMessageLayout.Template>

      <OutgoingMessageLayout.Template template={CustomOutgoingBody} />

      <SystemMessageLayout.AdminMessage component={CustomAdminMessage} />

      <ConversationLayout.Footer component={CustomFooter} />

      {/* Your conversation component */}
      <Conversation channelUrl="your-channel-url" />
    </AgentUIProviderContainer>
  );
};
```

---

## Advanced Usage

### Accessing Layout Context

You can access the current layout configuration within custom components:

```tsx
const CustomMessageBody = (props: IncomingMessageProps) => {
  const { components, Template } = IncomingMessageLayout.useContext();

  // Access other components or the template
  return (
    <div>
      {/* Your custom implementation */}
      {props.message}
    </div>
  );
};
```

### Conditional Rendering

Customize components based on specific conditions:

```tsx
const ConditionalMessage = (props: IncomingMessageProps) => {
  const { components } = IncomingMessageLayout.useContext();

  if (props.isBotMessage) {
    return <components.MessageBody {...props} />;
  }

  return <CustomUserMessage {...props} />;
};
```

---

## Best Practices

1. **Maintain Prop Compatibility**: When creating custom components, ensure they accept and handle the same props as the default components.

2. **Hiding Components**: To hide a component, pass a function that returns `null` to the `component` prop (e.g., `component={() => null}`). If you omit the component prop entirely, the default UI will be rendered instead.

3. **Preserve Context Access**: Custom components can access the layout context using `LayoutName.useContext()` to get access to other components.

4. **Style Consistently**: Maintain visual consistency with your application's design system while customizing components.

5. **Handle All Message Types**: Ensure custom message body components handle different message types (text, file, image, etc.).
