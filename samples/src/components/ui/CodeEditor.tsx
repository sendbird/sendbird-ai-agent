import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';

interface Props {
  value: string;
  language: 'javascript' | 'html';
}

export function CodeEditor({ value, language }: Props) {
  const extensions = language === 'javascript' ? [javascript()] : [html()];

  return (
    <CodeMirror
      value={value}
      theme={dracula}
      extensions={extensions}
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
