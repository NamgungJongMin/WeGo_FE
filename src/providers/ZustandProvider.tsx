'use client';

import Modal from '@/components/common/modal/Modal';
import Toast from '@/components/common/toast/Toast';
import { PropsWithChildren, Suspense } from 'react';

const ZustandProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Toast />
      <Suspense fallback={<div>Loading...</div>}>
        <Modal />
      </Suspense>
      {/* 추후 다른 전역 UI 컴포넌트들도 여기에 추가 */}
    </>
  );
};

export default ZustandProvider;
