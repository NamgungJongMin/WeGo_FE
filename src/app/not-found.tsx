import ErrorIcon from '@/assets/error_triangle.svg';
import Link from 'next/link';

const Custom404 = async () => {
  const textCss = 'text-label-neutral body-2-r';

  return (
    <section className="flex h-screen flex-col items-center justify-between">
      <main className="flex h-screen flex-col items-center justify-center gap-6">
        <ErrorIcon />
        <div className="flex flex-col items-center">
          <header className="title-4-b text-red-500">404 ERROR</header>
          <header className="title-4-b">페이지를 찾을 수 없습니다.</header>
          <span className={`pt-2 ${textCss}`}>이전 페이지로 가시거나,</span>
          <span className={textCss}>새로고침을 해 주세요.</span>
        </div>
      </main>
      <Link
        href="/"
        className="body-1-m mb-24 flex h-12 w-80 items-center justify-center bg-black px-4 py-3 text-white"
      >
        메인으로 돌아가기
      </Link>
    </section>
  );
};

export default Custom404;
