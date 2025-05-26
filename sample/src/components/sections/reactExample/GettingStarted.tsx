import { CodeEditor } from '@/components/ui/CodeEditor';
import { Section } from '@/components/ui/Section';
import { REACT_CODE_SAMPLES } from '@/constants/codeSamples';

export const ReactGettingStarted = () => (
  <div className="border-b border-gray-200 pb-6">
    <h2 className="text-2xl font-bold leading-6 text-gray-900">Getting Started</h2>
    <p className="mb-6 mt-3 text-base text-gray-500">
      This example demonstrates how to integrate the AI Agent Messenger into your React application using the npm
      package. Follow along with this interactive guide to see how to implement the messenger in your React components.
    </p>

    <Section title="Step 1. Install AI Agent SDK" description="Install the package using npm or yarn.">
      <CodeEditor value={REACT_CODE_SAMPLES.installation} language="bash" />
    </Section>

    <Section
      title="Step 2. Initialize Messenger"
      description="The React SDK provides two main approaches for integration:"
      titleClassName="mt-6"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Option 1: FixedMessenger (Recommended for quick setup)
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            FixedMessenger provides a predefined UI toolkit with launcher and messenger at fixed position
            (bottom-right):
          </p>
          <CodeEditor value={REACT_CODE_SAMPLES.basicUsage} language="tsx" />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Option 2: AgentProviderContainer (For custom UI implementations)
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            <strong>AgentProviderContainer</strong> allows for custom UI implementations and component-level
            integration:
          </p>
          <CodeEditor value={REACT_CODE_SAMPLES.agentProviderUsage} language="tsx" />
        </div>
      </div>
    </Section>
  </div>
);
