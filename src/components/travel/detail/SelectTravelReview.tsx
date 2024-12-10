'use client';

import { getTravelReview } from '@/api/reviewApi';
import ReviewCardAddText from '@/components/card/ReviewCardAddText';
import BlankIcon from '@/assets/blank.svg';
import { useQuery } from '@tanstack/react-query';
import ScoreBox from './ScoreBox';

const SelectTravelReview = ({ id }: { id: string }) => {
  const {
    data: reviewList,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travels', { id }, 'reviews'],
    queryFn: () => getTravelReview({ id }),
  });
  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }

  if (reviewList && reviewList.length === 0) {
    return (
      <div className="heading-1-sb flex h-64 flex-col items-center justify-center gap-4 text-label-alternative">
        <BlankIcon />
        <div>아직 작성된 리뷰가 없어요!</div>
      </div>
    );
  }

  const totalScore =
    reviewList?.reduce((sum, review) => sum + review.score, 0) || 0;

  const averageScore = reviewList?.length
    ? (totalScore / reviewList.length).toFixed(1)
    : '0.0';

  const scoreFrequency = reviewList?.reduce(
    (acc, review) => {
      acc[review.score] = (acc[review.score] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return (
    <section>
      {isLoading && <div>로딩중</div>}
      {reviewList && (
        <div className="flex flex-col gap-6">
          <ScoreBox
            total={reviewList.length}
            averageScore={averageScore}
            scoreFrequency={scoreFrequency}
          />
          <div className="flex flex-col gap-4">
            {reviewList.map((review) => (
              <div key={review.reviewId}>
                <ReviewCardAddText
                  nickname={review.nickname}
                  reviewImage={review.reviewImage}
                  content={review.content}
                  score={review.score}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectTravelReview;
