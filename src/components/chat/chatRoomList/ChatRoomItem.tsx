import Image from 'next/image';
import Link from 'next/link';
import Other from '@/assets/other.svg';
import Chat from '@/assets/chat_blue.svg';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { useState, useRef } from 'react';
import { Button } from '@/components/common/button/Button';

interface Props {
  id: string;
  title: string;
  host: string;
  date: string;
  image: string;
  membersCount: number;
  messageCount: number;
  onExit: (id: string) => void;
}

const ChatRoomItem = ({
  id,
  title,
  host,
  date,
  image,
  membersCount,
  messageCount,
  onExit,
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openCalendar = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  const closeCalendar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <li className="relative">
        <Link
          className="flex cursor-pointer items-start border-b border-line-neutral p-5 transition-all duration-300 hover:bg-gray-100"
          href={`/chat/${id}`}
        >
          <div className="relative mr-2.5 h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full">
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </div>
          <div className="mr-[60px] min-w-0 flex-1">
            <h2 className="heading-1-b mb-2 truncate text-label-normal">
              {title}
            </h2>
            <p className="body-2-r flex truncate text-label-alternative">
              <Chat />
              <span className="body-2-sb ml-1 text-label-neutral after:mx-1.5 after:text-line-normal after:content-['|']">
                {host}
              </span>
              <span className='after:mx-1.5 after:text-line-normal after:content-["|"]'>
                {membersCount}명
              </span>
              {date}
            </p>
          </div>
        </Link>
        {messageCount > 0 && (
          <span className="caption-1-sb absolute right-10 top-[23px] rounded-[14px] bg-primary-normal px-1 text-primary-white">
            {messageCount}
            {messageCount > 100 && '+'}
          </span>
        )}
        <button
          type="button"
          onClick={openCalendar}
          className="absolute right-5 top-[23px]"
        >
          <Other />
        </button>
      </li>
      <Dialog open={isOpen} onClose={closeCalendar} className="relative z-50">
        <DialogBackdrop
          className="fixed inset-0 bg-label-strong/40"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex w-screen items-end">
          <DialogPanel
            ref={modalRef}
            className="w-full bg-background-normal px-5"
            aria-modal="true"
          >
            <Button
              handler={() => {
                onExit(id);
              }}
              className="mb-2.5 mt-5 w-full min-w-[335px]"
              size="default"
            >
              채팅방 나가기
            </Button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ChatRoomItem;
