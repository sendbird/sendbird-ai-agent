export const loadMessengerSDK = async () => {
  try {
    const sdkUrl = 'https://aiagent.stg.sendbirdtest.com/orgs/default/index.js';
    const { loadMessenger } = await import(/* @vite-ignore */ sdkUrl);
    return loadMessenger;
  } catch (error) {
    console.error('Failed to load Messenger SDK:', error);
    throw error;
  }
};
