const APP_ID = import.meta.env.VITE_NEW_APP_ID;
const AI_AGENT_ID = import.meta.env.VITE_NEW_AI_AGENT_ID;
const USER_ID = import.meta.env.VITE_NEW_USER_ID;
const AUTH_TOKEN = import.meta.env.VITE_NEW_USER_AUTH_TOKEN;

// Type definitions for the CDN messenger
interface MessengerConfig {
  appId: string;
  aiAgentId: string;
  language: string;
  countryCode: string;
  context?: {
    userPreference: string;
    customerTier: string;
  };
}

interface UserSessionInfo {
  userId: string;
  authToken: string;
  onSessionTokenRequired: (resolve: (token: string) => void) => Promise<void>;
  onSessionClosed: () => void;
  onSessionError: (error: unknown) => void;
  onSessionRefreshed: () => void;
}

interface Messenger {
  initialize: (config: MessengerConfig) => Promise<void>;
  updateConfig: (config: MessengerConfig) => Promise<void>;
  updateUserSession: (sessionInfo: UserSessionInfo) => Promise<void>;
  open: () => void;
  close: () => void;
  onLoad: (callback: () => void) => void;
}

// Load messenger from CDN
async function loadMessenger(): Promise<Messenger> {
  try {
    const { loadMessenger: cdnLoadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
    return cdnLoadMessenger();
  } catch (error) {
    console.error('Failed to load messenger from CDN:', error);
    throw error;
  }
}

// Application state
let messenger: Messenger | null = null;
let isOpened = false;
let hasSession = false;
let hasContext = false;

// UI elements
const toggleButton = document.getElementById('toggleMessenger') as HTMLButtonElement;
const sessionToggle = document.getElementById('sessionToggle') as HTMLInputElement;
const contextToggle = document.getElementById('contextToggle') as HTMLInputElement;

// Initialize messenger
async function initializeMessenger() {
  try {
    console.log('Loading messenger...');
    messenger = await loadMessenger();

    // Initialize with basic configuration
    await messenger.initialize({
      appId: APP_ID,
      aiAgentId: AI_AGENT_ID,
      language: 'en-US',
      countryCode: 'US',
    });

    console.log('Messenger initialized successfully');

    // Set up event handlers
    messenger.onLoad(() => {
      console.log('Messenger loaded');
    });
  } catch (error) {
    console.error('Failed to initialize messenger:', error);
    alert('Failed to initialize messenger. Please check the console for details.');
  }
}

// Update messenger configuration
async function updateMessengerConfig() {
  if (!messenger) return;

  try {
    const config: MessengerConfig = {
      appId: APP_ID,
      aiAgentId: AI_AGENT_ID,
      language: 'en-US',
      countryCode: 'US',
    };

    // Add context if enabled
    if (hasContext) {
      config.context = {
        userPreference: 'technical',
        customerTier: 'premium',
      };
    }

    await messenger.updateConfig(config);

    // Update session if enabled
    if (hasSession) {
      await messenger.updateUserSession({
        userId: USER_ID,
        authToken: AUTH_TOKEN,
        onSessionTokenRequired: async (resolve) => {
          // In a real application, fetch a new token from your server
          resolve(AUTH_TOKEN);
        },
        onSessionClosed: () => {
          console.log('Session closed');
        },
        onSessionError: (error) => {
          console.error('Session error:', error);
        },
        onSessionRefreshed: () => {
          console.log('Session refreshed');
        },
      });
    }
  } catch (error) {
    console.error('Failed to update messenger config:', error);
  }
}

// Toggle messenger open/close
function toggleMessenger() {
  if (!messenger) {
    console.error('Messenger not initialized');
    return;
  }

  if (isOpened) {
    messenger.close();
    isOpened = false;
    toggleButton.textContent = 'Open Messenger';
  } else {
    messenger.open();
    isOpened = true;
    toggleButton.textContent = 'Close Messenger';
  }
}

// Event listeners
toggleButton.addEventListener('click', toggleMessenger);

sessionToggle.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  hasSession = target.checked;
  updateMessengerConfig();
  console.log('Session toggled:', hasSession);
});

contextToggle.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  hasContext = target.checked;
  updateMessengerConfig();
  console.log('Context toggled:', hasContext);
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded, initializing messenger...');
  initializeMessenger();
});
