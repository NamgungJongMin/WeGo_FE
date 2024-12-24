import React from 'react';
import Image from 'next/image';
import Group from '@/assets/group.svg';
import Right from '@/assets/right_gray.svg';
import Leaveout from '@/assets/leaveout.svg';
import { JoinedData, ImageInfo } from '@/@types/chat';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  chatData: JoinedData;
  isSidebarOpen: boolean;
  onOpenAlbum: () => void;
  onCloseSidebar: () => void;
  onOpenViewer: (image: ImageInfo) => void;
}

const ChatSideBar = ({
  chatData,
  isSidebarOpen,
  onOpenAlbum,
  onCloseSidebar,
  onOpenViewer,
}: Props) => {
  return (
    <>
      <div
        className={`fixed right-0 top-0 z-10 h-full w-[296px] bg-white shadow-lg transition duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-[calc(100vh-80px)] flex-col gap-5 px-4 py-5">
          <h2 className="title-5-b text-label-normal">채팅방 모아보기</h2>
          <div>
            <header className="mb-2 flex items-center justify-between">
              <h3 className="body-2-m text-label-normal">이미지</h3>
              <button type="button" onClick={onOpenAlbum}>
                <Right />
              </button>
            </header>
            <ul className="flex gap-2">
              {chatData.images
                ?.sort(
                  (a, b) =>
                    new Date(b.uploadDate).getTime() -
                    new Date(a.uploadDate).getTime(),
                )
                .map((img, index) =>
                  index < 4 ? (
                    <li key={uuidv4()}>
                      <button
                        type="button"
                        className="relative h-[60px] w-[60px] cursor-pointer"
                        onClick={() => onOpenViewer(img)}
                      >
                        <Image
                          src={img.image[0]}
                          alt={`${img.uploader} 업로드 이미지`}
                          fill
                          className="rounded object-cover"
                        />
                        {img.image.length > 1 && (
                          <Group className="absolute bottom-1.5 right-1.5" />
                        )}
                      </button>
                    </li>
                  ) : null,
                )}
            </ul>
          </div>
          <div className="h-[1px] bg-line-normal" />
          <h2 className="title-5-b text-label-normal">참여자</h2>
          <ul className="flex flex-1 flex-col gap-4 overflow-y-auto custom-scrollbar">
            {chatData.participants?.map(({ user, image, isMe }) => (
              <div key={uuidv4()} className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src={image}
                    alt={`${user} 프로필 이미지`}
                    fill
                    className="rounded-full object-cover"
                  />
                  {isMe && (
                    <div className="caption-1-sb absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white">
                      ME
                    </div>
                  )}
                </div>
                <div
                  className={`${isMe ? 'body-2-sb' : 'body-2-r'} truncate text-label-normal`}
                >
                  {user}
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="border border-line-normal bg-background-alternative px-4 pb-8 pt-4">
          <button type="button" onClick={onCloseSidebar}>
            <Leaveout />
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-label-strong/40"
          role="button"
          tabIndex={0}
          onClick={onCloseSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              onCloseSidebar();
            }
          }}
          aria-label="Close Sidebar"
        />
      )}
    </>
  );
};

export default ChatSideBar;
