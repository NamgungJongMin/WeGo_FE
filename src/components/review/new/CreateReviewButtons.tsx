'use client';

import { Button } from '@/components/common/button/Button';
import { useCreateReview } from '@/queries/review/useCreateReview';
import useCreateReviewStore from '@/store/useCreateReview';
import { useRouter } from 'next/navigation';

const CreateReviewButtons = () => {
  const router = useRouter();
  const { handleSubmit } = useCreateReview();
  const { resetStore } = useCreateReviewStore();

  return (
    <section className="flex justify-center gap-2.5">
      <Button
        handler={() => {
          resetStore();
          router.back();
        }}
        label="취소"
        fill="white"
        className="h-[38px] w-[120px]"
      />
      <Button
        handler={() => handleSubmit()}
        type="button"
        label="확인"
        className="h-[38px] w-[120px]"
      />
    </section>
  );
};

export default CreateReviewButtons;
