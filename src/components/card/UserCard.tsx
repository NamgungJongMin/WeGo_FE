import { UserList } from '@/@types/user';
import Link from 'next/link';
import UserIcon from '../common/user/UserIcon';

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
      className="flex flex-col items-center gap-4 rounded border border-line-normal px-[21px] py-5"
    >
      <UserIcon profileImage={profileImage} nickname={nickname} />
      <h3 className="heading-1-b">{nickname}</h3>
      <p className="body-3-m whitespace-nowrap text-label-alternative">
        모임장 {openTravelCount}회 • 리뷰 {reviewCount}개
      </p>
      <div className="caption-1-sb rounded-sm bg-label-normal px-1.5 py-[3px] text-primary-white">
        상세해요
      </div>
    </Link>
  );
};
export default UserCard;
