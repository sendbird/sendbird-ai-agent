import { Button } from '@/components/ui/Button';
import { CodeEditor } from '@/components/ui/CodeEditor';
import { Section } from '@/components/ui/Section';
import { REACT_CODE_SAMPLES } from '@/constants/codeSamples';
import { useReactMessengerState } from '@/hooks/useReactMessengerState.tsx';
import { createCommonMessengerProps } from '@/utils/messengerProps';

import {
  AgentProviderContainer,
  Conversation,
  ConversationList,
  IncomingMessageLayout,
} from '@sendbird/ai-agent-messenger-react';

import { CustomMessageComponents } from './CustomMessageComponents';

// Reusable MessengerContainer component with shared props
const MessengerContainer = ({ children, keyPrefix }: { children: React.ReactNode; keyPrefix: string }) => {
  const { appConfig, getStringSet } = useReactMessengerState();
  const commonProps = createCommonMessengerProps(appConfig, getStringSet);

  return (
    <AgentProviderContainer key={`${keyPrefix}-${appConfig.messengerKey}`} {...commonProps}>
      {children}
    </AgentProviderContainer>
  );
};

export const AdvancedFeatures = () => {
  const { appConfig, updateAppConfig, loadLanguageStringSet } = useReactMessengerState();

  return (
    <div className="pt-6">
      <h2 className="text-xl font-bold leading-6 text-gray-900 mb-6">Advanced Features</h2>
      <p className="mb-6 text-base text-gray-500">
        Explore advanced configuration options for both <strong>FixedMessenger</strong> (predefined UI) and{' '}
        <strong>AgentProviderContainer</strong> (custom UI) approaches. These features allow you to customize behavior,
        appearance, and integration patterns to match your application's needs.
      </p>
      <div className="space-y-8">
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
          description="Use AgentProviderContainer with individual UI components like Conversation and ConversationList to create custom messenger implementations. This approach allows you to integrate the messenger into specific areas of your application rather than using the fixed-position launcher."
        >
          <CodeEditor value={REACT_CODE_SAMPLES.customDisplay} language="tsx" collapsible />
          <div className="mt-4 flex gap-4">
            {/* Display Conversation view only */}
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">Conversation View</h4>
              <div className="w-[400px] h-[600px] border border-gray-300 rounded-lg overflow-hidden">
                <MessengerContainer keyPrefix="conversation">
                  <Conversation />
                </MessengerContainer>
              </div>
            </div>

            {/* Display ConversationList view only */}
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-700 mb-2">ConversationList View</h4>
              <div className="w-[400px] h-[600px] border border-gray-300 rounded-lg overflow-hidden">
                <MessengerContainer keyPrefix="conversation-list">
                  <ConversationList
                    onOpenConversationView={(channelUrl, status) => {
                      console.log('Open conversation:', channelUrl, status);
                    }}
                  />
                </MessengerContainer>
              </div>
            </div>
          </div>
        </Section>

        <Section
          title="Custom Host Configuration"
          description="Configure custom API and WebSocket hosts for proxy support or custom server endpoints."
        >
          <CodeEditor value={REACT_CODE_SAMPLES.customHosts} language="tsx" />
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
            <CodeEditor value={REACT_CODE_SAMPLES.unsupportedLanguage} language="tsx" collapsible />
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
          title="Message Layout Customization"
          description={
            <>
              Customize predefined message layouts using individual message components. This allows you to create custom
              message displays while leveraging Sendbird's built-in message rendering capabilities.
              <br />
              <em>
                Note: This feature requires AgentProviderContainer. FixedMessenger does not currently support message
                layout customization.
              </em>
            </>
          }
        >
          <CodeEditor value={REACT_CODE_SAMPLES.messageLayoutCustomization} language="tsx" collapsible />

          <div className="mt-4">
            <div className="w-[400px] h-[600px] border border-gray-300 rounded-lg overflow-hidden">
              <MessengerContainer keyPrefix="custom-layout">
                <IncomingMessageLayout.SenderAvatar component={CustomMessageComponents.SenderAvatar} />
                <IncomingMessageLayout.SenderName component={CustomMessageComponents.SenderName} />
                <IncomingMessageLayout.MessageBody component={CustomMessageComponents.MessageBody} />
                <IncomingMessageLayout.SentTime component={CustomMessageComponents.SentTime} />
                <IncomingMessageLayout.SuggestedReplies component={CustomMessageComponents.SuggestedReplies} />
                <Conversation />
              </MessengerContainer>
            </div>
          </div>
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
