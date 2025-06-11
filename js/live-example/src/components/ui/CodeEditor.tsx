import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

interface Props {
  value: string;
  language: 'javascript' | 'tsx' | 'html' | 'bash';
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function CodeEditor({ value, language, collapsible = false, defaultExpanded = false }: Props) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getExtensions = () => {
    switch (language) {
      case 'javascript':
      case 'tsx':
        return [javascript({ jsx: true, typescript: true })];
      case 'html':
        return [html()];
      case 'bash':
      default:
        return []; // Use plain text for bash
    }
  };

  const getPreviewValue = (code: string, maxLines: number = 10) => {
    const lines = code.split('\n');
    if (lines.length <= maxLines) return code;
    return lines.slice(0, maxLines).join('\n') + '\n\n// ... (click to expand)';
  };

  const displayValue = collapsible && !isExpanded ? getPreviewValue(value) : value;

  if (collapsible) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Code Example</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Collapse
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Expand
              </>
            )}
          </button>
        </div>
        <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-80 overflow-hidden'}`}>
          <CodeMirror
            value={displayValue}
            theme={dracula}
            extensions={getExtensions()}
            readOnly
            height="auto"
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLineGutter: false,
              highlightActiveLine: false,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <CodeMirror
      value={value}
      theme={dracula}
      extensions={getExtensions()}
      readOnly
      height="auto"
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        highlightActiveLineGutter: false,
        highlightActiveLine: false,
      }}
    />
  );
}
