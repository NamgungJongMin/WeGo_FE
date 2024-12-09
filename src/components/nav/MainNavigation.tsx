'use client';

import Find from '@/assets/find.svg';
import Home from '@/assets/home.svg';
import Start from '@/assets/star.svg';
import Bookmark from '@/assets/bookmark.svg';
import { usePathname } from 'next/navigation';
import NavLink from './NavigationLink';

const MainNavigation = () => {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex h-20 items-center justify-between bg-black px-[29px] py-3.5 text-primary-white">
      <NavLink
        href="/reviews"
        icon={<Start />}
        label="여행리뷰"
        isActive={pathname !== '/'}
      />
      <NavLink
        href="/find"
        icon={<Find />}
        label="여행찾기"
        isActive={pathname !== '/'}
      />
      <NavLink
        href="/bookmarks"
        icon={<Bookmark />}
        label="체크한 여행"
        isActive={pathname !== '/'}
      />
      <NavLink
        href="/"
        icon={<Home />}
        label="메인"
        isActive={pathname === '/'}
      />
    </nav>
  );
};
export default MainNavigation;
