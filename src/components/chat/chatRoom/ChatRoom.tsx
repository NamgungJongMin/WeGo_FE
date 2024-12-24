import React, { useState } from 'react';
import ChatMessages from '@/components/chat/chatRoom/ChatMessages';
import ChatInput from '@/components/chat/chatRoom/ChatInput';
import HamburgerMenu from '@/assets/menu.svg';
import FormHeader from '@/components/common/formheader/FormHeader';
import 'swiper/css';
import 'swiper/css/navigation';
import { JoinedData, ImageInfo, Message } from '@/@types/chat';
import ChatSideBar from '@/components/chat/chatRoom/ChatSideBar';
import ChatAlbum from '@/components/chat/chatRoom/ChatAlbum';
import ChatImageViewer from '@/components/chat/chatRoom/ChatImageViewer';

interface Props {
  chatData: JoinedData;
  onSendMessage: (text: string, images: File[]) => void;
}

const ChatRoom = ({ chatData, onSendMessage }: Props) => {
  const [textareaHeight, setTextareaHeight] = useState(22); // 초기 높이 설정
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<ImageInfo | null>(null); // ImageInfo
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // ImageInfo 내 이미지 배열의 인덱스

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenAlbum = () => {
    setIsAlbumOpen(true);
  };

  const handleCloseAlbum = () => {
    setIsAlbumOpen(false);
  };

  const handleOpenViewer = (group: ImageInfo) => {
    setCurrentGroup(group);
    setCurrentImageIndex(0);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setCurrentGroup(null);
    setCurrentImageIndex(0);
  };

  const groupedImages = chatData.images?.reduce(
    (acc: Record<string, ImageInfo[]>, image) => {
      const uploadDate = new Date(image.uploadDate);
      const koreanDate = new Date(uploadDate.getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      acc[koreanDate] = acc[koreanDate] || [];
      acc[koreanDate].push(image);

      acc[koreanDate].sort(
        (a, b) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
      );

      return acc;
    },
    {},
  ) as Record<string, ImageInfo[]>;

  return (
    <>
      <FormHeader
        title={
          <div className="flex items-center justify-center gap-1 truncate">
            <span className="truncate">{chatData.title}</span>
            <span className="title-5-sb text-primary-normal">
              {chatData.participants?.length}
            </span>
          </div>
        }
      >
        <button type="button" onClick={handleOpenSidebar}>
          <HamburgerMenu />
        </button>
      </FormHeader>
      <ChatMessages
        messages={chatData.messages as Message[]}
        textareaHeight={textareaHeight}
      />
      <ChatInput
        onSendMessage={onSendMessage}
        onHeightChange={setTextareaHeight}
      />
      <ChatSideBar
        chatData={chatData}
        isSidebarOpen={isSidebarOpen}
        onOpenAlbum={handleOpenAlbum}
        onCloseSidebar={handleCloseSidebar}
        onOpenViewer={handleOpenViewer}
      />
      <ChatAlbum
        groupedImages={groupedImages}
        isAlbumOpen={isAlbumOpen}
        onCloseAlbum={handleCloseAlbum}
        onOpenViewer={handleOpenViewer}
      />
      <ChatImageViewer
        isViewerOpen={isViewerOpen}
        groupedImages={groupedImages}
        currentImageIndex={currentImageIndex}
        currentGroup={currentGroup}
        onCloseViewer={handleCloseViewer}
        setCurrentImageIndex={setCurrentImageIndex}
        setCurrentGroup={setCurrentGroup}
      />
    </>
  );
};

export default ChatRoom;
