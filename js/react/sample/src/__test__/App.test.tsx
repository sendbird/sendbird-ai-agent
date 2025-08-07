import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import App from '../App';

// Mock the Sendbird AI Agent Messenger React component
vi.mock('@sendbird/ai-agent-messenger-react', () => ({
  FixedMessenger: ({ appId, aiAgentId }: { appId: string; aiAgentId: string }) => (
    <div data-testid="fixed-messenger" data-app-id={appId} data-ai-agent-id={aiAgentId}>
      Mocked FixedMessenger
    </div>
  ),
}));

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('Sendbird AI Agent React Sample')).toBeInTheDocument();
  });

  it('renders the messenger controls', () => {
    render(<App />);
    expect(screen.getByText('Open Messenger')).toBeInTheDocument();
    expect(screen.getByLabelText('Use authenticated session')).toBeInTheDocument();
    expect(screen.getByLabelText('Include context')).toBeInTheDocument();
  });

  it('renders the FixedMessenger component with correct props', () => {
    render(<App />);
    const messenger = screen.getByTestId('fixed-messenger');
    expect(messenger).toBeInTheDocument();
    expect(messenger).toHaveAttribute('data-app-id', 'F7879BE3-A59C-4134-A04A-702A1E62A9C0');
    expect(messenger).toHaveAttribute('data-ai-agent-id', '9ec48481-26d4-41b3-a3d7-68f20c0aeb1c');
  });

  it('renders usage instructions', () => {
    render(<App />);
    expect(screen.getByText('How to use:')).toBeInTheDocument();
    expect(screen.getByText(/Click "Open Messenger" to open the AI agent chat/)).toBeInTheDocument();
  });
});
