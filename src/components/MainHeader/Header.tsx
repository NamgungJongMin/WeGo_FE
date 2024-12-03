'use client';

import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import Mypage from '@/assets/mypage.svg';
import Write from '@/assets/write.svg';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MainHeader = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  if (pathname === '/') {
    return (
      <header
        className={`fixed flex h-[60px] w-full items-center justify-between px-5 py-[14px] transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-white bg-opacity-70 bg-gradient-to-b from-transparent to-white backdrop-blur-lg'
            : 'bg-transparent'
        }`}
      >
        <Link href="/">
          <div>{isScrolled}</div>
          <Logo
            width={80}
            height={32}
            className={isScrolled ? 'text-[#222222]' : 'text-[#ffffff]'}
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Write
              width={24}
              height={24}
              className={isScrolled ? 'text-[#222222]' : 'text-[#ffffff]'}
            />
          </Link>
          <Link href="/">
            <Mypage
              width={24}
              height={24}
              className={isScrolled ? 'text-[#222222]' : 'text-[#ffffff]'}
            />
          </Link>
        </div>
      </header>
    );
  }
  return null;
};
export default MainHeader;
