import { useMemo } from 'react';

import { generateCode } from '../constants/codeSnippets';
import { Config } from '../types';

interface CodePreviewProps {
  config: Config;
  copyFeedback: { [key: string]: boolean };
  onCopy: (text: string, key: string) => void;
}

export function CodePreview({ config, copyFeedback, onCopy }: CodePreviewProps) {
  const generatedCode = useMemo(() => {
    return generateCode({
      hasSession: config.hasSession,
      language: config.language,
      context: config.context,
    });
  }, [config]);

  return (
    <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300 font-medium">Live Preview</span>
          <span className="text-xs text-gray-500">Live code based on your configuration</span>
        </div>
        <button
          onClick={() => onCopy(generatedCode, 'live-code')}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          {copyFeedback['live-code'] ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
        <code className="language-tsx">{generatedCode}</code>
      </pre>
    </div>
  );
}
