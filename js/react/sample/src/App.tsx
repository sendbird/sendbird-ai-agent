import 'prismjs/themes/prism-tomorrow.css';

import { FixedMessenger } from '@sendbird/ai-agent-messenger-react';
import '@sendbird/ai-agent-messenger-react/index.css';

import CodeExamples from './components/CodeExamples';
import Header from './components/Header';
import PlaygroundTab from './components/PlaygroundTab';
import { AI_AGENT_ID, APP_ID } from './constants';
import { useMessengerState } from './hooks/useMessengerState';
import { usePrismHighlighting } from './hooks/usePrismHighlighting';

function App() {
  const state = useMessengerState();

  // Handle syntax highlighting
  usePrismHighlighting({
    dependencies: [
      state.activeTab,
      state.activeCodeExample,
      state.hasSession,
      state.selectedLanguage,
      state.context,
      state.enableRuntimeUpdate,
    ],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={state.activeTab} onTabChange={state.setActiveTab} />

      {/* Main Content */}
      {state.activeTab === 'playground' ? (
        <PlaygroundTab state={state} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <CodeExamples
            activeExample={state.activeCodeExample}
            onExampleChange={state.setActiveCodeExample}
            copyFeedback={state.copyFeedback}
            onCopy={state.handleCopy}
          />
        </main>
      )}

      {/* Messenger Component */}
      <FixedMessenger
        key={`messenger-${state.messengerKey}`}
        appId={APP_ID}
        aiAgentId={AI_AGENT_ID}
        userSessionInfo={state.userSessionInfo}
        context={state.context}
        language={state.selectedLanguage.code}
        countryCode={state.selectedLanguage.countryCode}
      />
    </div>
  );
}

export default App;
