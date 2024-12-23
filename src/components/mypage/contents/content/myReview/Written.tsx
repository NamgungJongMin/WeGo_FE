import Pagination from '@/components/common/pagination/Pagination';
import { useState } from 'react';
import ReviewCard from '@/components/card/Review/ReviewCard';
import useMyReview from '@/queries/review/useMyReview';
import NoTravel from '../myTravel/NoTravel';

const Written = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: reviews } = useMyReview(itemsPerPage, currentPage - 1);
  const totalPages = reviews ? Math.ceil(reviews.total / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="mx-auto w-[335px] pb-10" data-testid="written-reviews">
      <div className="grid grid-cols-2 gap-4 pb-4">
        {reviews &&
          reviews.reviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              reviewId={review.reviewId}
              image={review.reviewImage}
              title={review.title}
              content={review.content}
              score={review.score}
              travelLocation={review.travelLocation}
              createdAt={review.createdAt}
            />
          ))}
      </div>
      {reviews && reviews.total === 0 && (
        <NoTravel message="아직 다녀온 여행이 없어요!" />
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </section>
  );
};

export default Written;
