'use client';

import Link from 'next/link';
import Plus from '@/assets/plus.svg';
import { useQuery } from '@tanstack/react-query';
import { fetchPopularUser } from '@/api/userApi';
import UserCard from '../../card/UserCard';

const WeeklyUser = () => {
  const {
    data: userList,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', 'popular'],
    queryFn: fetchPopularUser,
  });

  const currentMonth = new Date().getMonth() + 1;

  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }
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
        {isLoading && <div>로딩중 WeeklyUser</div>}
        {userList &&
          userList.map((user) => (
            <UserCard
              key={user.nickname}
              nickname={user.nickname}
              profileImage={user.profileImage}
              openTravelCount={user.openTravelCount}
              reviewCount={user.reviewCount}
            />
          ))}
      </main>
    </section>
  );
};
export default WeeklyUser;
