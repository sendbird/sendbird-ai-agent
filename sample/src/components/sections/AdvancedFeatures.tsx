import { Button } from '@/components/ui/Button';
import { CodeEditor } from '@/components/ui/CodeEditor';
import { Section } from '@/components/ui/Section';
import { CODE_SAMPLES } from '@/constants/codeSamples';
import { useScrollIntoView } from '@/hooks/useScrollIntoView';
import { useUpdateStatus } from '@/hooks/useUpdateStatus';

import { ConversationListDisplay } from './ConversationListDisplay';

interface Props {
  onUpdateConfig: () => void;
  onUpdateSession: () => void;
  onUpdateLocale: () => void;
  onUpdateMetadata: () => void;
  onOpen: () => void;
  onClose: () => void;
}

export function AdvancedFeatures({
  onUpdateConfig,
  onUpdateSession,
  onOpen,
  onClose,
  onUpdateMetadata,
  onUpdateLocale,
}: Props) {
  useScrollIntoView();
  const configUpdate = useUpdateStatus();
  const sessionUpdate = useUpdateStatus();
  const localeUpdate = useUpdateStatus();
  const metadataUpdate = useUpdateStatus();

  return (
    <div className="pt-6">
      <h2 className="text-xl font-bold leading-6 text-gray-900 mb-6">Advanced Features</h2>
      <div className="space-y-8">
        <Section title="Switch Application" description="Change to a different application configuration.">
          <CodeEditor value={CODE_SAMPLES.updateConfig} language="javascript" />
          <Button onClick={configUpdate.withUpdateStatus(onUpdateConfig)}>
            {configUpdate.getDisplayText('Update Config')}
          </Button>
        </Section>

        <Section title="User Authentication" description="Set up user authentication for personalized experience.">
          <CodeEditor value={CODE_SAMPLES.updateSession} language="javascript" />
          <Button onClick={sessionUpdate.withUpdateStatus(onUpdateSession)}>
            {sessionUpdate.getDisplayText('Update Session')}
          </Button>
        </Section>

        <Section
          title="Manual Controls"
          description="Manually control the messenger visibility using built-in control functions."
        >
          <CodeEditor value={CODE_SAMPLES.controls} language="javascript" />
          <div className="mt-3 space-x-3">
            <Button onClick={onOpen}>Open Messenger</Button>
            <Button onClick={onClose}>Close Messenger</Button>
          </div>
        </Section>

        <Section title="Custom Display" description="Display conversation list in a designated area without launcher.">
          <CodeEditor value={CODE_SAMPLES.customDisplay} language="javascript" />
          <ConversationListDisplay />
        </Section>

        <Section
          title="Context Object"
          description="Set language and country code preferences to localize AI Agent interactions."
        >
          <CodeEditor value={CODE_SAMPLES.contextObject_locale} language="javascript" />
          <Button onClick={localeUpdate.withUpdateStatus(onUpdateLocale)}>
            {localeUpdate.getDisplayText('Update Locale Settings')}
          </Button>
        </Section>
        <Section description="Enhance AI responses by providing additional context data like user preferences and customer tiers. Send a message to see how the AI agent adapts its responses based on your context settings.">
          <CodeEditor value={CODE_SAMPLES.contextObject_message} language="javascript" />
          <Button onClick={metadataUpdate.withUpdateStatus(onUpdateMetadata)}>
            {metadataUpdate.getDisplayText('Update Message Metadata')}
          </Button>
        </Section>
      </div>
    </div>
  );
}
