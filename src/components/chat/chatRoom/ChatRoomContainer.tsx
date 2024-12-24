'use client';

import { useState } from 'react';
import ChatRoomEntrance from '@/components/chat/chatRoom/ChatRoomEntrance';
import ChatRoom from '@/components/chat/chatRoom/ChatRoom';
import { Button } from '@/components/common/button/Button';
import MainNavigation from '@/components/nav/MainNavigation';
import { JoinedData, Message } from '@/@types/chat';
import initData from '@/mocks/data/chat/chatRoomInitialData.json';
import chatImages from '@/mocks/data/chat/chatImages.json';

const ChatRoomContainer = () => {
  const [data, setData] = useState<JoinedData>(initData);

  const fetchChatRoomData = () => {
    setTimeout(() => {
      const newChatRoomData = {
        isJoined: true,
        title: '서울에서 1박2일 즐겨보아요 :)',
        messages: Array.from({ length: 10 }, (_, i) => ({
          id: `${i + 1}`,
          user: `User ${i + 1}`,
          image: '/user.jpg',
          text: `Message ${i + 1} content.`,
          images: [],
          timestamp: new Date(Date.now() - i * 1000 * 60 * 15).toLocaleString(
            'ko-KR',
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            },
          ),
          isMine: i % 2 === 0,
          unseenUserCount: 2,
        })),
        participants: Array.from({ length: 15 }, (_, i) => ({
          user: `Participant ${i + 1}`,
          image: '/user.jpg',
          isMe: i === 0,
        })),
        images: chatImages.images,
      };
      setData(newChatRoomData);
    }, 500);
  };

  const handleSendMessage = (text: string, images: File[]) => {
    const newMessage = {
      id: `${Date.now()}`,
      user: '나',
      text,
      image: '/user.jpg',
      images,
      timestamp: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      isMine: true,
      unseenUserCount: 2,
    };
    setData((prev) => ({
      ...prev,
      messages: [...(prev.messages as Message[]), newMessage],
    }));
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        {data.isJoined ? (
          <ChatRoom chatData={data} onSendMessage={handleSendMessage} />
        ) : (
          <ChatRoomEntrance chatData={data}>
            <Button handler={fetchChatRoomData} fill="blue" className="mt-auto">
              채팅방 참여하기
            </Button>
          </ChatRoomEntrance>
        )}
      </div>
      <MainNavigation isActive={!data.isJoined} />
    </>
  );
};

export default ChatRoomContainer;
