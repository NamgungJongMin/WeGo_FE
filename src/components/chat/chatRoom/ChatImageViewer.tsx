'use client';

import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Close from '@/assets/close_32px.svg';
import Download from '@/assets/download.svg';
import Arrow from '@/assets/left_48px.svg';
import { ImageInfo } from '@/@types/chat';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  isViewerOpen: boolean;
  groupedImages: Record<string, ImageInfo[]>;
  currentImageIndex: number;
  currentGroup: ImageInfo | null;
  onCloseViewer: () => void;
  setCurrentImageIndex: (currentImageIndex: number) => void;
  setCurrentGroup: (currentGroup: ImageInfo | null) => void;
}

const ChatImageViewer = ({
  isViewerOpen,
  groupedImages,
  currentImageIndex,
  currentGroup,
  onCloseViewer,
  setCurrentImageIndex,
  setCurrentGroup,
}: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleDownload = (option: 'single' | 'all') => {
    if (!currentGroup) return;

    if (option === 'all') {
      currentGroup.image.forEach((imageUrl) => {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = "WE'GO-image";
        a.click();
      });
    } else {
      const imageUrl = currentGroup.image[currentImageIndex];
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = "WE'GO-image";
      a.click();
    }
  };

  const handleClickDownload: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    if (currentGroup && currentGroup.image.length === 1) {
      event.preventDefault(); // 기본 동작 방지
      handleDownload('single');
    }
  };

  const flatImages = useMemo(() => {
    return Object.keys(groupedImages || {})
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .flatMap((groupKey) =>
        groupedImages[groupKey].flatMap((group) =>
          group.image.map((image, imageIndex) => ({
            groupKey,
            group,
            imageIndex,
          })),
        ),
      );
  }, [groupedImages]);

  const initialSlideIndex = useMemo(() => {
    return flatImages.findIndex(
      (item) =>
        item.group === currentGroup && item.imageIndex === currentImageIndex,
    );
  }, [flatImages, currentGroup, currentImageIndex]);

  if (!(isViewerOpen && currentGroup && groupedImages)) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black">
      <header className="relative flex items-center justify-between p-5">
        <button
          type="button"
          onClick={onCloseViewer}
          className="text-primary-white"
        >
          <Close />
        </button>
        <h2 className="flex flex-col items-center">
          <div className="heading-1-sb text-primary-white">
            {currentGroup.uploader}
          </div>
          <div className="caption-1-r text-gray-400">
            {(() => {
              const utcDate = new Date(currentGroup.uploadDate);
              const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

              const year = kstDate.getFullYear();
              const month = String(kstDate.getMonth() + 1).padStart(2, '0');
              const day = String(kstDate.getDate()).padStart(2, '0');
              const hours = kstDate.getHours() % 12 || 12;
              const minutes = String(kstDate.getMinutes()).padStart(2, '0');
              const period = kstDate.getHours() >= 12 ? 'PM' : 'AM';

              return `${year}.${month}.${day}, ${hours}:${minutes} ${period}`;
            })()}
          </div>
        </h2>

        <Menu>
          <MenuButton onClick={handleClickDownload}>
            <Download />
          </MenuButton>
          <MenuItems className="absolute right-5 top-[70px] z-50 flex flex-col">
            <MenuItem>
              <button
                type="button"
                onClick={() => {
                  handleDownload('single');
                }}
                className="body-2-sb rounded-t bg-primary-white px-[13px] py-[9px] text-label-normal hover:bg-gray-100"
              >
                한 장만 저장
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                onClick={() => {
                  handleDownload('all');
                }}
                className="body-2-sb rounded-b border border-t-line-normal bg-primary-white px-[13px] py-[9px] text-label-normal hover:bg-gray-100"
              >
                묶음 저장
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </header>

      {groupedImages && (
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={{
            prevEl: '.prev-button',
            nextEl: '.next-button',
          }}
          className="h-[calc(100vh-160px)]"
          initialSlide={initialSlideIndex}
          onSlideChange={(swiper) => {
            const newIndex = swiper.realIndex;
            const flatImage = flatImages[newIndex];
            if (flatImage) {
              const { group, imageIndex } = flatImage;
              if (currentGroup !== group || currentImageIndex !== imageIndex) {
                setCurrentGroup(group);
                setCurrentImageIndex(imageIndex);
              }
            }
          }}
        >
          {Object.keys(groupedImages)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .flatMap((groupKey) =>
              groupedImages[groupKey].flatMap((group) =>
                group.image.map((image, imageIndex) => (
                  <SwiperSlide key={uuidv4()}>
                    <div className="relative h-full w-full">
                      <Image
                        src={image}
                        alt={`이미지 ${imageIndex + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                )),
              ),
            )}
        </Swiper>
      )}

      <button
        type="button"
        className="prev-button absolute top-1/2 z-50 -translate-y-1/2 transform bg-black/40"
        onClick={() => {
          if (swiperRef.current && !swiperRef.current.animating) {
            swiperRef.current.slidePrev();
          }
        }}
      >
        <Arrow />
      </button>
      <button
        type="button"
        className="next-button absolute right-0 top-1/2 z-50 -translate-y-1/2 rotate-180 transform bg-black/40"
        onClick={() => {
          if (swiperRef.current && !swiperRef.current.animating) {
            swiperRef.current.slideNext();
          }
        }}
      >
        <Arrow />
      </button>

      {currentGroup.image.length > 1 && (
        <div className="body-1-r absolute bottom-10 left-1/2 z-50 -translate-x-1/2 transform rounded-[40px] bg-[#333333] px-2.5 py-0.5 text-primary-white">
          {currentImageIndex + 1} / {currentGroup.image.length}
        </div>
      )}
    </div>
  );
};

export default ChatImageViewer;
