import { createReview } from './createReview';
import { popularReview } from './popularReview';
import { reviewList } from './reviewList';

export const review = [createReview, ...popularReview, reviewList];
