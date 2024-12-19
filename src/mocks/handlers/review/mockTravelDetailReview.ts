import { HttpResponse } from 'msw';
import reviewList from '@/mocks/data/review/travelReviewList.json';

export const mockTravelDetailReview = () => {
  return HttpResponse.json(reviewList);
};
