'use client';

import { useState } from 'react';
import ChatHeader from '@/components/chat/chatRoomList/ChatHeader';
import ChatRoomList from '@/components/chat/chatRoomList/ChatRoomList';
import Chat from '@/assets/chat_gray.svg';
import { Room, SortType } from '@/@types/chat';
import data from '@/mocks/data/chat/chatRoomList.json';
import { sortRooms } from '@/utils/chat';

const ChatRoomListContainer = () => {
  const { chatRoomList } = data;
  const [sortedRooms, setSortedRooms] = useState(
    sortRooms(chatRoomList, '최근순'),
  );

  const handleExitRoom = (id: string) => {
    setSortedRooms(sortedRooms.filter((room: Room) => room.id !== id));
  };

  const handleSortRooms = (sort: SortType) => {
    setSortedRooms(sortRooms(sortedRooms, sort));
  };

  return (
    <div className="relative min-h-screen">
      <ChatHeader onSortChange={handleSortRooms} />
      {sortedRooms.length === 0 ? (
        <div className="absolute inset-0 m-auto flex h-fit flex-col items-center">
          <Chat className="mb-4" />
          <p className="body-1-m text-center text-label-alternative">
            여행에 참여하여
            <br />
            채팅을 시작 해 보세요!
          </p>
        </div>
      ) : (
        <ChatRoomList rooms={sortedRooms} onExit={handleExitRoom} />
      )}
    </div>
  );
};
export default ChatRoomListContainer;
