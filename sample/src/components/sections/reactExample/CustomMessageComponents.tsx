import { useState } from 'react';

import { IncomingMessageProps } from '@sendbird/ai-agent-messenger-react';

const CustomSenderAvatar = () => {
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        border: '2px solid #e5e7eb',
        animation: 'botPulse 2s ease-in-out infinite',
        transformOrigin: 'center',
      }}
    >
      🤖
      <style>{`
        @keyframes botPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

const CustomSenderName = (props: { sender?: { nickname?: string } }) => {
  return (
    <div
      style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#6366f1',
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {props.sender?.nickname || 'AI Assistant'} ✨
    </div>
  );
};

const CustomMessageBody = (props: IncomingMessageProps) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        padding: '12px 16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        position: 'relative',
      }}
    >
      <div style={{ color: '#1f2937', lineHeight: '1.5' }}>
        {props.messageType === 'file' && props.file ? (
          <div>
            {props.file.type?.startsWith('image/') ? (
              <img
                src={props.file.url}
                alt={props.file.name || 'Image'}
                style={{ maxWidth: '200px', borderRadius: '8px' }}
              />
            ) : (
              <div style={{ padding: '8px', background: '#f3f4f6', borderRadius: '4px' }}>
                📎 {props.file.name || 'File'}
              </div>
            )}
            {props.message && <div style={{ marginTop: '8px' }}>{props.message}</div>}
          </div>
        ) : (
          <div>{props.message}</div>
        )}
      </div>
    </div>
  );
};

const CustomSentTime = (props: { createdAt: number }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
      <span style={{ fontSize: '11px', color: '#6366f1' }}>{new Date(props.createdAt).toLocaleTimeString()}</span>
    </div>
  );
};

const CustomSuggestedReplies = (props: IncomingMessageProps) => {
  const [replied, setReplied] = useState(false);

  const suggestedReplies = props.extendedMessagePayload?.suggested_replies ?? [];
  if (suggestedReplies.length === 0 || replied) {
    return null;
  }

  return (
    <div
      style={{
        margin: '16px 0',
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
    >
      {suggestedReplies.map((reply, i) => (
        <button
          key={i}
          onClick={() => {
            if (props.onClickSuggestedReply) {
              props.onClickSuggestedReply({ reply });
              setReplied(true);
            }
          }}
          style={{
            boxSizing: 'border-box',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '14px',
            cursor: 'pointer',
            wordBreak: 'break-word',
            maxWidth: 'calc(100% - 70px)',
            whiteSpace: 'pre-wrap',
            fontSize: '14px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1)';
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>💬 {reply}</span>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              pointerEvents: 'none',
            }}
            className="hover-overlay"
          />
        </button>
      ))}
    </div>
  );
};

export const CustomMessageComponents = {
  SenderAvatar: CustomSenderAvatar,
  SenderName: CustomSenderName,
  MessageBody: CustomMessageBody,
  SentTime: CustomSentTime,
  SuggestedReplies: CustomSuggestedReplies,
};
