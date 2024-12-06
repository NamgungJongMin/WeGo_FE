import { http, HttpResponse } from 'msw';
import reviewList from '@/mocks/data/review/reviewList.json';

const popularReview = [
  http.get('/api/review/popular', async () => {
    return HttpResponse.json(reviewList);
  }),
];

export default popularReview;
