import { createReview } from '@/api/reviewApi';
import useCreateReviewStore from '@/store/useCreateReview';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateReview = () => {
  const router = useRouter();
  const { countStar, title, comment, selectedFiles, resetStore } =
    useCreateReviewStore();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createReview(formData),
    onSuccess: () => {
      resetStore();
      router.back();
      router.push('/review');
    },
    onError: (error: any) => {
      console.error('리뷰 생성 중 오류 발생:', error);
    },
  });

  const handleSubmit = () => {
    if (countStar === 0) return;
    if (title === '') return;
    if (comment === '') return;
    if (selectedFiles.length === 0) return;

    const formData = new FormData();

    formData.append('score', countStar.toString());
    formData.append('title', title);
    formData.append('comment', comment);
    selectedFiles.forEach((file) => {
      formData.append(`images`, file);
    });

    mutation.mutate(formData);
  };
  return { handleSubmit };
};
