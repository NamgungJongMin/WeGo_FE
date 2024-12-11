import { http, HttpResponse } from 'msw';
import reviewList from '@/mocks/data/review/travelReviewList.json';

const travelDetailReview = [
  http.get('/api/review', async () => {
    return HttpResponse.json(reviewList);
  }),
];

export default travelDetailReview;
