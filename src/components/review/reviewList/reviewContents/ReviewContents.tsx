'use client';

import ReviewCard from '@/components/card/Review/ReviewCard';
import useReview from '@/queries/review/useReview';
import { useReviewStore } from '@/store/useReviewStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SpinnerIcon from '@/assets/spinner_round.svg';

const ReviewContents = () => {
  const { ref, inView } = useInView();
  const filters = useReviewStore((state) => state.filters);

  const {
    data: reviewsData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useReview({
    sortOrder: filters.sortOrder,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="mt-3 h-full justify-between">
      {reviewsData && (
        <div className="flex flex-wrap justify-between gap-4">
          {reviewsData.pages.map((page) =>
            page.reviews
              ? page.reviews.map((review) => (
                  <ReviewCard
                    key={`${filters.sortOrder}-${review.reviewId}`}
                    reviewId={review.reviewId}
                    nickname={review.nickname}
                    profileImage={review.profileImage}
                    image={review.reviewImage}
                    title={review.title}
                    content={review.content}
                    score={review.score}
                    travelLocation={review.travelLocation}
                    createdAt={review.createdAt}
                    isLiked={review.isLiked ?? false}
                  />
                ))
              : null,
          )}
        </div>
      )}

      {hasNextPage ? (
        <div
          ref={ref}
          className="flex h-16 w-full justify-center p-5"
          aria-label="리뷰를 불러오는 중입니다."
        >
          <SpinnerIcon className="animate-spin" />
        </div>
      ) : null}
    </div>
  );
};

export default ReviewContents;
