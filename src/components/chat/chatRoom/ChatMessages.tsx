import { useEffect, useRef, useState } from 'react';
import Chat from '@/assets/chat_gray.svg';
import { Message } from '@/@types/chat';
import ChatMessage from '@/components/chat/chatRoom/ChatMessage';

interface Props {
  messages: Message[];
  textareaHeight: number;
}

const ChatMessages = ({ messages, textareaHeight }: Props) => {
  const [isError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [textBoxHeights, setTextBoxHeights] = useState<Record<string, number>>(
    {},
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateTextBoxHeights = () => {
    const heights: Record<string, number> = {};
    Object.keys(messageRefs.current).forEach((id) => {
      const element = messageRefs.current[id];
      if (element) {
        heights[id] = element.clientHeight;
      }
    });
    setTextBoxHeights(heights);
  };

  useEffect(() => {
    updateTextBoxHeights();

    window.addEventListener('resize', updateTextBoxHeights);
    return () => {
      window.removeEventListener('resize', updateTextBoxHeights);
    };
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, textareaHeight]);

  return (
    <ul
      className="overflow-y-auto p-5 custom-scrollbar"
      style={{
        height: `calc(100vh - ${110 + textareaHeight}px)`,
      }}
    >
      {messages.length === 0 ? (
        <div className="absolute inset-0 m-auto flex h-fit flex-col items-center">
          <Chat className="mb-4" />
          <p className="body-1-m text-center text-label-alternative">
            채팅이 시작 되었습니다!
            <br />
            여행에 대해 활발하게 의견을 나눠보세요 :)
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <li key={msg.id}>
            <ChatMessage
              messages={messages}
              message={msg}
              messageIndex={index}
              isError={isError}
              textBoxHeights={textBoxHeights}
              messageRefs={messageRefs}
            />
          </li>
        ))
      )}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default ChatMessages;
