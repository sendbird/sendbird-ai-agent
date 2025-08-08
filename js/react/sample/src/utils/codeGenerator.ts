import { AI_AGENT_ID, APP_ID } from '../constants';

interface Language {
  code: string;
  label: string;
  countryCode: string;
}

interface CodeGeneratorOptions {
  hasSession: boolean;
  selectedLanguage: Language;
  context: any;
  enableRuntimeUpdate: boolean;
}

export function generateCurrentCode({
  hasSession,
  selectedLanguage,
  context,
  enableRuntimeUpdate,
}: CodeGeneratorOptions): string {
  const imports = [`import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';`];
  const states = [];
  const componentProps = [`      appId="${APP_ID}"`, `      aiAgentId="${AI_AGENT_ID}"`];

  if (enableRuntimeUpdate) {
    imports.push(`import { useRef } from 'react';`);
    states.push(`const messenger = useRef(null);`);
    componentProps.push(`      ref={messenger}`);
  }

  if (hasSession) {
    componentProps.push(`      userSessionInfo={userSessionInfo}`);
  }

  if (context) {
    const contextString = JSON.stringify(context, null, 2);
    const contextLines = contextString.split('\n');
    if (contextLines.length === 1) {
      componentProps.push(`      context={${contextString}}`);
    } else {
      const indentedContext = contextLines
        .map((line, index) => {
          if (index === 0) return `      context={${line}`;
          if (index === contextLines.length - 1) return `      ${line}}`;
          return `      ${line}`;
        })
        .join('\n');
      componentProps.push(indentedContext);
    }
  }

  if (selectedLanguage.code !== 'en-US') {
    componentProps.push(`      language="${selectedLanguage.code}"`);
    componentProps.push(`      countryCode="${selectedLanguage.countryCode}"`);
  }

  return `${imports.join('\n')}

function App() {${states.length > 0 ? '\n  ' + states.join('\n  ') + '\n' : ''}
  return (
    <FixedMessenger
${componentProps.join('\n')}
    />
  );
}`;
}
