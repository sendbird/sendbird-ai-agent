import { MutableRefObject, useCallback, useState } from 'react';

import { MessengerSessionRef } from '@sendbird/ai-agent-messenger-react';

import { CONTEXT_PRESETS } from '../constants';
import { Config, ConfigKey, DEFAULT_PLAYGROUND_CONFIG } from '../types';

export interface PlaygroundState {
  contextPreset: number;
  useCustomContext: boolean;
  customContext: string;
  runtimeUpdates: Array<{ time: string; context: Record<string, string> | null }>;
}

const DEFAULT_STATE: PlaygroundState = {
  contextPreset: 0,
  useCustomContext: false,
  customContext: '',
  runtimeUpdates: [],
};

interface UsePlaygroundStateProps {
  config: Config;
  onConfigChange: (updates: Partial<Config>) => void;
  messengerRef: MutableRefObject<MessengerSessionRef | null>;
}

export function usePlaygroundState({ config, onConfigChange, messengerRef }: UsePlaygroundStateProps) {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE);

  const handleReset = useCallback(() => {
    setState(DEFAULT_STATE);

    onConfigChange(DEFAULT_PLAYGROUND_CONFIG);
  }, [onConfigChange]);

  const handleConfigUpdate = useCallback(
    (key: ConfigKey, value: any) => {
      onConfigChange({ [key]: value });
    },
    [onConfigChange],
  );

  const handleContextChange = useCallback(
    (value: number | string) => {
      if (typeof value === 'number') {
        if (value === -1) {
          setState((prev) => ({ ...prev, useCustomContext: true }));
          onConfigChange({ context: null });
        } else {
          const newContext = CONTEXT_PRESETS[value].value;
          setState((prev) => ({ ...prev, contextPreset: value, useCustomContext: false }));
          onConfigChange({ context: newContext });

          if (config.enableRuntimeUpdate && messengerRef.current && newContext) {
            messengerRef.current
              .patchContext(newContext)
              .then(() => {
                setState((prev) => ({
                  ...prev,
                  runtimeUpdates: [
                    ...prev.runtimeUpdates,
                    {
                      time: new Date().toISOString(),
                      context: newContext,
                    },
                  ],
                }));
              })
              .catch(console.error);
          }
        }
      } else {
        setState((prev) => ({ ...prev, customContext: value }));
        try {
          const parsedContext = JSON.parse(value);
          onConfigChange({ context: parsedContext });

          if (config.enableRuntimeUpdate && messengerRef.current) {
            messengerRef.current
              .patchContext(parsedContext)
              .then(() => {
                setState((prev) => ({
                  ...prev,
                  runtimeUpdates: [
                    ...prev.runtimeUpdates,
                    {
                      time: new Date().toISOString(),
                      context: parsedContext,
                    },
                  ],
                }));
              })
              .catch(console.error);
          }
        } catch (e) {}
      }
    },
    [config.enableRuntimeUpdate, messengerRef, onConfigChange],
  );

  return {
    state,
    handleConfigUpdate,
    handleContextChange,
    handleReset,
  };
}
