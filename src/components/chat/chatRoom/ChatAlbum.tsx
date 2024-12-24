import React from 'react';
import Image from 'next/image';
import Group from '@/assets/group.svg';
import Close from '@/assets/close_32px.svg';
import { ImageInfo } from '@/@types/chat';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  groupedImages: Record<string, ImageInfo[]>;
  isAlbumOpen: boolean;
  onCloseAlbum: () => void;
  onOpenViewer: (image: ImageInfo) => void;
}

const ChatAlbum = ({
  groupedImages,
  isAlbumOpen,
  onCloseAlbum,
  onOpenViewer,
}: Props) => {
  if (!isAlbumOpen) return null;
  return (
    <div className="fixed inset-0 z-20 bg-white">
      <header className="relative flex h-[60px] items-center justify-center border-b border-[#DADDE1]">
        <button
          type="button"
          className="absolute left-0 ml-5"
          onClick={onCloseAlbum}
        >
          <Close />
        </button>
        <h2 className="title-5-sb text-label-normal">이미지</h2>
      </header>
      <div
        className="flex flex-col gap-8 overflow-y-auto py-9 pl-[21px] pr-[20px] custom-scrollbar"
        style={{
          height: `calc(100vh - 60px)`,
        }}
      >
        {groupedImages &&
          Object.keys(groupedImages)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date) => (
              <div key={date}>
                <h3 className="body-3-r mb-3 text-label-neutral">
                  {date.replace(/-/g, '.')}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {groupedImages[date].map((image) => (
                    <li key={uuidv4()}>
                      <button
                        type="button"
                        className="relative h-[106px] w-[106px] shrink-0 cursor-pointer"
                        onClick={() => onOpenViewer(image)}
                      >
                        <Image
                          src={image.image[0]}
                          alt={`${image.uploader} 업로드 이미지`}
                          fill
                          className="rounded object-cover"
                        />
                        {image.image.length > 1 && (
                          <Group className="absolute bottom-1.5 right-1.5" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ChatAlbum;
