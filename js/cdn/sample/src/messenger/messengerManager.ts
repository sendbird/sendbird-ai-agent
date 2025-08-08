import { AI_AGENT_ID, APP_ID, AUTH_TOKEN, USER_ID } from '../constants/config';

// Global state for messenger
export let messenger: any = null;
export let hasSession = false;
export let currentLanguage = 'en-US';
export let currentContext: any = null;
export let useCustomContext = false;
export let enableRuntimeUpdate = false;
export const runtimeUpdates: any[] = [];

// Initialize messenger
export async function initializeMessenger() {
  try {
    const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
    messenger = await loadMessenger();

    const config: any = {
      appId: APP_ID,
      aiAgentId: AI_AGENT_ID,
      language: currentLanguage,
      countryCode: currentLanguage.split('-')[1],
    };

    if (currentContext) {
      config.context = currentContext;
    }

    await messenger.initialize(config);

    if (hasSession) {
      await messenger.updateUserSession({
        userId: USER_ID,
        authToken: AUTH_TOKEN,
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            resolve(AUTH_TOKEN);
          },
          onSessionClosed: () => {
            console.log('Session closed');
          },
          onSessionError: (error: unknown) => {
            console.error('Session error:', error);
          },
          onSessionRefreshed: () => {
            console.log('Session refreshed');
          },
        },
      });
    }

    messenger.onLoad(() => {
      console.log('Messenger loaded successfully');
    });

    console.log('Messenger initialized successfully');
  } catch (error) {
    console.error('Failed to initialize messenger:', error);
  }
}

// Update messenger session
export async function updateMessengerSession(enabled: boolean) {
  hasSession = enabled;
  if (messenger) {
    if (enabled) {
      await messenger.updateUserSession({
        userId: USER_ID,
        authToken: AUTH_TOKEN,
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            resolve(AUTH_TOKEN);
          },
        },
      });
    } else {
      await messenger.updateUserSession(null);
    }
  }
}

// Update messenger language
export async function updateMessengerLanguage(language: string) {
  currentLanguage = language;
  if (messenger) {
    await messenger.updateConfig({
      language: language,
      countryCode: language.split('-')[1],
    });
  }
}

// Update context at runtime
export async function updateContextRuntime(newContext: any) {
  if (!messenger) return;

  try {
    await messenger.patchContext(newContext);

    // Log the update
    const update = {
      time: new Date().toLocaleTimeString(),
      context: newContext,
    };
    runtimeUpdates.push(update);

    // Update UI (display log)
    const updatesList = document.getElementById('updatesList');
    if (updatesList) {
      const updateItem = document.createElement('div');
      updateItem.className = 'update-item';
      updateItem.innerHTML = `
        <div class="update-time">${update.time}</div>
        <div class="update-content">${JSON.stringify(update.context, null, 2)}</div>
      `;
      updatesList.appendChild(updateItem);
      updatesList.scrollTop = updatesList.scrollHeight;
    }
    console.log('Context updated at runtime:', newContext);
  } catch (error) {
    console.error('Failed to update context:', error);
  }
}

// Reset messenger
export function resetMessenger() {
  if (messenger) {
    runtimeUpdates.length = 0;
    const updatesList = document.getElementById('updatesList');
    if (updatesList) {
      updatesList.innerHTML = '';
    }
    initializeMessenger();
  }
}

// State setters
export function setCurrentContext(context: any) {
  currentContext = context;
}

export function setUseCustomContext(use: boolean) {
  useCustomContext = use;
}

export function setEnableRuntimeUpdate(enable: boolean) {
  enableRuntimeUpdate = enable;
}
