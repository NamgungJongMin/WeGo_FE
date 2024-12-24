import FormHeader from '@/components/common/formheader/FormHeader';
import Image from 'next/image';
import { JoinedData } from '@/@types/chat';

interface Props {
  chatData: JoinedData;
  children: React.ReactNode;
}

const ChatRoomEntrance = ({ chatData, children }: Props) => {
  const {
    image,
    title,
    description,
    host,
    hostImage,
    totalMembersCount,
    membersCount,
  } = chatData;
  return (
    <>
      <FormHeader title="채팅" />
      <div className="mb-[120px] mt-10 flex h-full flex-1 flex-col items-center text-center">
        <div className="relative mb-6 h-[100px] w-[100px] overflow-hidden rounded-full">
          <Image
            src={image as string}
            alt={title as string}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="title-4-b mb-1 text-label-normal">{title}</h2>
        <p className="body-2-r mb-6 text-label-alternative">{description}</p>
        <div className="flex">
          <div className="relative mr-[7px] h-[24px] w-[24px] overflow-hidden rounded-full">
            <Image
              src={hostImage as string}
              alt={host as string}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className="body-2-b text-label-neutral after:mx-2 after:text-line-normal after:content-['|']">
            {host}
          </span>
          <span className="body-2-m text-label-alternative">
            {membersCount}/{totalMembersCount}명
          </span>
        </div>
        {children}
      </div>
    </>
  );
};

export default ChatRoomEntrance;
