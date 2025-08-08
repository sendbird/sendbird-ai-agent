// Configuration constants
export const APP_ID = 'F7879BE3-A59C-4134-A04A-702A1E62A9C0';
export const AI_AGENT_ID = '9ec48481-26d4-41b3-a3d7-68f20c0aeb1c';
export const USER_ID = 'test-user-123';
export const AUTH_TOKEN = 'test-auth-token';

// Language options
export const LANGUAGES = [
  { code: 'en', label: 'English', countryCode: 'US' },
  { code: 'ko', label: '한국어', countryCode: 'KR' },
  { code: 'ja', label: '日本語', countryCode: 'JP' },
  { code: 'es', label: 'Español', countryCode: 'ES' },
  { code: 'fr', label: 'Français', countryCode: 'FR' },
];

// Context presets
export const CONTEXT_PRESETS = [
  { label: 'No Context', value: null },
  {
    label: 'Technical User',
    value: { userPreference: 'technical', customerTier: 'premium' },
  },
  {
    label: 'Business User',
    value: { userPreference: 'business', customerTier: 'enterprise' },
  },
  {
    label: 'Support Request',
    value: { userType: 'customer', issueType: 'technical_support', priority: 'high' },
  },
];

// Code examples
export const CODE_EXAMPLES = {
  basic: `// Basic initialization
<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_ID}",
      aiAgentId: "${AI_AGENT_ID}"
    });
    
    console.log('Messenger ready');
  }
  
  initMessenger();
</script>`,

  authenticated: `// With authenticated user session
<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_ID}",
      aiAgentId: "${AI_AGENT_ID}"
    });
    
    // Authenticate user
    await messenger.updateUserSession({
      userId: "${USER_ID}",
      authToken: "${AUTH_TOKEN}",
      sessionHandler: {
        onSessionTokenRequired: async (resolve) => {
          resolve("${AUTH_TOKEN}");
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
      }
    });
    
    console.log('Authenticated messenger ready');
  }
  
  initMessenger();
</script>`,

  context: `// With custom context
<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger() {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_ID}",
      aiAgentId: "${AI_AGENT_ID}",
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

  runtime: `// Runtime context updates
<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  let messenger;
  
  async function initMessenger() {
    messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_ID}",
      aiAgentId: "${AI_AGENT_ID}"
    });
    
    console.log('Messenger ready');
  }
  
  // Update context without resetting
  async function updateContext(newContext) {
    if (messenger) {
      await messenger.patchContext(newContext);
      console.log('Context updated:', newContext);
    }
  }
  
  // Example usage
  initMessenger().then(() => {
    setTimeout(() => {
      updateContext({ page: 'checkout', cart: { items: 3 } });
    }, 5000);
  });
</script>`,

  localization: `// Multi-language support
<script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
<script>
  const { loadMessenger } = window;
  
  async function initMessenger(lang = 'en', country = 'US') {
    const messenger = await loadMessenger();
    
    await messenger.initialize({
      appId: "${APP_ID}",
      aiAgentId: "${AI_AGENT_ID}",
      language: lang,
      countryCode: country
    });
    
    console.log(\`Messenger ready in \${lang}-\${country}\`);
  }
  
  // Initialize with Korean
  initMessenger('ko', 'KR');
  
  // Or Japanese
  // initMessenger('ja', 'JP');
</script>`,
};
