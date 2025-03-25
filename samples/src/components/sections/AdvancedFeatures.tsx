import { CODE_SAMPLES } from '../../constants/codeSamples';
import { Button } from '../ui/Button';
import { CodeEditor } from '../ui/CodeEditor';
import { Section } from '../ui/Section';
import { ConversationListDisplay } from './ConversationListDisplay';

interface Props {
  onUpdateConfig: () => void;
  onUpdateSession: () => void;
  onOpen: () => void;
  onClose: () => void;
}

export function AdvancedFeatures({ onUpdateConfig, onUpdateSession, onOpen, onClose }: Props) {
  return (
    <div className="pt-6">
      <h2 className="text-xl font-bold leading-6 text-gray-900 mb-6">Advanced Features</h2>
      <div className="space-y-8">
        <Section title="Switch Application" description="Change to a different application configuration.">
          <CodeEditor value={CODE_SAMPLES.updateConfig} language="javascript" />
          <Button onClick={onUpdateConfig}>Update Config</Button>
        </Section>

        <Section title="User Authentication" description="Set up user authentication for personalized experience.">
          <CodeEditor value={CODE_SAMPLES.updateSession} language="javascript" />
          <Button onClick={onUpdateSession}>Update Session</Button>
        </Section>

        <Section title="Manual Controls" description="Manually control the messenger visibility.">
          <CodeEditor value={CODE_SAMPLES.controls} language="javascript" />
          <div className="mt-3 space-x-3">
            <Button onClick={onOpen}>Open Messenger</Button>
            <Button onClick={onClose}>Close Messenger</Button>
          </div>
        </Section>

        <Section
          title="Conversation List Display"
          description="Display conversation list in a designated area without launcher."
        >
          <CodeEditor value={CODE_SAMPLES.customDisplay} language="javascript" />
          <ConversationListDisplay />
        </Section>
      </div>
    </div>
  );
}
