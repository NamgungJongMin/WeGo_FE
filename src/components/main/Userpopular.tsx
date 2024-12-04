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

const UserPopular = ({ userList }: UserListProps) => {
  const currentMonth = new Date().getMonth() + 1;
  return (
    <section className="px-5 pb-32 pt-14">
      <header className="flex justify-between">
        <h2 className="text-2xl font-extrabold text-label-normal">
          {currentMonth}월의 여행지기
        </h2>
        <Link
          href="/"
          aria-label="더 많은 여행지기 보기"
          className="flex items-center justify-center gap-0.5 text-label-normal"
        >
          <span className="text-xs font-semibold">MORE</span>
          <Plus width={14} height={14} aria-hidden="true" />
        </Link>
      </header>
      <p className="pb-6 pt-1 text-sm font-medium text-label-alternative">
        이번달 리뷰가 많은 여행지기들을 소개해 드려요!
      </p>

      <main className="flex justify-center gap-4">
        {userList.map((user) => (
          <UserCard
            key={user.nickname}
            nickname={user.nickname}
            image={user.profileImage}
            openTravelCount={user.openTravelCount}
            reviewCount={user.reviewCount}
          />
        ))}
      </main>
    </section>
  );
};
export default UserPopular;
