'use client';

import { getTravelReview } from '@/api/reviewApi';
import ReviewCardAddText from '@/components/card/ReviewCardAddText';
import { useQuery } from '@tanstack/react-query';

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

  return (
    <div className="flex flex-col gap-4 pb-9">
      {isLoading && <div>로딩중</div>}
      {reviewList &&
        reviewList.map((review) => (
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
  );
};

export default SelectTravelReview;
