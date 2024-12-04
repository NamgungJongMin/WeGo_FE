'use client';

import Find from '@/assets/find.svg';
import Home from '@/assets/home.svg';
import Start from '@/assets/star.svg';
import Bookmark from '@/assets/bookmark.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavigation = () => {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex h-20 items-center justify-between gap-[1.5px] bg-black px-[29px] py-[14px] text-primary-white">
        <Link href="/" className="flex flex-col items-center text-[10px]">
          <div className="flex h-9 w-9 items-center justify-center">
            <Start fill={pathname === '/' ? 'none' : 'none'} />
          </div>
          여행리뷰
        </Link>
        <Link href="/" className="flex flex-col items-center text-[10px]">
          <div className="flex h-9 w-9 items-center justify-center">
            <Find />
          </div>
          여행찾기
        </Link>
        <Link href="/" className="flex flex-col items-center text-[10px]">
          <div className="flex h-9 w-9 items-center justify-center">
            <Bookmark fill={pathname === '/' ? 'none' : 'none'} />
          </div>
          체크한 여행
        </Link>
        <Link href="/" className="flex flex-col items-center text-[10px]">
          <div className="flex h-9 w-9 items-center justify-center">
            <Home fill={pathname === '/' ? 'white' : 'none'} />
          </div>
          메인
        </Link>
      </nav>
    );
  }
  return null;
};
export default MainNavigation;
