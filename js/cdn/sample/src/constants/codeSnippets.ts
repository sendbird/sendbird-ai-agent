import { APP_CONFIG } from '../config/appConfig';

export interface CodeGenerationParams {
  hasSession: boolean;
  language: string;
  context: Record<string, string> | null;
}

export const generateCode = (params: CodeGenerationParams): string => {
  const { hasSession, context, language } = params;

  const userSessionSection = hasSession
    ? `,
      userSessionInfo: new messenger.ManualSessionInfo({
        userId: "${APP_CONFIG.userId}",
        authToken: "${APP_CONFIG.authToken}",
        sessionHandler: {
          onSessionTokenRequired: async (resolve) => {
            resolve("${APP_CONFIG.authToken}");
          },
          onSessionClosed: () => {
            console.log('Session closed');
          },
          onSessionError: (error) => {
            console.error('Session error:', error);
          },
          onSessionRefreshed: () => {
            console.log('Session refreshed')
          }
        }
      })`
    : `,
      userSessionInfo: new messenger.AnonymousSessionInfo()`;

  const contextSection = context
    ? `,
      context: ${JSON.stringify(context, null, 8).replace(/\n/g, '\n      ')}`
    : '';

  const languageSection =
    language !== 'en-US'
      ? `,
      language: "${language.split('-')[0]}",
      countryCode: "${language.split('-')[1]}"`
      : '';

  return `<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";

  async function initMessenger() {
    const messenger = await loadMessenger();

    messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}"${contextSection}${languageSection}${userSessionSection}
    });

    console.log('Messenger ready');
  }

  initMessenger();
</script>`;
};

export const SETUP_SNIPPETS = {
  installation: `<!-- Add to your HTML -->
<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";
  // Your messenger code here
</script>`,
};

export const CODE_EXAMPLES = {
  basic: {
    title: 'Basic Setup',
    code: `<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";

  async function initMessenger() {
    const messenger = await loadMessenger();

    messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}",
      userSessionInfo: new messenger.AnonymousSessionInfo()
    });

    console.log('Messenger ready');
  }

  initMessenger();
</script>`,
  },

  authenticated: {
    title: 'With Authentication',
    code: `<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";

  async function initMessenger() {
    const messenger = await loadMessenger();

    messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}",
      userSessionInfo: new messenger.ManualSessionInfo({
        userId: "${APP_CONFIG.userId}",
        authToken: "${APP_CONFIG.authToken}",
        sessionHandler: {
          onSessionTokenRequired: async (resolve) => {
            resolve("${APP_CONFIG.authToken}");
          },
          onSessionClosed: () => {
            console.log('Session closed');
          },
          onSessionError: (error) => {
            console.error('Session error:', error);
          },
          onSessionRefreshed: () => {
            console.log('Session refreshed')
          }
        }
      })
    });

    console.log('Authenticated messenger ready');
  }

  initMessenger();
</script>`,
  },

  context: {
    title: 'With Context',
    code: `<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";

  async function initMessenger() {
    const messenger = await loadMessenger();

    messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}",
      userSessionInfo: new messenger.AnonymousSessionInfo(),
      context: {
        userPreference: "technical",
        customerTier: "premium",
        supportLevel: "advanced"
      }
    });

    console.log('Messenger with context ready');
  }

  initMessenger();
</script>`,
  },

  runtime: {
    title: 'Runtime Context Updates',
    code: `<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";
  let messenger;

  async function initMessenger() {
    messenger = await loadMessenger();

    messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}",
      userSessionInfo: new messenger.AnonymousSessionInfo()
    });

    console.log('Messenger ready');
  }

  async function updateContext(newContext) {
    if (messenger) {
      await messenger.patchContext(newContext);
      console.log('Context updated:', newContext);
    }
  }

  initMessenger().then(() => {
    setTimeout(() => {
      updateContext({ page: "checkout", cartItems: "3", cartValue: "100" });
    }, 5000);
  });
</script>`,
  },

  localization: {
    title: 'Multi-language',
    code: `<script type="module">
  import { loadMessenger } from "https://aiagent.sendbird.com/orgs/default/index.js";

  async function initMessenger(lang = 'en', country = 'US') {
    const messenger = await loadMessenger();

    messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}",
      userSessionInfo: new messenger.AnonymousSessionInfo(),
      language: lang,
      countryCode: country
    });

    console.log(\`Messenger ready in \${lang}-\${country}\`);
  }

  initMessenger('ko', 'KR');
</script>`,
  },
};
