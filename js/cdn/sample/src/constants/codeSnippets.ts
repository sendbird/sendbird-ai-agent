import { APP_CONFIG } from '../config/appConfig';

export interface CodeGenerationParams {
  hasSession: boolean;
  language: string;
  context: Record<string, string> | null;
}

export const generateCode = (params: CodeGenerationParams): string => {
  const { hasSession, context, language } = params;

  const userSessionSection = hasSession
    ? `
    await messenger.updateUserSession({
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
    });`
    : '';

  const contextSection = context
    ? `
      context: ${JSON.stringify(context, null, 6).replace(/\n/g, '\n      ')},`
    : '';

  const languageSection =
    language !== 'en-US'
      ? `
      language: "${language.split('-')[0]}",
      countryCode: "${language.split('-')[1]}",`
      : '';

  return `<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}"${contextSection}${languageSection}
    });${userSessionSection}
    
    console.log('Messenger ready');
  }
  
  initMessenger();
</script>`;
};

export const SETUP_SNIPPETS = {
  installation: `<!-- Add to your HTML head -->
<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>`,

  basicImport: `<!-- Basic setup -->
<script>
  const { loadMessenger } = window;
  // Your messenger code here
</script>`,
};

export const CODE_EXAMPLES = {
  basic: {
    title: 'Basic Setup',
    code: `<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}"
    });
    
    console.log('Messenger ready');
  }
  
  initMessenger();
</script>`,
  },

  authenticated: {
    title: 'With Authentication',
    code: `<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}"
    });
    
    await messenger.updateUserSession({
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
    });
    
    console.log('Authenticated messenger ready');
  }
  
  initMessenger();
</script>`,
  },

  context: {
    title: 'With Context',
    code: `<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}",
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
    title: 'Runtime Updates',
    code: `<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  let messenger;
  
  async function initMessenger() {
    messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}"
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
      updateContext({ page: 'checkout', cart: { items: 3 } });
    }, 5000);
  });
</script>`,
  },

  localization: {
    title: 'Multi-language',
    code: `<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger(lang = 'en', country = 'US') {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}",
      language: lang,
      countryCode: country
    });
    
    console.log(\`Messenger ready in \${lang}-\${country}\`);
  }
  
  initMessenger('ko', 'KR');
  
</script>`,
  },

  events: {
    title: 'Event Handlers',
    code: `<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_CONFIG.appId}",
      aiAgentId: "${APP_CONFIG.aiAgentId}"
    });
    
    messenger.on('conversationStarted', (data) => {
      console.log('Conversation started:', data);
    });
    
    messenger.on('messageReceived', (message) => {
      console.log('Message received:', message);
    });
    
    messenger.on('error', (error) => {
      console.error('Messenger error:', error);
    });
    
    console.log('Messenger with events ready');
  }
  
  initMessenger();
</script>`,
  },
};
