'use client';

import { useRouter } from 'next/navigation';
import Back from '@/assets/back.svg';
import Setting from '@/assets/icon/setting_32px.svg';
import cn from '@/utils/cn';
import React from 'react';

interface Props {
  title: string | React.ReactNode;
  isConfigButton?: boolean;
  onRoute?: () => void;
  children?: React.ReactNode;
}

const FormHeader = ({ title, isConfigButton, onRoute, children }: Props) => {
  const router = useRouter();

  return (
    <header className="relative flex h-[60px] items-center border-b border-[#DADDE1] px-5 py-3.5">
      <button
        type="button"
        onClick={() => {
          if (onRoute) {
            onRoute();
          } else {
            router.back();
          }
        }}
        aria-label="뒤로가기 버튼, 이전 페이지로 이동"
        className="absolute"
      >
        <Back width={32} height={32} aria-hidden="true" />
      </button>

      <h1 className={cn('title-5-sb mx-10 flex-1 truncate text-center')}>
        {title}
      </h1>

      {isConfigButton && (
        <button
          type="button"
          onClick={() => {
            router.push('/userSetting');
          }}
          className="absolute right-0 mr-5 h-8 text-sm text-gray-500"
        >
          <Setting width={32} height={32} aria-hidden="true" />
        </button>
      )}
      <div className="absolute right-0 mr-5 h-8">{children}</div>
    </header>
  );
};

export default FormHeader;
