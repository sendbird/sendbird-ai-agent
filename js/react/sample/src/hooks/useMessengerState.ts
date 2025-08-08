import { useRef, useState } from 'react';

import { AUTH_TOKEN, CODE_EXAMPLES, CONTEXT_PRESETS, LANGUAGES, USER_ID } from '../constants';

export interface RuntimeUpdate {
  time: string;
  context: any;
}

export function useMessengerState() {
  // Tab management
  const [activeTab, setActiveTab] = useState<'playground' | 'code'>('playground');
  const [activeCodeExample, setActiveCodeExample] = useState<keyof typeof CODE_EXAMPLES>('basic');

  // Copy feedback states
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>({});

  // Messenger ref for runtime updates (temporarily disabled due to type issues)
  const messenger = useRef<any>(null);

  // Core states
  const [hasSession, setHasSession] = useState(false);
  const [messengerKey, setMessengerKey] = useState(0);

  // Feature states
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [contextPreset, setContextPreset] = useState(0);
  const [customContext, setCustomContext] = useState('');
  const [useCustomContext, setUseCustomContext] = useState(false);
  const [enableRuntimeUpdate, setEnableRuntimeUpdate] = useState(false);

  // Runtime context for display
  const [runtimeContextUpdates, setRuntimeContextUpdates] = useState<RuntimeUpdate[]>([]);

  // Determine final context
  const getCustomContextObject = () => {
    if (!customContext.trim()) return null;
    try {
      return JSON.parse(customContext);
    } catch (e) {
      return null;
    }
  };

  const context = useCustomContext ? getCustomContextObject() : CONTEXT_PRESETS[contextPreset].value;

  // Copy handler with feedback
  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyFeedback((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Helper functions
  const resetMessenger = () => {
    setMessengerKey((prev) => prev + 1);
    setRuntimeContextUpdates([]);
  };

  const handleLanguageChange = (langCode: string) => {
    const lang = LANGUAGES.find((l) => l.code === langCode);
    if (lang) {
      setSelectedLanguage(lang);
      resetMessenger();
    }
  };

  const handleContextPresetChange = (index: number) => {
    setContextPreset(index);
    setUseCustomContext(false);
    const newContext = CONTEXT_PRESETS[index].value;

    if (enableRuntimeUpdate && messenger.current && newContext) {
      updateContextRuntime(newContext);
    }
  };

  const handleCustomContextToggle = () => {
    setUseCustomContext(!useCustomContext);
    if (!useCustomContext) {
      setContextPreset(0);
    }
  };

  const updateContextRuntime = async (newContext: any) => {
    if (messenger.current) {
      try {
        await messenger.current.patchContext(newContext);
        setRuntimeContextUpdates((prev) => [...prev, { time: new Date().toISOString(), context: newContext }]);
      } catch (error) {
        console.error('Error updating context:', error);
      }
    }
  };

  const handleCustomContextChange = (value: string) => {
    setCustomContext(value);
    const parsedContext = getCustomContextObject();

    if (enableRuntimeUpdate && messenger.current && parsedContext) {
      updateContextRuntime(parsedContext);
    }
  };

  const userSessionInfo = hasSession
    ? {
        userId: USER_ID,
        authToken: AUTH_TOKEN,
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            resolve(AUTH_TOKEN);
          },
          onSessionClosed: () => {
            console.log('Session closed');
          },
          onSessionError: (error: unknown) => {
            console.error('Session error:', error);
          },
          onSessionRefreshed: () => {
            console.log('Session refreshed');
          },
        },
      }
    : undefined;

  return {
    // Tab states
    activeTab,
    setActiveTab,
    activeCodeExample,
    setActiveCodeExample,

    // Copy states
    copyFeedback,
    handleCopy,

    // Messenger states
    messenger,
    messengerKey,

    // Configuration states
    hasSession,
    setHasSession,
    selectedLanguage,
    handleLanguageChange,
    contextPreset,
    handleContextPresetChange,
    customContext,
    handleCustomContextChange,
    useCustomContext,
    handleCustomContextToggle,
    enableRuntimeUpdate,
    setEnableRuntimeUpdate,

    // Runtime states
    runtimeContextUpdates,

    // Computed values
    context,
    userSessionInfo,

    // Actions
    resetMessenger,
  };
}
