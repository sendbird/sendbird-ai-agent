// Main application module that handles all functionality
import { AI_AGENT_ID, APP_ID, AUTH_TOKEN, CODE_EXAMPLES, CONTEXT_PRESETS, LANGUAGES, USER_ID } from './constants';

// Application state
export const state = {
  activeTab: 'playground' as 'playground' | 'code',
  activeExample: 'basic' as keyof typeof CODE_EXAMPLES,
  messenger: null as any,
  hasSession: false,
  language: 'en-US',
  context: null as any,
  contextPreset: 0,
  useCustomContext: false,
  customContext: '',
  enableRuntimeUpdate: false,
  runtimeUpdates: [] as Array<{ time: string; context: any }>,
};

// Initialize application
export async function initializeApp() {
  // Set up tab navigation
  initializeTabs();

  // Set up playground controls
  initializePlayground();

  // Set up code examples
  initializeCodeExamples();

  // Initialize messenger
  await initializeMessenger();

  // Update displays
  updateLiveCode();
  updateExampleCode();
}

// Tab Management
function initializeTabs() {
  const playgroundBtn = document.getElementById('playground-tab');
  const codeBtn = document.getElementById('code-tab');
  const playgroundContent = document.getElementById('playground-content');
  const codeContent = document.getElementById('code-content');

  playgroundBtn?.addEventListener('click', () => {
    state.activeTab = 'playground';
    playgroundBtn.classList.add('active');
    codeBtn?.classList.remove('active');
    playgroundContent?.classList.remove('hidden');
    codeContent?.classList.add('hidden');
  });

  codeBtn?.addEventListener('click', () => {
    state.activeTab = 'code';
    codeBtn.classList.add('active');
    playgroundBtn?.classList.remove('active');
    codeContent?.classList.remove('hidden');
    playgroundContent?.classList.add('hidden');
  });
}

// Playground Controls
function initializePlayground() {
  // Authentication toggle
  const authCheckbox = document.getElementById('auth-checkbox') as HTMLInputElement;
  authCheckbox?.addEventListener('change', async () => {
    state.hasSession = authCheckbox.checked;
    await resetMessenger();
  });

  // Language selector
  const languageSelect = document.getElementById('language-select') as HTMLSelectElement;
  if (languageSelect) {
    LANGUAGES.forEach((lang) => {
      const option = document.createElement('option');
      option.value = `${lang.code}-${lang.countryCode}`;
      option.textContent = lang.label;
      languageSelect.appendChild(option);
    });

    languageSelect.addEventListener('change', async () => {
      state.language = languageSelect.value;
      await resetMessenger();
    });
  }

  // Context selector
  const contextSelect = document.getElementById('context-select') as HTMLSelectElement;
  const customContextWrapper = document.getElementById('custom-context-wrapper');
  const customContextInput = document.getElementById('custom-context') as HTMLTextAreaElement;

  if (contextSelect) {
    CONTEXT_PRESETS.forEach((preset, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = preset.label;
      contextSelect.appendChild(option);
    });

    const customOption = document.createElement('option');
    customOption.value = '-1';
    customOption.textContent = 'Custom Context';
    contextSelect.appendChild(customOption);

    contextSelect.addEventListener('change', async () => {
      const value = Number(contextSelect.value);
      if (value === -1) {
        state.useCustomContext = true;
        state.context = null;
        customContextWrapper?.classList.remove('hidden');
      } else {
        state.useCustomContext = false;
        state.contextPreset = value;
        state.context = CONTEXT_PRESETS[value].value;
        customContextWrapper?.classList.add('hidden');

        if (state.enableRuntimeUpdate && state.messenger && state.context) {
          await updateContextRuntime(state.context);
        }
      }
      updateLiveCode();
    });
  }

  // Custom context input
  customContextInput?.addEventListener('input', async () => {
    state.customContext = customContextInput.value;
    try {
      state.context = JSON.parse(customContextInput.value);
      if (state.enableRuntimeUpdate && state.messenger) {
        await updateContextRuntime(state.context);
      }
      updateLiveCode();
    } catch (e) {
      // Invalid JSON
    }
  });

  // Runtime updates toggle
  const runtimeCheckbox = document.getElementById('runtime-checkbox') as HTMLInputElement;
  runtimeCheckbox?.addEventListener('change', () => {
    state.enableRuntimeUpdate = runtimeCheckbox.checked;
    updateRuntimeLog();
  });

  // Reset button
  const resetBtn = document.getElementById('reset-btn');
  resetBtn?.addEventListener('click', resetMessenger);

  // Copy button for live code
  const copyLiveBtn = document.getElementById('copy-live-btn');
  copyLiveBtn?.addEventListener('click', () => {
    const code = generateLiveCode();
    navigator.clipboard.writeText(code).then(() => {
      if (copyLiveBtn) {
        copyLiveBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyLiveBtn.textContent = 'Copy Code';
        }, 2000);
      }
    });
  });
}

// Code Examples
function initializeCodeExamples() {
  const exampleList = document.getElementById('example-list');
  const copyExampleBtn = document.getElementById('copy-example-btn');

  // Create example buttons
  Object.keys(CODE_EXAMPLES).forEach((key) => {
    const btn = document.createElement('button');
    btn.className = 'example-btn';
    btn.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    btn.dataset.example = key;

    if (key === state.activeExample) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.example-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeExample = key as keyof typeof CODE_EXAMPLES;
      updateExampleCode();
    });

    exampleList?.appendChild(btn);
  });

  // Copy button for examples
  copyExampleBtn?.addEventListener('click', () => {
    const code = CODE_EXAMPLES[state.activeExample];
    navigator.clipboard.writeText(code).then(() => {
      if (copyExampleBtn) {
        copyExampleBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyExampleBtn.textContent = 'Copy Code';
        }, 2000);
      }
    });
  });
}

// Messenger Management
async function initializeMessenger() {
  try {
    const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
    state.messenger = await loadMessenger();

    const config: any = {
      appId: APP_ID,
      aiAgentId: AI_AGENT_ID,
      language: state.language.split('-')[0],
      countryCode: state.language.split('-')[1],
    };

    if (state.context) {
      config.context = state.context;
    }

    await state.messenger.initialize(config);

    if (state.hasSession) {
      await state.messenger.updateUserSession({
        userId: USER_ID,
        authToken: AUTH_TOKEN,
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            resolve(AUTH_TOKEN);
          },
          onSessionClosed: () => console.log('Session closed'),
          onSessionError: (error: unknown) => console.error('Session error:', error),
          onSessionRefreshed: () => console.log('Session refreshed'),
        },
      });
    }

    console.log('Messenger initialized');
  } catch (error) {
    console.error('Failed to initialize messenger:', error);
  }
}

async function resetMessenger() {
  if (state.messenger) {
    state.messenger.close();
    state.runtimeUpdates = [];
    updateRuntimeLog();
  }
  await initializeMessenger();
  updateLiveCode();
}

async function updateContextRuntime(context: any) {
  if (state.messenger) {
    try {
      await state.messenger.patchContext(context);
      state.runtimeUpdates.push({
        time: new Date().toISOString(),
        context: context,
      });
      updateRuntimeLog();
    } catch (error) {
      console.error('Failed to update context:', error);
    }
  }
}

// Display Updates
function generateLiveCode(): string {
  const lines = [
    `// Load messenger script
<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_ID}",
      aiAgentId: "${AI_AGENT_ID}"${
        state.context
          ? `,
      context: ${JSON.stringify(state.context, null, 6).split('\n').join('\n      ')}`
          : ''
      }${
        state.language !== 'en-US'
          ? `,
      language: "${state.language.split('-')[0]}",
      countryCode: "${state.language.split('-')[1]}"`
          : ''
      }
    });`,
  ];

  if (state.hasSession) {
    lines.push(`
    // Authenticate user
    await messenger.updateUserSession({
      userId: "${USER_ID}",
      authToken: "${AUTH_TOKEN}",
      sessionHandler: {
        onSessionTokenRequired: async (resolve) => {
          resolve("${AUTH_TOKEN}");
        }
      }
    });`);
  }

  lines.push(`
    console.log('Messenger ready');
  }
  
  initMessenger();
</script>`);

  return lines.join('\n');
}

function updateLiveCode() {
  const codeElement = document.getElementById('live-code');
  if (codeElement) {
    codeElement.textContent = generateLiveCode();

    // Apply syntax highlighting if Prism is available
    if (typeof (window as any).Prism !== 'undefined') {
      (window as any).Prism.highlightElement(codeElement);
    }
  }
}

function updateExampleCode() {
  const titleElement = document.getElementById('example-title');
  const codeElement = document.getElementById('example-code');

  if (titleElement) {
    titleElement.textContent =
      state.activeExample.charAt(0).toUpperCase() + state.activeExample.slice(1).replace(/([A-Z])/g, ' $1');
  }

  if (codeElement) {
    codeElement.textContent = CODE_EXAMPLES[state.activeExample];

    // Apply syntax highlighting if Prism is available
    if (typeof (window as any).Prism !== 'undefined') {
      (window as any).Prism.highlightElement(codeElement);
    }
  }
}

function updateRuntimeLog() {
  const logWrapper = document.getElementById('runtime-log-wrapper');
  const logContent = document.getElementById('runtime-log');

  if (state.enableRuntimeUpdate && state.runtimeUpdates.length > 0) {
    logWrapper?.classList.remove('hidden');

    if (logContent) {
      logContent.innerHTML = state.runtimeUpdates
        .map(
          (update) => `
        <div class="runtime-update">
          <div class="update-time">${new Date(update.time).toLocaleTimeString()}</div>
          <pre class="update-context">${JSON.stringify(update.context, null, 2)}</pre>
        </div>
      `,
        )
        .join('');
    }
  } else {
    logWrapper?.classList.add('hidden');
  }
}
