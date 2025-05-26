import { Button } from '@/components/ui/Button';
import { CodeEditor } from '@/components/ui/CodeEditor';
import { Section } from '@/components/ui/Section';
import { REACT_CODE_SAMPLES } from '@/constants/codeSamples';
import { useReactMessengerState } from '@/hooks/useReactMessengerState.tsx';

import { AgentProviderContainer, Conversation } from '@sendbird/ai-agent-messenger-react';

export const ReactAdvancedFeatures = () => {
  const { appConfig, updateAppConfig, getStringSet, loadLanguageStringSet } = useReactMessengerState();

  return (
    <div className="pt-6">
      <h2 className="text-xl font-bold leading-6 text-gray-900 mb-6">Advanced Features</h2>
      <p className="mb-6 text-base text-gray-500">
        Explore advanced configuration options for both <strong>FixedMessenger</strong> (predefined UI) and{' '}
        <strong>AgentProviderContainer</strong> (custom UI) approaches. These features allow you to customize behavior,
        appearance, and integration patterns to match your application's needs.
      </p>
      <div className="space-y-8">
        <Section title="Switch Application" description="Change to a different application configuration.">
          <CodeEditor value={REACT_CODE_SAMPLES.switchApplication} language="tsx" />
          <Button
            onClick={() =>
              updateAppConfig({
                appId: import.meta.env.VITE_NEW_APP_ID || import.meta.env.VITE_APP_ID,
                aiAgentId: import.meta.env.VITE_NEW_AI_AGENT_ID || import.meta.env.VITE_AI_AGENT_ID,
                messengerKey: appConfig.messengerKey + 1,
              })
            }
          >
            {appConfig.appId === import.meta.env.VITE_APP_ID ? 'Switch Application' : 'Application Switched'}
          </Button>
        </Section>

        <Section title="User Authentication" description="Set up user authentication for personalized experience.">
          <CodeEditor value={REACT_CODE_SAMPLES.userAuthentication} language="tsx" />
          <Button
            onClick={() =>
              updateAppConfig({
                hasSession: !appConfig.hasSession,
                messengerKey: appConfig.messengerKey + 1,
              })
            }
          >
            {appConfig.hasSession ? 'Remove Session' : 'Add Session'}
          </Button>
        </Section>

        <Section title="Manual Controls" description="Manually control the messenger visibility using React state.">
          <CodeEditor value={REACT_CODE_SAMPLES.manualControls} language="tsx" />
          <div className="mt-3 space-x-3">
            <Button onClick={() => updateAppConfig({ opened: true })}>Open Messenger</Button>
            <Button onClick={() => updateAppConfig({ opened: false })}>Close Messenger</Button>
          </div>
        </Section>

        <Section
          title="Custom Display"
          description="Use AgentProviderContainer with individual UI components like Conversation to create custom messenger implementations. This approach allows you to integrate the messenger into specific areas of your application rather than using the fixed-position launcher."
        >
          <CodeEditor value={REACT_CODE_SAMPLES.customDisplay} language="tsx" />
          <div className="mt-4 w-[400px] h-[600px] border border-gray-300 rounded-lg overflow-hidden">
            <AgentProviderContainer
              key={`custom-${appConfig.messengerKey}`}
              appId={appConfig.appId}
              aiAgentId={appConfig.aiAgentId}
              language={appConfig.currentLanguage}
              countryCode={
                appConfig.currentLanguage === 'ko-KR' ? 'KR' : appConfig.currentLanguage === 'zh-CN' ? 'CN' : 'US'
              }
              stringSet={getStringSet()}
              context={
                appConfig.hasContext
                  ? {
                      userPreference: 'technical',
                      customerTier: 'premium',
                    }
                  : undefined
              }
              userSessionInfo={
                appConfig.hasSession
                  ? {
                      userId: import.meta.env.VITE_NEW_USER_ID,
                      authToken: import.meta.env.VITE_NEW_USER_AUTH_TOKEN,
                      sessionHandler: {
                        onSessionTokenRequired: async (resolve) => {
                          resolve(import.meta.env.VITE_NEW_USER_AUTH_TOKEN);
                        },
                        onSessionClosed: () => {
                          console.log('Session closed');
                        },
                        onSessionError: (error) => {
                          console.error('Session error:', error);
                        },
                        onSessionRefreshed: () => {
                          console.log('Session refreshed');
                        },
                      },
                    }
                  : undefined
              }
            >
              <Conversation />
            </AgentProviderContainer>
          </div>
        </Section>

        <Section
          title="Locale Configuration"
          description="Configure language and country code preferences during initialization to localize AI Agent interactions."
        >
          <CodeEditor value={REACT_CODE_SAMPLES.localeConfiguration} language="tsx" />
          <Button
            onClick={() => {
              const newLanguage = appConfig.currentLanguage === 'en-US' ? 'ko-KR' : 'en-US';
              updateAppConfig({
                currentLanguage: newLanguage,
                customStringSet: null, // Reset custom strings when changing to built-in language
                messengerKey: appConfig.messengerKey + 1,
              });
            }}
          >
            {appConfig.currentLanguage === 'en-US' ? 'Try Korean Locale' : 'Try English Locale'}
          </Button>
        </Section>

        <Section
          title="Localization Customization"
          description={
            <>
              Customize specific strings in supported languages or add support for new languages by overriding the
              stringSet.
              <br />
              Currently, Sendbird messenger supports 10 built-in languages: English (en), Korean (ko), Japanese (ja),
              Spanish (es), French (fr), German (de), Italian (it), Portuguese (pt), Turkish (tr), and Hindi (hi).
            </>
          }
        >
          <Section
            title="Scenario 1: Customize strings in supported languages"
            description="Override specific UI strings in a language that Sendbird already supports. This example customizes the input placeholder and conversation list title in Spanish."
          >
            <CodeEditor value={REACT_CODE_SAMPLES.customStringSet} language="tsx" />
            <Button onClick={() => loadLanguageStringSet('es-ES')}>
              {appConfig.currentLanguage === 'es-ES' && appConfig.customStringSet
                ? 'Spanish Strings Applied'
                : 'Change messenger UI to Spanish'}
            </Button>
          </Section>

          <Section
            title="Scenario 2: Add support for unsupported languages"
            description={
              <>
                Implement full support for a language not included in Sendbird's built-in set. This example adds
                complete Chinese (zh-CN) localization by providing all required string values. You can find the full
                list of required string keys{' '}
                <a
                  className="text-primary underline"
                  href="https://github.com/sendbird/sendbird-ai-agent/blob/main/react/MULTILANGUAGE.md#default-string-keys-used-by-the-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </>
            }
          >
            <CodeEditor value={REACT_CODE_SAMPLES.unsupportedLanguage} language="tsx" />
            <div className="mt-2 space-x-3">
              <Button onClick={() => loadLanguageStringSet('zh-CN')}>
                {appConfig.currentLanguage === 'zh-CN' && appConfig.customStringSet
                  ? 'Chinese Applied'
                  : 'Switch to Chinese'}
              </Button>
              <Button onClick={() => loadLanguageStringSet('es-ES')}>
                {appConfig.currentLanguage === 'es-ES' && appConfig.customStringSet
                  ? 'Back to Spanish'
                  : 'Switch back to Spanish'}
              </Button>
            </div>
          </Section>
        </Section>

        <Section
          title="Context Object"
          description="Enhance AI responses by providing additional context data like user preferences and customer tiers. Send a message to see how the AI agent adapts its responses based on your context settings."
        >
          <CodeEditor value={REACT_CODE_SAMPLES.contextObject} language="tsx" />
          <Button
            onClick={() =>
              updateAppConfig({
                hasContext: !appConfig.hasContext,
                messengerKey: appConfig.messengerKey + 1,
              })
            }
          >
            {appConfig.hasContext ? 'Remove Context' : 'Add Context'}
          </Button>
        </Section>

        <Section
          title="Cleanup"
          description="Methods for cleaning up messenger resources and forcing component remount."
        >
          <CodeEditor value={REACT_CODE_SAMPLES.cleanup} language="tsx" />
          <Button
            onClick={() =>
              updateAppConfig({
                messengerKey: appConfig.messengerKey + 1,
              })
            }
          >
            Reset Messenger
          </Button>
        </Section>
      </div>
    </div>
  );
};
