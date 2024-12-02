import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import Mypage from '@/assets/mypage.svg';
import Write from '@/assets/write.svg';

const Header = () => {
  return (
    <header className="fixed flex h-[60px] w-full items-center justify-between px-5 py-[14px]">
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
};
export default Header;
