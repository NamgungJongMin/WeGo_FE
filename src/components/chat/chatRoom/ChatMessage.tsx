import React from 'react';
import Image from 'next/image';
import Remove from '@/assets/close_red.svg';
import Resend from '@/assets/resend.svg';
import { Message } from '@/@types/chat';
import { formatDateToKorean, formatTimeToKorean } from '@/utils/chat';

interface Props {
  messages: Message[];
  message: Message;
  messageIndex: number;
  isError: boolean;
  textBoxHeights: Record<string, number>;
  messageRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

const ChatMessage = ({
  messages,
  message,
  messageIndex,
  isError,
  textBoxHeights,
  messageRefs,
}: Props) => {
  const prevMessage = messages[messageIndex - 1];
  const nextMessage = messages[messageIndex + 1];

  const isNewDate =
    !prevMessage ||
    formatDateToKorean(prevMessage.timestamp) !==
      formatDateToKorean(message.timestamp);

  const isSameUser =
    prevMessage &&
    prevMessage.user === message.user &&
    prevMessage.timestamp === message.timestamp;

  const isLastInGroup =
    !nextMessage ||
    nextMessage.user !== message.user ||
    nextMessage.timestamp !== message.timestamp;

  const textBoxHeight = textBoxHeights[message.id] || 0;

  const getMessageGridStyles = (imagesLength: number) => {
    if (imagesLength === 1)
      return 'h-[180px] w-[200px] grid-cols-2 grid-rows-1';
    if (imagesLength === 2)
      return 'h-[144px] w-[218px] grid-cols-4 grid-rows-1';
    if (imagesLength <= 4) return 'h-[144px] w-[218px] grid-cols-4 grid-rows-2';
    if (imagesLength > 6) return 'h-[218px] w-[218px] grid-cols-6 grid-rows-3';
    return 'h-[144px] w-[218px] grid-cols-6 grid-rows-2';
  };

  const getColSpan = (imagesLength: number, msgIdx: number) => {
    if (imagesLength === 3 && msgIdx === 2) {
      return 'col-span-4';
    }
    if (
      (imagesLength === 5 && msgIdx >= 3) ||
      (imagesLength === 8 && msgIdx >= 6)
    ) {
      return 'col-span-3';
    }
    if (imagesLength === 7 && msgIdx === 6) {
      return 'col-span-6';
    }
    return '';
  };

  return (
    <>
      {isNewDate && (
        <div className="mb-8 flex items-center gap-2.5">
          <div className="h-[1px] flex-1 bg-line-normal" />
          <div className="body-3-m text-label-neutral">
            {formatDateToKorean(message.timestamp)}
          </div>
          <div className="h-[1px] flex-1 bg-line-normal" />
        </div>
      )}
      <div
        className={`flex flex-col ${
          isLastInGroup ? 'mb-4' : 'mb-2'
        } ${message.isMine ? 'items-end' : 'items-start'}`}
      >
        {!isSameUser && !message.isMine && (
          <div className="flex">
            <div className="relative mr-[7px] h-6 w-6">
              <Image
                src={message.image}
                alt={`${message.user} 프로필 이미지`}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="caption-1-sb text-label-neutral">
              {message.user}
            </div>
          </div>
        )}
        <div className="flex items-end">
          <div
            className={`flex flex-col ${message.isMine ? 'items-end' : 'items-start'} ${message.isMine ? 'order-2 ml-[5px]' : 'order-1 ml-[30px] mr-[5px]'}`}
          >
            {message.images.length !== 0 && (
              <div
                className={`${message.text && 'mb-2'} grid gap-2 ${getMessageGridStyles(message.images.length)}`}
              >
                {message.images.map((image, msgIdx) => (
                  <div
                    key={URL.createObjectURL(image)}
                    className={`relative col-span-2 ${getColSpan(message.images.length, msgIdx)}`}
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`${message.user} 업로드 이미지 ${msgIdx + 1}`}
                      fill
                      className={`${message.images.length === 1 ? 'rounded-lg' : 'rounded'} object-cover`}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end">
              {message.text !== '' && (
                <>
                  <div
                    ref={(el) => {
                      if (messageRefs.current) {
                        const refs = messageRefs.current;
                        refs[message.id] = el;
                      }
                    }}
                    className={`body-3-r w-fit max-w-[255px] break-words ${
                      message.isMine
                        ? 'order-2 ml-[5px] bg-primary-normal text-primary-white'
                        : 'order-1 mr-[5px] bg-gray-200 text-label-neutral'
                    } ${textBoxHeight > 30 ? 'rounded-2xl' : 'rounded-[30px]'} px-2.5 py-1.5`}
                  >
                    {message.text}
                  </div>

                  <div
                    className={`relative ${message.isMine ? 'order-1' : 'order-2'} ${isError && 'flex gap-1.5 rounded-md border border-gray-200 px-[5px] py-1'}`}
                  >
                    {isError ? (
                      <>
                        <button type="button" onClick={() => {}}>
                          <Resend />
                        </button>
                        <button type="button" onClick={() => {}}>
                          <Remove />
                        </button>
                      </>
                    ) : (
                      <>
                        <div
                          className={`caption-1-sb absolute ${
                            isLastInGroup ? 'bottom-[14px]' : 'bottom-0'
                          } text-label-neutral ${message.isMine ? 'right-0' : 'left-0'}`}
                        >
                          {message.unseenUserCount}
                        </div>
                        {isLastInGroup && (
                          <div className="caption-1-r whitespace-nowrap text-label-alternative">
                            {formatTimeToKorean(message.timestamp)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {message.text === '' && (
            <div
              className={`relative ${message.isMine ? 'order-1' : 'order-2'} ${isError && 'flex gap-1.5 rounded-md border border-gray-200 px-[5px] py-1'}`}
            >
              {isError ? (
                <>
                  <button type="button" onClick={() => {}}>
                    <Resend />
                  </button>
                  <button type="button" onClick={() => {}}>
                    <Remove />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className={`caption-1-sb absolute ${
                      isLastInGroup ? 'bottom-[14px]' : 'bottom-0'
                    } text-label-neutral ${message.isMine ? 'right-0' : 'left-0'}`}
                  >
                    {message.unseenUserCount}
                  </div>
                  {isLastInGroup && (
                    <div className="caption-1-r whitespace-nowrap text-label-alternative">
                      {formatTimeToKorean(message.timestamp)}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
