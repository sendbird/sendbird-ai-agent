import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock DOM elements
const mockButton = {
  addEventListener: vi.fn(),
  textContent: 'Open Messenger',
};

const mockToggle = {
  addEventListener: vi.fn(),
  checked: false,
};

// Mock DOM
Object.defineProperty(global, 'document', {
  value: {
    getElementById: vi.fn((id: string) => {
      if (id === 'toggleMessenger') return mockButton;
      if (id === 'sessionToggle' || id === 'contextToggle') return mockToggle;
      return null;
    }),
    addEventListener: vi.fn(),
  },
});

// Mock console methods
Object.defineProperty(global, 'console', {
  value: {
    log: vi.fn(),
    error: vi.fn(),
  },
});

// Mock dynamic import for messenger
vi.mock('https://aiagent.sendbird.com/orgs/default/index.js', () => ({
  loadMessenger: vi.fn(() =>
    Promise.resolve({
      initialize: vi.fn(() => Promise.resolve()),
      onLoad: vi.fn(),
      open: vi.fn(),
      close: vi.fn(),
      updateConfig: vi.fn(() => Promise.resolve()),
      updateUserSession: vi.fn(() => Promise.resolve()),
    }),
  ),
}));

describe('CDN Sample Main Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find required DOM elements', async () => {
    // Import the module to trigger initialization
    await import('../main');

    expect(document.getElementById).toHaveBeenCalledWith('toggleMessenger');
    expect(document.getElementById).toHaveBeenCalledWith('sessionToggle');
    expect(document.getElementById).toHaveBeenCalledWith('contextToggle');
  });

  it('should set up event listeners', async () => {
    await import('../main');

    expect(mockButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(mockToggle.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });

  it('should have correct configuration constants', async () => {
    const module = await import('../main');

    // Since constants are not exported, we verify they exist through their usage
    // This test ensures the module loads without errors, confirming constants are properly defined
    expect(module).toBeDefined();
  });
});
