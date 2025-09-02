import { CONTEXT_PRESETS, LANGUAGES } from '../constants';
import { Config } from '../types';
import { PlaygroundState } from './usePlaygroundState';

interface ConfigurationSectionProps {
  config: Config;
  state: PlaygroundState;
  handleConfigUpdate: (key: keyof Pick<Config, 'hasSession' | 'language' | 'enableRuntimeUpdate'>, value: any) => void;
  handleContextChange: (value: number | string) => void;
  handleReset: () => void;
}

export function ConfigurationSection({
  config,
  state,
  handleConfigUpdate,
  handleContextChange,
  handleReset,
}: ConfigurationSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h2>

      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.hasSession}
            onChange={(e) => handleConfigUpdate('hasSession', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Authentication</span>
        </label>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          value={config.language}
          onChange={(e) => handleConfigUpdate('language', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={`${lang.code}-${lang.countryCode}`}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Context</label>
        <select
          value={state.useCustomContext ? -1 : state.contextPreset}
          onChange={(e) => handleContextChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {CONTEXT_PRESETS.map((preset, index) => (
            <option key={index} value={index}>
              {preset.label}
            </option>
          ))}
          <option value={-1}>Custom Context</option>
        </select>

        {state.useCustomContext && (
          <div className="mt-3">
            <textarea
              value={state.customContext}
              onChange={(e) => handleContextChange(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.enableRuntimeUpdate}
            onChange={(e) => handleConfigUpdate('enableRuntimeUpdate', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Runtime Context Updates</span>
        </label>
      </div>

      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        Reset Messenger
      </button>
    </div>
  );
}
