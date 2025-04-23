import { Button } from '@/components/ui/Button';
import { CodeEditor } from '@/components/ui/CodeEditor';
import { Section } from '@/components/ui/Section';
import { CODE_SAMPLES } from '@/constants/codeSamples';
import { useMessengerControls } from '@/hooks/useMessengerControls';
import { useScrollIntoView } from '@/hooks/useScrollIntoView';

import { ConversationListDisplay } from './ConversationListDisplay';

export function AdvancedFeatures() {
  const actions = useMessengerControls();

  useScrollIntoView();

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
