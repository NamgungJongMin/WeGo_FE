import { http } from 'msw';

import { mockTravelDetailReview } from './mockTravelDetailReview';
import { mockReviewList } from './mockReviewList';

export const reviewList = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
  async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (id) {
      return mockTravelDetailReview();
    }
    return mockReviewList(url);
  },
);
