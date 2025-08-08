import { CONTEXT_PRESETS, LANGUAGES, USER_ID } from '../constants';

interface Language {
  code: string;
  label: string;
  countryCode: string;
}

interface ConfigurationPanelProps {
  hasSession: boolean;
  onSessionChange: (hasSession: boolean) => void;
  selectedLanguage: Language;
  onLanguageChange: (langCode: string) => void;
  contextPreset: number;
  onContextPresetChange: (index: number) => void;
  useCustomContext: boolean;
  onCustomContextToggle: () => void;
  customContext: string;
  onCustomContextChange: (value: string) => void;
  enableRuntimeUpdate: boolean;
  onRuntimeUpdateToggle: (enabled: boolean) => void;
  onReset: () => void;
}

export default function ConfigurationPanel({
  hasSession,
  onSessionChange,
  selectedLanguage,
  onLanguageChange,
  contextPreset,
  onContextPresetChange,
  useCustomContext,
  onCustomContextToggle,
  customContext,
  onCustomContextChange,
  enableRuntimeUpdate,
  onRuntimeUpdateToggle,
  onReset,
}: ConfigurationPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Configuration</h3>

      {/* Session Toggle */}
      <div className="mb-3">
        <label className="flex items-center justify-between p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
          <span className="text-sm text-gray-700">Authentication</span>
          <input
            type="checkbox"
            checked={hasSession}
            onChange={(e) => onSessionChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
        </label>
        {hasSession && <p className="mt-1 text-xs text-gray-500 px-2">User: {USER_ID}</p>}
      </div>

      {/* Language Select */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">Language</label>
        <select
          value={selectedLanguage.code}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Context Configuration */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">Context</label>
        <select
          value={contextPreset}
          onChange={(e) => onContextPresetChange(Number(e.target.value))}
          disabled={useCustomContext}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
        >
          {CONTEXT_PRESETS.map((preset, index) => (
            <option key={index} value={index}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Context */}
      <div className="mb-3">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={useCustomContext}
            onChange={onCustomContextToggle}
            className="w-3 h-3 text-blue-600 rounded"
          />
          <span className="text-gray-700">Use Custom Context</span>
        </label>
        {useCustomContext && (
          <textarea
            value={customContext}
            onChange={(e) => onCustomContextChange(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full mt-2 h-20 px-2 py-1 text-xs border border-gray-300 rounded font-mono"
          />
        )}
      </div>

      {/* Runtime Updates */}
      <div className="mb-3">
        <label className="flex items-center justify-between p-2 bg-blue-50 rounded cursor-pointer hover:bg-blue-100">
          <span className="text-sm text-blue-700">Runtime Updates</span>
          <input
            type="checkbox"
            checked={enableRuntimeUpdate}
            onChange={(e) => onRuntimeUpdateToggle(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
        </label>
        {enableRuntimeUpdate && <p className="mt-1 text-xs text-blue-600 px-2">patchContext enabled</p>}
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-3 py-1.5 rounded transition-colors"
      >
        Reset Messenger
      </button>
    </div>
  );
}
