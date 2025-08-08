import { MutableRefObject, useState } from 'react';

import { LayoutWrapper } from './LayoutWrapper';
import { CONTEXT_PRESETS, LANGUAGES } from './constants';

interface Config {
  hasSession: boolean;
  language: string;
  context: any;
  enableRuntimeUpdate: boolean;
}

interface PlaygroundConfigProps {
  config: Config;
  onConfigChange: (updates: Partial<Config>) => void;
  onReset: () => void;
  messengerRef: MutableRefObject<any>;
  copyFeedback: { [key: string]: boolean };
  onCopy: (text: string, key: string) => void;
}

export function PlaygroundConfig({
  config,
  onConfigChange,
  onReset,
  messengerRef,
  copyFeedback,
  onCopy,
}: PlaygroundConfigProps) {
  const [contextPreset, setContextPreset] = useState(0);
  const [useCustomContext, setUseCustomContext] = useState(false);
  const [customContext, setCustomContext] = useState('');
  const [runtimeUpdates, setRuntimeUpdates] = useState<Array<{ time: string; context: any }>>([]);

  // Generate current code based on config
  const generateCode = () => {
    const lines = [`import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';`];

    if (config.hasSession) {
      lines.push(`
function App() {
  return (
    <FixedMessenger
      appId="F7879BE3-A59C-4134-A04A-702A1E62A9C0"
      aiAgentId="9ec48481-26d4-41b3-a3d7-68f20c0aeb1c"
      userSessionInfo={{
        userId: "test-user-123",
        authToken: "test-auth-token",
        sessionHandler: {
          onSessionTokenRequired: async (resolve) => {
            resolve("test-auth-token");
          }
        }
      }}${
        config.context
          ? `
      context={${JSON.stringify(config.context, null, 2)}}`
          : ''
      }${
        config.language !== 'en-US'
          ? `
      language="${config.language.split('-')[0]}"
      countryCode="${config.language.split('-')[1]}"`
          : ''
      }
    />
  );
}`);
    } else {
      lines.push(`
function App() {
  return (
    <FixedMessenger
      appId="F7879BE3-A59C-4134-A04A-702A1E62A9C0"
      aiAgentId="9ec48481-26d4-41b3-a3d7-68f20c0aeb1c"${
        config.context
          ? `
      context={${JSON.stringify(config.context, null, 2)}}`
          : ''
      }${
        config.language !== 'en-US'
          ? `
      language="${config.language.split('-')[0]}"
      countryCode="${config.language.split('-')[1]}"`
          : ''
      }
    />
  );
}`);
    }

    return lines.join('\n');
  };

  const handleContextPresetChange = (index: number) => {
    setContextPreset(index);
    setUseCustomContext(false);
    const newContext = CONTEXT_PRESETS[index].value;
    onConfigChange({ context: newContext });

    if (config.enableRuntimeUpdate && messengerRef.current && newContext) {
      messengerRef.current
        .patchContext(newContext)
        .then(() => {
          setRuntimeUpdates((prev) => [...prev, { time: new Date().toISOString(), context: newContext }]);
        })
        .catch(console.error);
    }
  };

  const handleCustomContextChange = (value: string) => {
    setCustomContext(value);
    try {
      const parsedContext = JSON.parse(value);
      onConfigChange({ context: parsedContext });

      if (config.enableRuntimeUpdate && messengerRef.current) {
        messengerRef.current
          .patchContext(parsedContext)
          .then(() => {
            setRuntimeUpdates((prev) => [...prev, { time: new Date().toISOString(), context: parsedContext }]);
          })
          .catch(console.error);
      }
    } catch (e) {
      // Invalid JSON, don't update
    }
  };

  const leftPanel = (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h2>

        {/* Authentication */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.hasSession}
              onChange={(e) => onConfigChange({ hasSession: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Authentication</span>
          </label>
        </div>

        {/* Language */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={config.language}
            onChange={(e) => {
              onConfigChange({ language: e.target.value });
              onReset();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={`${lang.code}-${lang.countryCode}`}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Context */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Context</label>
          <select
            value={useCustomContext ? -1 : contextPreset}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value === -1) {
                setUseCustomContext(true);
                onConfigChange({ context: null });
              } else {
                handleContextPresetChange(value);
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {CONTEXT_PRESETS.map((preset, index) => (
              <option key={index} value={index}>
                {preset.label}
              </option>
            ))}
            <option value={-1}>Custom Context</option>
          </select>

          {useCustomContext && (
            <div className="mt-3">
              <textarea
                value={customContext}
                onChange={(e) => handleCustomContextChange(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>
          )}
        </div>

        {/* Runtime Updates */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.enableRuntimeUpdate}
              onChange={(e) => onConfigChange({ enableRuntimeUpdate: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Runtime Updates</span>
          </label>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset Messenger
        </button>
      </div>

      {/* Runtime Updates Log */}
      {config.enableRuntimeUpdate && runtimeUpdates.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Runtime Updates Log</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {runtimeUpdates.map((update, index) => (
              <div key={index} className="text-xs">
                <div className="text-gray-600">{new Date(update.time).toLocaleTimeString()}</div>
                <pre className="bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(update.context, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const rightPanel = (
    <>
      <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300 font-medium">Live Preview</span>
            <span className="text-xs text-gray-500">Live code based on your configuration</span>
          </div>
          <button
            onClick={() => onCopy(generateCode(), 'live-code')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {copyFeedback['live-code'] ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
          <code className="language-tsx">{generateCode()}</code>
        </pre>
      </div>
    </>
  );

  return <LayoutWrapper leftPanel={leftPanel} rightPanel={rightPanel} />;
}
