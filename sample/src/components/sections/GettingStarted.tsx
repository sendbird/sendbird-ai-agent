import { CodeEditor } from '@/components/ui/CodeEditor';
import { Section } from '@/components/ui/Section';
import { CODE_SAMPLES } from '@/constants/codeSamples';

export const GettingStarted = () => (
  <div className="border-b border-gray-200 pb-6">
    <h2 className="text-2xl font-bold leading-6 text-gray-900">Getting Started</h2>
    <p className="mb-6 mt-3 text-base text-gray-500">
      This web guide demonstrates a basic example of integrating the AI Agent Messenger into your web application.
      Follow along with this interactive guide to see how to implement the messenger in any browser environment without
      additional dependencies.
    </p>

    <Section
      title="Step 1. Install AI Agent SDK"
      description="Add the AI Agent SDK to your web page by importing it as a module."
    >
      <CodeEditor value={CODE_SAMPLES.loadScript} language="html" />
    </Section>

    <Section
      title="Step 2. Initialize Messenger"
      description="The messenger will be initialized and opened automatically after 2 seconds."
      titleClassName="mt-6"
    >
      <CodeEditor value={CODE_SAMPLES.initialize} language="javascript" />
    </Section>
  </div>
);
