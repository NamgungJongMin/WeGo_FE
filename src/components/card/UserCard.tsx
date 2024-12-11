import { UserList } from '@/@types/user';
import Link from 'next/link';
import UserIcon from '../common/user/UserIcon';
import UserTag from '../common/tag/UserTag';

const UserCard = ({
  nickname,
  profileImage,
  openTravelCount,
  reviewCount,
  hashTags,
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
      <div className="flex items-center justify-center gap-1.5">
        {hashTags
          .split('#')
          .filter((str) => str.trim() !== '')
          .map((str) => (
            <UserTag label={str} key={str} />
          ))}
      </div>
    </Link>
  );
};
export default UserCard;
