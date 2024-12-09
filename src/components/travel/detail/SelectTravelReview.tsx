import ReviewCardAddText from '@/components/card/ReviewCardAddText';
import reviewList from '@/mocks/data/review/travelReviewList.json';

const SelectTravelReview = () => {
  return (
    <div className="flex flex-col gap-4 pb-9">
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
  );
};

export default SelectTravelReview;
