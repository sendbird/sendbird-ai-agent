import { useMessengerState } from '../hooks/useMessengerState';
import { generateCurrentCode } from '../utils/codeGenerator';
import ConfigurationPanel from './ConfigurationPanel';
import LiveCodePreview from './LiveCodePreview';
import RuntimeUpdatesLog from './RuntimeUpdatesLog';

interface PlaygroundTabProps {
  state: ReturnType<typeof useMessengerState>;
}

export default function PlaygroundTab({ state }: PlaygroundTabProps) {
  const getCurrentCode = () => {
    return generateCurrentCode({
      hasSession: state.hasSession,
      selectedLanguage: state.selectedLanguage,
      context: state.context,
      enableRuntimeUpdate: state.enableRuntimeUpdate,
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="xl:col-span-1 space-y-4">
          <ConfigurationPanel
            hasSession={state.hasSession}
            onSessionChange={state.setHasSession}
            selectedLanguage={state.selectedLanguage}
            onLanguageChange={state.handleLanguageChange}
            contextPreset={state.contextPreset}
            onContextPresetChange={state.handleContextPresetChange}
            useCustomContext={state.useCustomContext}
            onCustomContextToggle={state.handleCustomContextToggle}
            customContext={state.customContext}
            onCustomContextChange={state.handleCustomContextChange}
            enableRuntimeUpdate={state.enableRuntimeUpdate}
            onRuntimeUpdateToggle={state.setEnableRuntimeUpdate}
            onReset={state.resetMessenger}
          />

          <RuntimeUpdatesLog updates={state.runtimeContextUpdates} />
        </div>

        {/* Right Panel - Code View */}
        <div className="xl:col-span-2">
          <LiveCodePreview
            code={getCurrentCode()}
            copyFeedback={state.copyFeedback['live-code'] || false}
            onCopy={() => state.handleCopy(getCurrentCode(), 'live-code')}
          />
        </div>
      </div>
    </main>
  );
}
