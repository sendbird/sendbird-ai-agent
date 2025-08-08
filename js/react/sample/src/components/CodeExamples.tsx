import { CODE_EXAMPLES } from '../constants';

interface CodeExamplesProps {
  activeExample: keyof typeof CODE_EXAMPLES;
  onExampleChange: (example: keyof typeof CODE_EXAMPLES) => void;
  copyFeedback: { [key: string]: boolean };
  onCopy: (code: string, key: string) => void;
}

export default function CodeExamples({ activeExample, onExampleChange, copyFeedback, onCopy }: CodeExamplesProps) {
  const getExampleTitle = (key: keyof typeof CODE_EXAMPLES) => {
    switch (key) {
      case 'basic':
        return 'Basic Setup';
      case 'authenticated':
        return 'With Authentication';
      case 'context':
        return 'With Context';
      case 'runtime':
        return 'Runtime Updates';
      case 'localization':
        return 'Multi-language';
      default:
        return key;
    }
  };

  const getActiveExampleTitle = () => {
    switch (activeExample) {
      case 'basic':
        return 'Basic Setup';
      case 'authenticated':
        return 'With Authentication';
      case 'context':
        return 'With Context';
      case 'runtime':
        return 'Runtime Updates';
      case 'localization':
        return 'Multi-language Support';
      default:
        return activeExample;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar - Example List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Examples</h3>
          <div className="space-y-1">
            {Object.entries(CODE_EXAMPLES).map(([key, _]) => (
              <button
                key={key}
                onClick={() => onExampleChange(key as keyof typeof CODE_EXAMPLES)}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  activeExample === key ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {getExampleTitle(key as keyof typeof CODE_EXAMPLES)}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-yellow-900 mb-2">Quick Tips</h4>
          <ul className="space-y-1 text-xs text-yellow-800">
            <li>
              • Install: <code className="bg-yellow-100 px-1 rounded">npm i @sendbird/ai-agent-messenger-react</code>
            </li>
            <li>• Import CSS in your main file</li>
            <li>• Get credentials from Sendbird Dashboard</li>
            <li>• Check console for debug logs</li>
          </ul>
        </div>
      </div>

      {/* Main Content - Code Display */}
      <div className="lg:col-span-3">
        <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300 font-medium">{getActiveExampleTitle()}</span>
              <span className="text-xs text-gray-500">React + TypeScript</span>
            </div>
            <button
              onClick={() => onCopy(CODE_EXAMPLES[activeExample], `example-${activeExample}`)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {copyFeedback[`example-${activeExample}`] ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
            <code className="language-tsx">{CODE_EXAMPLES[activeExample]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
