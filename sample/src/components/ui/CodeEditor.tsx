import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';

interface Props {
  value: string;
  language: 'javascript' | 'tsx' | 'html' | 'bash';
}

export function CodeEditor({ value, language }: Props) {
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
