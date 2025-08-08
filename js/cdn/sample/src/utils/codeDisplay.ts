import { CODE_EXAMPLES } from '../constants/codeExamples';
import { AI_AGENT_ID, APP_ID, LANGUAGES } from '../constants/config';
import { currentContext, currentLanguage, enableRuntimeUpdate, hasSession } from '../messenger/messengerManager';
import { activeExample, setActiveExample as setTabActiveExample } from '../ui/tabManager';

// Generate live code based on current settings
export function generateLiveCode(): string {
  const langObj = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  let html = `<!DOCTYPE html>
<html>
<head>
  <script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
</head>
<body>
  <script>
    (async () => {
      const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');`;

  if (enableRuntimeUpdate) {
    html += '\n      window.messenger = await loadMessenger();';
  } else {
    html += '\n      const messenger = await loadMessenger();';
  }

  html += `

      const config = {
        appId: "${APP_ID}",
        aiAgentId: "${AI_AGENT_ID}"`;

  if (currentLanguage !== 'en-US') {
    html += `,
        language: "${currentLanguage}",
        countryCode: "${langObj.countryCode}"`;
  }

  if (currentContext) {
    const contextStr = JSON.stringify(currentContext, null, 8).replace(/\n/g, '\n        ');
    html += `,
        context: ${contextStr}`;
  }

  html += `
      };

      await messenger.initialize(config);`;

  if (hasSession) {
    html += `

      await messenger.updateUserSession({
        userId: "${import.meta.env.VITE_NEW_USER_ID}",
        authToken: "${import.meta.env.VITE_NEW_USER_AUTH_TOKEN}",
        sessionHandler: {
          onSessionTokenRequired: async (resolve) => {
            resolve("${import.meta.env.VITE_NEW_USER_AUTH_TOKEN}");
          }
        }
      });`;
  }

  html += `

      messenger.onLoad(() => {
        console.log('Messenger loaded successfully');
      });
    })();
  </script>`;

  if (enableRuntimeUpdate) {
    html += `

  <!-- Runtime context update example -->
  <button onclick="updateContext()">Update Context</button>
  <script>
    async function updateContext() {
      if (window.messenger) {
        await window.messenger.patchContext({
          timestamp: new Date().toISOString(),
          action: "runtime_update"
        });
        console.log('Context updated at runtime');
      }
    }
  </script>`;
  }

  html += `
</body>
</html>`;

  return html;
}

// Update live code display
export function updateLiveCode() {
  const liveCode = document.getElementById('liveCode');
  if (liveCode) {
    liveCode.textContent = generateLiveCode();

    // Apply syntax highlighting
    if ((window as any).Prism) {
      (window as any).Prism.highlightElement(liveCode);
    }
  }
}

// Set active example and update display
export function setActiveExample(example: string) {
  setTabActiveExample(example);

  const exampleCode = document.getElementById('exampleCode');
  const exampleBtns = document.querySelectorAll('.example-btn');

  if (exampleCode) {
    exampleCode.textContent = CODE_EXAMPLES[example];

    // Apply syntax highlighting
    if ((window as any).Prism) {
      (window as any).Prism.highlightElement(exampleCode);
    }
  }

  // Update button states
  exampleBtns.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-example') === example) {
      btn.classList.add('active');
    }
  });
}

// Initialize code example buttons
export function initializeCodeExamples() {
  const exampleBtns = document.querySelectorAll('.example-btn');

  exampleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const example = btn.getAttribute('data-example');
      if (example) {
        setActiveExample(example);
      }
    });
  });
}

// Copy code to clipboard with feedback
export async function handleCopy(code: string, buttonElement: HTMLButtonElement) {
  try {
    await navigator.clipboard.writeText(code);
    const originalText = buttonElement.textContent;
    buttonElement.textContent = 'Copied!';
    buttonElement.classList.add('copied');

    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.classList.remove('copied');
    }, 2000);
  } catch (error) {
    console.error('Failed to copy:', error);
  }
}

export { activeExample };
