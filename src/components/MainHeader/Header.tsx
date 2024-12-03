'use client';

import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import Mypage from '@/assets/mypage.svg';
import Write from '@/assets/write.svg';
import { usePathname } from 'next/navigation';

const MainHeader = () => {
  const pathname = usePathname();
  if (pathname === '/') {
    return (
      <header className="fixed z-10 flex h-[60px] w-full items-center justify-between px-5 py-[14px]">
        <Link href="/">
          <Logo width={80} height={32} />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Write width={24} height={24} />
          </Link>
          <Link href="/">
            <Mypage width={24} height={24} />
          </Link>
        </div>
      </header>
    );
  }
  return null;
};
export default MainHeader;
