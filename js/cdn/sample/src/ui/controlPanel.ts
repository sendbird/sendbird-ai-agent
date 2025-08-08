import { CONTEXT_PRESETS } from '../constants/config';
import {
  enableRuntimeUpdate,
  resetMessenger,
  setCurrentContext,
  setEnableRuntimeUpdate,
  setUseCustomContext,
  updateContextRuntime,
  updateMessengerLanguage,
  updateMessengerSession,
} from '../messenger/messengerManager';
import { updateLiveCode } from '../utils/codeDisplay';

// Initialize control panel event listeners
export function initializeControlPanel() {
  const sessionToggle = document.getElementById('sessionToggle') as HTMLInputElement;
  const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
  const contextPreset = document.getElementById('contextPreset') as HTMLSelectElement;
  const customContextToggle = document.getElementById('customContextToggle') as HTMLInputElement;
  const customContextInput = document.getElementById('customContextInput') as HTMLTextAreaElement;
  const runtimeUpdateToggle = document.getElementById('runtimeUpdateToggle') as HTMLInputElement;
  const resetButton = document.getElementById('resetMessenger') as HTMLButtonElement;

  if (sessionToggle) {
    sessionToggle.addEventListener('change', handleSessionToggle);
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', handleLanguageChange);
  }

  if (contextPreset) {
    contextPreset.addEventListener('change', handleContextPresetChange);
  }

  if (customContextToggle) {
    customContextToggle.addEventListener('change', handleCustomContextToggle);
  }

  if (customContextInput) {
    customContextInput.addEventListener('input', handleCustomContextChange);
  }

  if (runtimeUpdateToggle) {
    runtimeUpdateToggle.addEventListener('change', handleRuntimeUpdateToggle);
  }

  if (resetButton) {
    resetButton.addEventListener('click', handleReset);
  }
}

// Event handlers
async function handleSessionToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  await updateMessengerSession(target.checked);
  updateLiveCode();
}

async function handleLanguageChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  await updateMessengerLanguage(target.value);
  updateLiveCode();
}

async function handleContextPresetChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const presetKey = target.value as keyof typeof CONTEXT_PRESETS;
  const context = CONTEXT_PRESETS[presetKey];

  setCurrentContext(context);
  setUseCustomContext(false);

  const customToggle = document.getElementById('customContextToggle') as HTMLInputElement;
  if (customToggle) {
    customToggle.checked = false;
  }

  const customInput = document.getElementById('customContextInput') as HTMLTextAreaElement;
  if (customInput) {
    customInput.disabled = true;
  }

  if (enableRuntimeUpdate && context) {
    await updateContextRuntime(context);
  }

  updateLiveCode();
}

function handleCustomContextToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  const enabled = target.checked;

  setUseCustomContext(enabled);

  const customInput = document.getElementById('customContextInput') as HTMLTextAreaElement;
  const presetSelect = document.getElementById('contextPreset') as HTMLSelectElement;

  if (customInput) {
    customInput.disabled = !enabled;
  }

  if (presetSelect) {
    presetSelect.disabled = enabled;
    if (enabled) {
      presetSelect.value = 'none';
    }
  }

  updateLiveCode();
}

async function handleCustomContextChange(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  const value = target.value.trim();

  if (!value) {
    setCurrentContext(null);
    updateLiveCode();
    return;
  }

  try {
    const context = JSON.parse(value);
    setCurrentContext(context);

    if (enableRuntimeUpdate) {
      await updateContextRuntime(context);
    }
  } catch (error) {
    console.warn('Invalid JSON context:', error);
    setCurrentContext(null);
  }

  updateLiveCode();
}

function handleRuntimeUpdateToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  setEnableRuntimeUpdate(target.checked);
  updateLiveCode();
}

function handleReset() {
  resetMessenger();
  updateLiveCode();
}
