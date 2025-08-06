// Best practice: Load these from environment variables
// For local development, create a .env file with:
// VITE_APP_ID=your_app_id
// VITE_AI_AGENT_ID=your_ai_agent_id
// Then use: import.meta.env.VITE_APP_ID
const APP_ID = 'E86A36B6-1C6D-4ED7-8C3B-4BC996C07A1C';
const AI_AGENT_ID = '4ebf8a55-6c08-4e78-aef5-2f67c4a7c1f1';

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
    // @ts-ignore - Dynamic import from CDN
    const module = await import('https://aiagent.sendbird.com/orgs/default/index.js') as any;
    return module.loadMessenger();
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
      countryCode: 'US'
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
      countryCode: 'US'
    };

    // Add context if enabled
    if (hasContext) {
      config.context = {
        userPreference: 'technical',
        customerTier: 'premium'
      };
    }

    await messenger.updateConfig(config);

    // Update session if enabled
    if (hasSession) {
      await messenger.updateUserSession({
        userId: 'sample_user_id',
        authToken: 'sample_auth_token',
        onSessionTokenRequired: async (resolve) => {
          // In a real application, fetch a new token from your server
          resolve('sample_auth_token');
        },
        onSessionClosed: () => {
          console.log('Session closed');
        },
        onSessionError: (error) => {
          console.error('Session error:', error);
        },
        onSessionRefreshed: () => {
          console.log('Session refreshed');
        }
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

