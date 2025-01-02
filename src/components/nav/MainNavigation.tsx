'use client';

import Find from '@/assets/find.svg';
import FindWhite from '@/assets/find_white.svg';
import Home from '@/assets/home.svg';
import Start from '@/assets/star.svg';
import Chat from '@/assets/chat.svg';
import ChatWhite from '@/assets/chat_white.svg';
import { usePathname } from 'next/navigation';
import NavLink from './NavigationLink';

interface Props {
  isActive?: boolean;
}

const MainNavigation = ({ isActive = false }: Props) => {
  const pathname = usePathname();
  const includedPaths = [
    '/',
    '/travel',
    '/mypage',
    '/review',
    '/editProfile',
    '/userSetting',
    '/resetPassword/userPassword',
    '/deleteAccount',
  ];

  const isPathIncluded =
    includedPaths.includes(pathname) ||
    (pathname.startsWith('/travel') && pathname !== '/travel/new') ||
    pathname.startsWith('/review') ||
    isActive;

  if (!isPathIncluded) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-black py-3.5 text-primary-white xl:hidden">
      <div className="m-auto flex max-w-[768px] items-center justify-between">
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
      </div>
    </nav>
  );
};
export default MainNavigation;
