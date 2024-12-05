import { fetchPopularReview } from '@/api/reviewApi';
import WeeklyReview from './WeeklyReview';

const WeeklyReviewContainer = async () => {
  try {
    const reviewList = await fetchPopularReview();
    return <WeeklyReview reviewList={reviewList} />;
  } catch (error) {
    console.error('Failed to fetch travel data:', error);
    return (
      <div>데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.</div>
    );
  }
};

export default WeeklyReviewContainer;
