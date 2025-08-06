// Configuration from live example
const APP_ID = 'E86A36B6-1C6D-4ED7-8C3B-4BC996C07A1C';
const AI_AGENT_ID = '4ebf8a55-6c08-4e78-aef5-2f67c4a7c1f1';

// Load messenger from CDN
async function loadMessenger() {
  const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
  return loadMessenger();
}

// Application state
let messenger = null;
let isOpened = false;
let hasSession = false;
let hasContext = false;

// UI elements
const toggleButton = document.getElementById('toggleMessenger');
const sessionToggle = document.getElementById('sessionToggle');
const contextToggle = document.getElementById('contextToggle');

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
    const config = {
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
  hasSession = e.target.checked;
  updateMessengerConfig();
  console.log('Session toggled:', hasSession);
});

contextToggle.addEventListener('change', (e) => {
  hasContext = e.target.checked;
  updateMessengerConfig();
  console.log('Context toggled:', hasContext);
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded, initializing messenger...');
  initializeMessenger();
});