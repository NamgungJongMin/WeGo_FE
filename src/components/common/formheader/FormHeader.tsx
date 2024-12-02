'use client';

import { useRouter } from 'next/navigation';
import Back from '@/assets/back.svg';

interface Props {
  title: string;
}

const FormHeader = ({ title }: Props) => {
  const router = useRouter();

  return (
    <header className="z-100 flex h-[60px] items-center border-b border-[#DADDE1] px-5 py-3.5">
      <button
        type="button"
        onClick={() => {
          router.back();
        }}
        aria-label="뒤로가기 버튼, 이전 페이지로 이동"
        className="z-10 m-0 cursor-pointer rounded border-none bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Back width={32} height={32} aria-hidden="true" />
      </button>
      <h1 className="-ml-8 flex-1 text-center text-lg font-semibold">
        {title}
      </h1>
    </header>
  );
};

export default FormHeader;
