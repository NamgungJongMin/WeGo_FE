'use client';

import Find from '@/assets/find.svg';
import FindWhite from '@/assets/find_white.svg';
import Home from '@/assets/home.svg';
import Start from '@/assets/star.svg';
import Chat from '@/assets/chat.svg';
import ChatWhite from '@/assets/chat_white.svg';
import { usePathname } from 'next/navigation';
import NavLink from './NavigationLink';

const MainNavigation = () => {
  const pathname = usePathname();
  const includedPaths = ['/', '/travel', '/mypage', '/review', '/chat'];

  const isPathIncluded =
    includedPaths.includes(pathname) ||
    (pathname.startsWith('/travel') && pathname !== '/travel/new') ||
    pathname.startsWith('/review');

  if (!isPathIncluded) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-20 items-center justify-between bg-black px-[29px] py-3.5 text-primary-white">
      <NavLink
        href="/review"
        icon={<Start />}
        label="여행리뷰"
        isActive={pathname.startsWith('/review')}
      />
      <NavLink
        href="/travel"
        icon={pathname.startsWith('/travel') ? <FindWhite /> : <Find />}
        label="여행찾기"
      />
      <NavLink
        href="/chat"
        icon={pathname === '/chat' ? <ChatWhite /> : <Chat />}
        label="채팅"
        isActive={pathname === '/chat'}
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
