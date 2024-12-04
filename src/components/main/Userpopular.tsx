import Link from 'next/link';
import Plus from '@/assets/plus.svg';
import UserCard from '../card/UserCard';

interface Props {
  profileImage: string;
  nickname: string;
  openTravelCount: number;
  reviewCount: number;
}

interface UserListProps {
  userList: Props[];
}

const Userpopular = ({ userList }: UserListProps) => {
  const dateMonth = new Date().getMonth() + 1;
  return (
    <section className="px-5 py-14">
      <div>
        <div className="flex justify-between">
          <div className="text-2xl font-extrabold text-label-normal">
            {dateMonth}월의 여행지기
          </div>
          <Link
            href="/"
            className="flex h-5 items-center justify-center gap-0.5 text-label-normal"
          >
            <div className="text-xs font-semibold">MORE</div>
            <Plus width={14} height={14} />
          </Link>
        </div>
        <div className="pb-6 pt-[6px] text-sm font-medium text-label-alternative">
          이번달 리뷰가 많은 여행지기들을 소개해 드려요!
        </div>
      </div>
      <div className="flex gap-4">
        {userList.map((user) => (
          <UserCard
            key={user.nickname}
            nickname={user.nickname}
            image={user.profileImage}
            openTravelCount={user.openTravelCount}
            reviewCount={user.reviewCount}
          />
        ))}
      </div>
    </section>
  );
};
export default Userpopular;
