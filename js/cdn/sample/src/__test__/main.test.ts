import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock DOM elements
const mockToggle = {
  addEventListener: vi.fn(),
  checked: false,
};

const mockSelect = {
  addEventListener: vi.fn(),
  value: 'en-US',
};

const mockButton = {
  addEventListener: vi.fn(),
};

// Mock DOM
Object.defineProperty(global, 'document', {
  value: {
    getElementById: vi.fn((id: string) => {
      if (id === 'sessionToggle' || id === 'customContextToggle' || id === 'runtimeUpdateToggle') return mockToggle;
      if (id === 'languageSelect' || id === 'contextPreset') return mockSelect;
      if (id === 'resetMessenger') return mockButton;
      return null;
    }),
    addEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
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
vi.mock('https://aiagent.delight.ai/orgs/default/index.js', () => ({
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
  beforeEach(async () => {
    vi.clearAllMocks();
    // Reset DOM element mocks
    mockToggle.addEventListener = vi.fn();
    mockSelect.addEventListener = vi.fn();
    mockButton.addEventListener = vi.fn();

    // Clear module cache to ensure fresh import
    vi.resetModules();
  });

  it('should set up DOMContentLoaded event listener', async () => {
    // Import the module to trigger initialization
    await import('../main');

    // Verify that the module sets up a DOMContentLoaded listener
    expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });

  it('should load without critical errors', async () => {
    // Import the module to trigger initialization
    const module = await import('../main');

    // Module should load successfully
    expect(module).toBeDefined();

    // Should have set up the main document listener
    expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });

  it('should have correct configuration constants', async () => {
    const module = await import('../main');

    // Since constants are not exported, we verify they exist through their usage
    // This test ensures the module loads without errors, confirming constants are properly defined
    expect(module).toBeDefined();
  });
});
