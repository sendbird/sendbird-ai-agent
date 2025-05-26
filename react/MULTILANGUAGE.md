# Sendbird AI Agent SDK Localization Guide (React)

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
  - [Language Switching with React](#language-switching-with-react)
  - [Dynamic Language Loading with React](#dynamic-language-loading-with-react)
  - [Note](#note)
  - [Default String Keys Used by the SDK](#default-string-keys-used-by-the-sdk)
  - [Implementation Examples](#implementation-examples)

---

## Overview

Sendbird AI Agent SDK for React includes a default set of user-facing strings such as button labels, error messages, input hints, and system texts. To support internationalization, you can set the language preference during component initialization or update it later using the `FixedMessenger` props.

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
      language="ko-KR"
      countryCode="KR"
    />
  );
}
```

## Customizing Strings

### Scenario 1: Customizing Strings in Supported Languages

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

### Scenario 2: Adding Support for Unsupported Languages

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

## Language Switching with React

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
    <>
      <button onClick={() => switchLanguage('zh-CN')}>Switch to Chinese</button>
      <button onClick={() => switchLanguage('en-US')}>Switch to English</button>
      <FixedMessenger
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
        language={language}
        stringSet={stringSet}
      />
    </>
  );
}
```

## Dynamic Language Loading with React

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
      newStringSet = undefined;
    }
    setLanguage(newLanguage);
    setStringSet(newStringSet);
  };

  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      language={language}
      stringSet={stringSet}
    />
  );
}
```

---

## Note

- **Use `FixedMessenger` standalone for most use cases.**
- Use `AgentProviderContainer` only if you want to build a custom messenger UI or use only part of the module.
- Do not use `AgentUIProviderContainer` directly unless you have a very special use case (e.g., dashboard/tester).

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
import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';

function App() {
  return (
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      language="zh-CN"
      stringSet={zhStringSet}
    />
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
    <>
      <button onClick={() => switchLanguage('zh-CN')}>Switch to Chinese</button>
      <button onClick={() => switchLanguage('en-US')}>Switch to English</button>
      <FixedMessenger
        appId="YOUR_APP_ID"
        aiAgentId="YOUR_AI_AGENT_ID"
        language={language}
        stringSet={stringSet}
      />
    </>
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
    <FixedMessenger
      appId="YOUR_APP_ID"
      aiAgentId="YOUR_AI_AGENT_ID"
      language={language}
      stringSet={stringSet}
    />
  );
}
```

This approach ensures efficient loading of language resources while maintaining a clean and maintainable codebase in your React application.
