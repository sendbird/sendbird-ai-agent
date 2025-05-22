# Sendbird AI Agent SDK Localization Guide (React)

This guide explains how to localize the UI strings used in the Sendbird AI Agent SDK for React to support multiple languages in your React application.

---

## Table of Contents

- [Sendbird AI Agent SDK Localization Guide (React)](#sendbird-ai-agent-sdk-localization-guide-react)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Supported Languages](#supported-languages)
  - [Setting the Language](#setting-the-language)
  - [Customizing Strings](#customizing-strings)
    - [Scenario 1: Customizing Strings in Supported Languages](#scenario-1-customizing-strings-in-supported-languages)
    - [Scenario 2: Adding Support for Unsupported Languages](#scenario-2-adding-support-for-unsupported-languages)
  - [Default String Keys Used by the SDK](#default-string-keys-used-by-the-sdk)
  - [Implementation Examples](#implementation-examples)

---

## Overview

Sendbird AI Agent SDK for React includes a default set of user-facing strings such as button labels, error messages, input hints, and system texts. To support internationalization, you can set the language preference during component initialization or update it later using the `AgentUIProviderContainer` component.

The language setting influences both the UI text displayed in the messenger and potentially the AI Agent's responses.

---

## Supported Languages

The SDK currently provides built-in localization for the following languages:

- English (`en`)
- German (`de`)
- Spanish (`es`)
- French (`fr`)
- Hindi (`hi`)
- Italian (`it`)
- Japanese (`ja`)
- Korean (`ko`)
- Portuguese (`pt`)
- Turkish (`tr`)

If you need support for a language that is not listed above, you can customize the SDK strings by providing a complete set of string values.

---

## Setting the Language

You can set the language during component initialization:

```tsx
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      // Set language in IETF BCP 47 format (e.g., "ko-KR", "en-US")
      // Default is navigator.language if not specified
      language="ko-KR"
      // Set country code in ISO 3166 format (e.g., "KR", "US")
      countryCode="KR"
    />
  );
}
```

Or update it using the `AgentUIProviderContainer`:

```tsx
import { AgentUIProviderContainer } from '@sendbird/ai-agent-messenger-react';

function App() {
  return (
    <AgentUIProviderContainer
      language="es-ES"
    >
      {/* Your messenger components */}
    </AgentUIProviderContainer>
  );
}
```

---

## Customizing Strings

There are two scenarios where you might want to customize the strings used in the messenger UI:

### Scenario 1: Customizing Strings in Supported Languages

You can override specific UI strings in a language that Sendbird already supports:

```tsx
// Example: Customize specific strings in Spanish
const customStringSet = {
  MESSAGE_INPUT__PLACE_HOLDER: '¡Pregúntame cualquier cosa!',
  CONVERSATION_LIST__HEADER_TITLE: 'Lista de conversaciones anteriores'
};

function App() {
  return (
    <AgentUIProviderContainer
      language="es-ES"
      stringSet={customStringSet}
    >
      <FixedMessenger
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
      />
    </AgentUIProviderContainer>
  );
}
```

### Scenario 2: Adding Support for Unsupported Languages

For languages not supported by Sendbird, you must provide a complete set of string values:

```tsx
// Example: Add support for Chinese (zh-CN)
const chineseStringSet = {
  CHANNEL_FROZEN: '频道已冻结',
  PLACE_HOLDER__WRONG: '出现问题',
  // ... all other required strings
};

function App() {
  return (
    <AgentUIProviderContainer
      language="zh-CN"
      stringSet={chineseStringSet}
    >
      <FixedMessenger
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
      />
    </AgentUIProviderContainer>
  );
}
```

---

## Default String Keys Used by the SDK

The string keys remain the same as the JavaScript version. Please refer to the [JavaScript version's string keys](#default-string-keys-used-by-the-sdk) for the complete list.

---

## Implementation Examples

**Best Practice for Organizing Language Files:**

```tsx
// languages/zh.ts
export const zhStringSet = {
  CHANNEL_FROZEN: '频道已冻结',
  // ... all other strings
};

// App.tsx
import { zhStringSet } from './languages/zh';

function App() {
  return (
    <AgentUIProviderContainer
      language="zh-CN"
      stringSet={zhStringSet}
    >
      <FixedMessenger
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
      />
    </AgentUIProviderContainer>
  );
}
```

**Language Switching with React:**

```tsx
function App() {
  const [language, setLanguage] = useState('en-US');
  const [stringSet, setStringSet] = useState(undefined);

  const switchLanguage = async (newLanguage: string) => {
    if (newLanguage === 'zh-CN') {
      const { zhStringSet } = await import('./languages/zh');
      setStringSet(zhStringSet);
    } else {
      setStringSet(undefined);
    }
    setLanguage(newLanguage);
  };

  return (
    <AgentUIProviderContainer
      language={language}
      stringSet={stringSet}
    >
      <div>
        <button onClick={() => switchLanguage('zh-CN')}>Switch to Chinese</button>
        <button onClick={() => switchLanguage('en-US')}>Switch to English</button>
      </div>
      <FixedMessenger
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
      />
    </AgentUIProviderContainer>
  );
}
```

**Dynamic Language Loading with React:**

```tsx
function App() {
  const [language, setLanguage] = useState('en-US');
  const [stringSet, setStringSet] = useState(undefined);

  const loadLanguage = async (newLanguage: string) => {
    let newStringSet;

    try {
      const module = await import(`./languages/${newLanguage}.ts`);
      newStringSet = module.default;
    } catch {
      // Fallback to default strings for supported languages
      newStringSet = undefined;
    }

    setLanguage(newLanguage);
    setStringSet(newStringSet);
  };

  return (
    <AgentUIProviderContainer
      language={language}
      stringSet={stringSet}
    >
      <FixedMessenger
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
      />
    </AgentUIProviderContainer>
  );
}
```

This approach ensures efficient loading of language resources while maintaining a clean and maintainable codebase in your React application.
