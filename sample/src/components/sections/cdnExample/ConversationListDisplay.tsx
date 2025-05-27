import { loadMessengerSDK } from '@/utils/loadMessengerSDK';
import { useEffect, useRef } from 'react';

export const ConversationListDisplay = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeConversationList = async () => {
      try {
        const loadMessenger = await loadMessengerSDK();
        const conversationListMessenger = await loadMessenger({
          customMainComponent:
            /** @ts-ignore */
            ({ messenger }) =>
              /** @ts-ignore */
              (props) => {
                return (
                  <messenger.AgentProviderContainer {...props}>
                    <messenger.ConversationList />
                  </messenger.AgentProviderContainer>
                );
              },
          containerId: containerRef.current?.id,
          useShadowDOM: false,
        });

        conversationListMessenger.initialize({
          appId: import.meta.env.VITE_APP_ID,
          aiAgentId: import.meta.env.VITE_AI_AGENT_ID,
          customApiHost: import.meta.env.VITE_CUSTOM_API_HOST,
          customWebSocketHost: import.meta.env.VITE_CUSTOM_WS_HOST,
        });
      } catch (error) {
        console.error('Failed to initialize conversation list:', error);
      }
    };

    if (containerRef.current) {
      initializeConversationList();
    }
  }, []);

  return (
    <div ref={containerRef} id="conversation-list-container" className="w-[300px] h-[500px] border border-gray-300" />
  );
};
