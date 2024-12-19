'use client';

import CreateReviewHeader from '@/components/review/new/CreateReviewHeader';
import BlueStart from '@/assets/star_24px.svg';
import InputImage from '@/components/review/new/InputImage';
import CreateReviewButtons from '@/components/review/new/CreateReviewButtons';
import useCreateReviewStore from '@/store/useCreateReview';
import ReviewComment from '@/components/review/new/ReviewComment';

const CreateReviewPage = () => {
  const { countStar, setCountStar } = useCreateReviewStore();

  const handleClick = (index: number) => {
    setCountStar(index + 1);
  };

  const sectionCss = 'flex w-full flex-col gap-3';

  return (
    <form
      method="dialog"
      className="heading-1-sb flex w-full flex-col px-6 py-8 text-label-normal"
    >
      <CreateReviewHeader />
      <span className="body-2-m mb-4 mt-2.5 w-full bg-blue-50 py-2 text-center text-primary-normal">
        리뷰를 작성하고, 당신만의 여행피드를 완성하세요!
      </span>
      <section className={`pb-6 ${sectionCss}`}>
        <header>만족스러운 여행이었나요?</header>
        <main className="flex" aria-label="별점을 매겨주세요">
          {[1, 2, 3, 4, 5].map((v, index) => (
            <BlueStart
              key={`star-${v}`}
              className={`cursor-pointer ${index < countStar ? 'text-primary-normal' : 'text-label-disable'}`}
              onClick={() => handleClick(index)}
              aria-label={`${v}점`}
            />
          ))}
        </main>
      </section>
      <ReviewComment />
      <section className={`pb-10 ${sectionCss}`}>
        <header>여행의 순간을 함께 보여주세요.</header>
        <main aria-label="여행 후기 이미지를 등록해주세요">
          <InputImage />
          <span className="body-3-r text-primary-normal">
            이미지는 최대 5개 등록 가능합니다.
          </span>
        </main>
      </section>
      <CreateReviewButtons />
    </form>
  );
};

export default CreateReviewPage;
