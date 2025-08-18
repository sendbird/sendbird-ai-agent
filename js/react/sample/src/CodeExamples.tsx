import { useState } from 'react';

import { LayoutWrapper } from './LayoutWrapper';
import { CODE_EXAMPLES } from './constants/codeSnippets';

export function CodeExamples() {
  const [activeExample, setActiveExample] = useState<keyof typeof CODE_EXAMPLES>('basic');
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>({});

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopyFeedback((prev) => ({ ...prev, [key]: false })), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  const leftPanel = (
    <>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Examples</h3>
        <div className="space-y-1">
          {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setActiveExample(key as keyof typeof CODE_EXAMPLES)}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                activeExample === key ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>

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
    </>
  );

  const rightPanel = (
    <>
      <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300 font-medium">{CODE_EXAMPLES[activeExample].title}</span>
            <span className="text-xs text-gray-500">React + TypeScript</span>
          </div>
          <button
            onClick={() => handleCopy(CODE_EXAMPLES[activeExample].code, `example-${activeExample}`)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {copyFeedback[`example-${activeExample}`] ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
          <code className="language-tsx">{CODE_EXAMPLES[activeExample].code}</code>
        </pre>
      </div>
    </>
  );

  return <LayoutWrapper leftPanel={leftPanel} rightPanel={rightPanel} />;
}
