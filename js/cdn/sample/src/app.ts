import { APP_CONFIG } from './config/appConfig';
import { CODE_EXAMPLES, CONTEXT_PRESETS, generateCode } from './constants';
import { AppState, DEFAULT_PLAYGROUND_CONFIG, MessengerInitConfig } from './types';

export const state: AppState = {
  activeTab: 'playground',
  activeExample: 'basic',
  messenger: null,
  hasSession: DEFAULT_PLAYGROUND_CONFIG.hasSession,
  language: DEFAULT_PLAYGROUND_CONFIG.language,
  context: DEFAULT_PLAYGROUND_CONFIG.context,
  enableRuntimeUpdate: DEFAULT_PLAYGROUND_CONFIG.enableRuntimeUpdate,
  contextPreset: 0,
  useCustomContext: false,
  customContext: '',
  runtimeUpdates: [],
  copyFeedback: {},
};

export async function initializeApp() {
  initializeTabs();
  initializePlayground();
  initializeCodeExamples();
  await initializeMessenger();
  updateLiveCode();
  updateExampleCode();
}

function initializeTabs() {
  const playgroundBtn = document.getElementById('playgroundTab');
  const codeBtn = document.getElementById('codeTab');
  const playgroundContent = document.getElementById('playgroundView');
  const codeContent = document.getElementById('codeView');

  playgroundBtn?.addEventListener('click', () => {
    state.activeTab = 'playground';
    playgroundBtn.classList.add('tab-active');
    codeBtn?.classList.remove('tab-active');
    if (playgroundContent) playgroundContent.style.display = 'block';
    if (codeContent) codeContent.style.display = 'none';
  });

  codeBtn?.addEventListener('click', () => {
    state.activeTab = 'code';
    codeBtn.classList.add('tab-active');
    playgroundBtn?.classList.remove('tab-active');
    if (codeContent) codeContent.style.display = 'block';
    if (playgroundContent) playgroundContent.style.display = 'none';

    // Trigger syntax highlighting after tab switch
    setTimeout(() => {
      if (typeof window.Prism !== 'undefined') {
        window.Prism.highlightAll();
      }
    }, 50);
  });
}

function initializePlayground() {
  const sessionToggle = document.getElementById('sessionToggle') as HTMLInputElement;
  const userInfo = document.getElementById('userInfo');
  const userIdSpan = document.getElementById('userId');

  if (sessionToggle) {
    sessionToggle.addEventListener('change', async () => {
      state.hasSession = sessionToggle.checked;
      if (userInfo) {
        userInfo.style.display = state.hasSession ? 'block' : 'none';
      }
      if (userIdSpan && state.hasSession) {
        userIdSpan.textContent = APP_CONFIG.userId || 'default-user';
      }
      await resetMessenger();
    });
  }

  const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
  if (languageSelect) {
    languageSelect.addEventListener('change', async () => {
      state.language = languageSelect.value;
      await resetMessenger();
    });
  }

  const contextPreset = document.getElementById('contextPreset') as HTMLSelectElement;
  const customContextToggle = document.getElementById('customContextToggle') as HTMLInputElement;
  const customContextGroup = document.getElementById('customContextGroup');

  if (contextPreset) {
    contextPreset.addEventListener('change', async () => {
      const value = parseInt(contextPreset.value);
      if (value === -1) {
        // Custom context selected
        state.useCustomContext = true;
        state.context = null;
        if (customContextGroup) customContextGroup.style.display = 'block';
        if (customContextToggle) {
          customContextToggle.checked = true;
        }
      } else {
        // Preset selected - ensure custom context is disabled
        state.useCustomContext = false;
        state.contextPreset = value;
        state.context = CONTEXT_PRESETS[value].value;

        // Always hide custom context group and uncheck toggle when preset is selected
        if (customContextGroup) customContextGroup.style.display = 'none';
        if (customContextToggle) {
          customContextToggle.checked = false;
        }

        // Handle runtime context update if enabled
        if (state.enableRuntimeUpdate && state.messenger && state.context) {
          await updateContextRuntime(state.context);
        }
      }
      updateLiveCode();
    });

    // Add custom context option
    const customOption = document.createElement('option');
    customOption.value = '-1';
    customOption.textContent = 'Custom Context';
    contextPreset.appendChild(customOption);
  }

  if (customContextToggle) {
    customContextToggle.addEventListener('change', () => {
      const isCustom = customContextToggle.checked;
      if (customContextGroup) {
        customContextGroup.style.display = isCustom ? 'block' : 'none';
      }

      if (isCustom) {
        if (contextPreset) contextPreset.value = '-1';
        state.useCustomContext = true;
        state.context = null;
      } else {
        if (contextPreset) contextPreset.value = '0';
        state.useCustomContext = false;
        state.contextPreset = 0;
        state.context = CONTEXT_PRESETS[0].value;
      }
      updateLiveCode();
    });
  }

  const customContext = document.getElementById('customContext') as HTMLTextAreaElement;
  const jsonError = document.getElementById('jsonError');

  if (customContext) {
    customContext.addEventListener('input', async () => {
      state.customContext = customContext.value;
      if (jsonError) jsonError.style.display = 'none';

      try {
        if (customContext.value.trim()) {
          state.context = JSON.parse(customContext.value);

          // Handle runtime context update if enabled
          if (state.enableRuntimeUpdate && state.messenger && state.context) {
            await updateContextRuntime(state.context);
          }
        } else {
          state.context = null;
        }
        updateLiveCode();
      } catch (e) {
        if (jsonError) jsonError.style.display = 'block';
      }
    });
  }

  const runtimeUpdateToggle = document.getElementById('runtimeUpdateToggle') as HTMLInputElement;
  const runtimeInfo = document.getElementById('runtimeInfo');

  if (runtimeUpdateToggle) {
    runtimeUpdateToggle.addEventListener('change', () => {
      state.enableRuntimeUpdate = runtimeUpdateToggle.checked;
      if (runtimeInfo) {
        runtimeInfo.style.display = state.enableRuntimeUpdate ? 'block' : 'none';
      }
      updateRuntimeLog();
    });
  }

  const resetBtn = document.getElementById('resetMessenger');
  resetBtn?.addEventListener('click', resetToDefaults);

  const copyBtn = document.getElementById('copyCode');
  copyBtn?.addEventListener('click', async () => {
    const code = generateCode({
      hasSession: state.hasSession,
      language: state.language,
      context: state.context,
    });

    try {
      await navigator.clipboard.writeText(code);
      showCopyFeedback(copyBtn, 'live-code');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  });
}

function initializeCodeExamples() {
  const examplesContainer = document.querySelector('.examples-list');
  if (examplesContainer) {
    examplesContainer.innerHTML = '';

    Object.keys(CODE_EXAMPLES).forEach((key, index) => {
      const btn = document.createElement('button');
      btn.className = `example-btn ${index === 0 ? 'example-active' : ''}`;
      btn.textContent = CODE_EXAMPLES[key as keyof typeof CODE_EXAMPLES].title;
      btn.dataset.example = key;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.example-btn').forEach((b) => b.classList.remove('example-active'));
        btn.classList.add('example-active');
        state.activeExample = key;
        updateExampleCode();
      });

      examplesContainer.appendChild(btn);
    });
  }

  const copyExampleBtn = document.getElementById('copyExample');
  copyExampleBtn?.addEventListener('click', async () => {
    const code = CODE_EXAMPLES[state.activeExample as keyof typeof CODE_EXAMPLES].code;

    try {
      await navigator.clipboard.writeText(code);
      showCopyFeedback(copyExampleBtn, 'example-code');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  });
}

async function initializeMessenger() {
  try {
    const { loadMessenger } = await import('https://aiagent.delight.ai/orgs/default/index.js');
    state.messenger = await loadMessenger();

    const config: MessengerInitConfig = {
      appId: APP_CONFIG.appId,
      aiAgentId: APP_CONFIG.aiAgentId,
      language: state.language.split('-')[0],
      countryCode: state.language.split('-')[1],
    };

    if (state.context) {
      config.context = state.context;
    }

    await state.messenger.initialize(config);

    if (state.hasSession) {
      await state.messenger.updateUserSession({
        userId: APP_CONFIG.userId || 'default-user',
        authToken: APP_CONFIG.authToken || 'default-token',
        sessionHandler: {
          onSessionTokenRequired: async (resolve: (token: string) => void) => {
            resolve(APP_CONFIG.authToken || 'default-token');
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

async function resetToDefaults() {
  state.hasSession = DEFAULT_PLAYGROUND_CONFIG.hasSession;
  state.language = DEFAULT_PLAYGROUND_CONFIG.language;
  state.context = DEFAULT_PLAYGROUND_CONFIG.context;
  state.enableRuntimeUpdate = DEFAULT_PLAYGROUND_CONFIG.enableRuntimeUpdate;
  state.contextPreset = 0;
  state.useCustomContext = false;
  state.customContext = '';
  state.runtimeUpdates = [];

  const sessionToggle = document.getElementById('sessionToggle') as HTMLInputElement;
  const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
  const contextPreset = document.getElementById('contextPreset') as HTMLSelectElement;
  const customContextToggle = document.getElementById('customContextToggle') as HTMLInputElement;
  const customContext = document.getElementById('customContext') as HTMLTextAreaElement;
  const customContextGroup = document.getElementById('customContextGroup');
  const runtimeUpdateToggle = document.getElementById('runtimeUpdateToggle') as HTMLInputElement;
  const userInfo = document.getElementById('userInfo');
  const runtimeInfo = document.getElementById('runtimeInfo');
  const jsonError = document.getElementById('jsonError');

  if (sessionToggle) sessionToggle.checked = state.hasSession;
  if (languageSelect) languageSelect.value = state.language;
  if (contextPreset) contextPreset.value = '0';
  if (customContextToggle) customContextToggle.checked = false;
  if (customContext) customContext.value = '';
  if (customContextGroup) customContextGroup.style.display = 'none';
  if (runtimeUpdateToggle) runtimeUpdateToggle.checked = state.enableRuntimeUpdate;
  if (userInfo) userInfo.style.display = state.hasSession ? 'block' : 'none';
  if (runtimeInfo) runtimeInfo.style.display = state.enableRuntimeUpdate ? 'block' : 'none';
  if (jsonError) jsonError.style.display = 'none';

  await resetMessenger();
}

async function updateContextRuntime(context: Record<string, string>) {
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

function updateLiveCode() {
  const codeElement = document.querySelector('#liveCode code');
  if (codeElement) {
    const code = generateCode({
      hasSession: state.hasSession,
      language: state.language,
      context: state.context,
    });

    codeElement.textContent = code;

    // Apply syntax highlighting if Prism is available
    if (typeof window.Prism !== 'undefined') {
      window.Prism.highlightElement(codeElement);
    }
  }
}

function updateExampleCode() {
  const titleElement = document.getElementById('exampleTitle');
  const codeElement = document.querySelector('#exampleCode code');

  const example = CODE_EXAMPLES[state.activeExample as keyof typeof CODE_EXAMPLES];

  if (titleElement) {
    titleElement.textContent = example.title;
  }

  if (codeElement) {
    codeElement.textContent = example.code;

    // Apply syntax highlighting if Prism is available
    if (typeof window.Prism !== 'undefined') {
      window.Prism.highlightElement(codeElement);
    }
  }
}

function updateRuntimeLog() {
  const runtimeLog = document.getElementById('runtimeLog');
  const updatesList = document.getElementById('updatesList');

  if (state.enableRuntimeUpdate && state.runtimeUpdates.length > 0) {
    if (runtimeLog) runtimeLog.style.display = 'block';

    if (updatesList) {
      updatesList.innerHTML = state.runtimeUpdates
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
    if (runtimeLog) runtimeLog.style.display = 'none';
  }
}

function showCopyFeedback(button: HTMLElement, key: string) {
  const originalText = button.textContent;
  state.copyFeedback[key] = true;
  button.textContent = 'Copied!';

  setTimeout(() => {
    state.copyFeedback[key] = false;
    button.textContent = originalText;
  }, 2000);
}
