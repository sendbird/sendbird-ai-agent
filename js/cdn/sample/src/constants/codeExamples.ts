import { AI_AGENT_ID, APP_ID, AUTH_TOKEN, USER_ID } from './config';

// Code examples
export const CODE_EXAMPLES: Record<string, string> = {
  basic: `<!DOCTYPE html>
<html>
<head>
  <script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
</head>
<body>
  <script>
    (async () => {
      const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
      const messenger = await loadMessenger();
      
      await messenger.initialize({
        appId: "${APP_ID}",
        aiAgentId: "${AI_AGENT_ID}"
      });
    })();
  </script>
</body>
</html>`,
  authenticated: `<!DOCTYPE html>
<html>
<head>
  <script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
</head>
<body>
  <script>
    (async () => {
      const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
      const messenger = await loadMessenger();
      
      await messenger.initialize({
        appId: "${APP_ID}",
        aiAgentId: "${AI_AGENT_ID}"
      });

      await messenger.updateUserSession({
        userId: "${USER_ID}",
        authToken: "${AUTH_TOKEN}",
        sessionHandler: {
          onSessionTokenRequired: async (resolve) => {
            resolve("${AUTH_TOKEN}");
          }
        }
      });
    })();
  </script>
</body>
</html>`,
  context: `<!DOCTYPE html>
<html>
<head>
  <script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
</head>
<body>
  <script>
    (async () => {
      const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
      const messenger = await loadMessenger();
      
      await messenger.initialize({
        appId: "${APP_ID}",
        aiAgentId: "${AI_AGENT_ID}",
        context: {
          userType: "premium",
          department: "engineering"
        }
      });
    })();
  </script>
</body>
</html>`,
  runtime: `<!DOCTYPE html>
<html>
<head>
  <script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
</head>
<body>
  <button onclick="updateContext()">Update Context</button>
  
  <script>
    let messenger;
    
    (async () => {
      const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
      messenger = await loadMessenger();
      
      await messenger.initialize({
        appId: "${APP_ID}",
        aiAgentId: "${AI_AGENT_ID}"
      });
    })();

    async function updateContext() {
      if (messenger) {
        await messenger.patchContext({
          timestamp: new Date().toISOString(),
          action: "context_update"
        });
      }
    }
  </script>
</body>
</html>`,
  localization: `<!DOCTYPE html>
<html>
<head>
  <script src="https://aiagent.sendbird.com/orgs/default/index.js"></script>
</head>
<body>
  <select onchange="changeLanguage(this.value)">
    <option value="en-US">English</option>
    <option value="ko-KR">한국어</option>
    <option value="ja-JP">日本語</option>
  </select>
  
  <script>
    let messenger;
    
    (async () => {
      const { loadMessenger } = await import('https://aiagent.sendbird.com/orgs/default/index.js');
      messenger = await loadMessenger();
      
      await messenger.initialize({
        appId: "${APP_ID}",
        aiAgentId: "${AI_AGENT_ID}",
        language: "en-US",
        countryCode: "US"
      });
    })();

    async function changeLanguage(language) {
      if (messenger) {
        const countryCode = language.split('-')[1];
        await messenger.updateConfig({
          language: language,
          countryCode: countryCode
        });
      }
    }
  </script>
</body>
</html>`,
};
