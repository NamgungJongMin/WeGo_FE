import { UserList } from '@/@types/user';
import Image from 'next/image';
import Link from 'next/link';

const UserCard = ({
  nickname,
  profileImage,
  openTravelCount,
  reviewCount,
}: UserList) => {
  return (
    <Link
      href="/"
      aria-label={`${nickname} 프로필 보기`}
      className="flex flex-col items-center gap-4 rounded border border-line-normal px-5 py-5"
    >
      <div className="h-16 w-16 overflow-hidden rounded-full">
        <Image
          src={profileImage}
          alt={`${nickname}의 프로필 사진`}
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="font-bold">{nickname}</h3>

      <p className="text-xs font-medium text-label-alternative">
        모임장 {openTravelCount}회 • 리뷰 {reviewCount}개
      </p>
      <div className="rounded-sm bg-label-normal px-2 py-1 text-[10px] font-semibold text-primary-white">
        상세해요
      </div>
    </Link>
  );
};
export default UserCard;
