import { Button } from '@/components/ui/Button';
import { CodeEditor } from '@/components/ui/CodeEditor';
import { Section } from '@/components/ui/Section';
import { CODE_SAMPLES } from '@/constants/codeSamples';
import { useMessengerControls } from '@/hooks/useMessengerControls';
import { useScrollIntoView } from '@/hooks/useScrollIntoView';
import { useEffect } from 'react';

import { ConversationListDisplay } from './ConversationListDisplay';

export function AdvancedFeatures() {
  const actions = useMessengerControls();

  useScrollIntoView();

  // Cleanup CDN messenger when component unmounts
  useEffect(() => {
    return () => {
      // Destroy the CDN messenger instance when switching to React tab
      actions.cleanup.destroy.execute();
    };
  }, [actions.cleanup.destroy]);

  return (
    <div className="pt-6">
      <h2 className="text-xl font-bold leading-6 text-gray-900 mb-6">Advanced Features</h2>
      <div className="space-y-8">
        <Section title="Switch Application" description="Change to a different application configuration.">
          <CodeEditor value={CODE_SAMPLES.updateConfig} language="javascript" />
          <Button onClick={actions.config.execute}>{actions.config.getDisplayText('Update Config')}</Button>
        </Section>

        <Section title="User Authentication" description="Set up user authentication for personalized experience.">
          <CodeEditor value={CODE_SAMPLES.updateSession} language="javascript" />
          <Button onClick={actions.session.execute}>{actions.session.getDisplayText('Update Session')}</Button>
        </Section>

        <Section
          title="Manual Controls"
          description="Manually control the messenger visibility using built-in control functions."
        >
          <CodeEditor value={CODE_SAMPLES.controls} language="javascript" />
          <div className="mt-3 space-x-3">
            <Button onClick={actions.open.execute}>Open Messenger</Button>
            <Button onClick={actions.close.execute}>Close Messenger</Button>
          </div>
        </Section>

        <Section title="Custom Display" description="Display conversation list in a designated area without launcher.">
          <CodeEditor value={CODE_SAMPLES.customDisplay} language="javascript" />
          <ConversationListDisplay />
        </Section>

        <Section
          title="Locale Configuration"
          description="Configure language and country code preferences during initialization to localize AI Agent interactions."
        >
          <CodeEditor value={CODE_SAMPLES.messenger_locale} language="javascript" />
          <Button onClick={actions.locale.execute}>{actions.locale.getDisplayText('Try locale settings')}</Button>
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
            <CodeEditor value={CODE_SAMPLES.custom_stringset} language="javascript" />

            <Button onClick={actions.custom_stringset?.execute}>
              {actions.custom_stringset?.getDisplayText('Change messenger UI to Spanish')}
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
                  href="https://github.com/sendbird/sendbird-ai-agent/blob/main/js/MULTILANGUAGE.md#default-string-keys-used-by-the-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </>
            }
          >
            <CodeEditor value={CODE_SAMPLES.unsupported_language} language="javascript" />

            <div className="mt-2 space-x-3">
              <Button onClick={actions.unsupported_language?.execute}>
                {actions.unsupported_language?.getDisplayText('Switch to Chinese')}
              </Button>
              <Button onClick={actions.switch_language_back?.execute}>
                {actions.switch_language_back?.getDisplayText('Switch back to Spanish')}
              </Button>
            </div>
          </Section>
        </Section>

        <Section
          title="Context Object"
          description="Enhance AI responses by providing additional context data like user preferences and customer tiers. Send a message to see how the AI agent adapts its responses based on your context settings."
        >
          <CodeEditor value={CODE_SAMPLES.messenger_context} language="javascript" />
          <Button onClick={actions.context.execute}>{actions.context.getDisplayText('Update Context')}</Button>
        </Section>

        <Section title="Cleanup" description="Methods for cleaning up messenger resources and session data.">
          <CodeEditor value={CODE_SAMPLES.cleanup} language="javascript" />
          <div className="mt-3 space-x-3">
            <Button onClick={actions.cleanup.deauthenticate.execute}>
              {actions.cleanup.deauthenticate.getDisplayText('Deauthenticate')}
            </Button>
            <Button onClick={actions.cleanup.destroy.execute}>
              {actions.cleanup.destroy.getDisplayText('Destroy UI')}
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
