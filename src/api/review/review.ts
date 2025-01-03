import { Review, ReviewDetailResponse, ReviewResponse } from '@/@types/review';
import { ApiResponse } from '@/@types/api';
import { TravelReviewRateScore } from '@/@types/travel';
import { http } from '../fetcher';

interface ReviewParams {
  pageParam: number;
  sortOrder: string;
}

interface TravelReviewParams {
  travelId: number;
  pageParam: number;
}
interface MyReview {
  total: number;
  reviews: Review[];
}

interface TravelReview {
  content: Review[];
  total: number;
  hasNext: boolean;
  currentPage: number;
}
interface TravelReviewRate {
  reviews: TravelReviewRateScore;
  totalRating: number;
}

export const getPopularReview = () => {
  return http.get<ApiResponse<Review[]>>('/reviews/popular');
};

export const getTravelReview = ({
  travelId,
  pageParam,
}: TravelReviewParams) => {
  return http.get<ApiResponse<TravelReview>>(
    `/reviews?id=${travelId}&page=${pageParam}`,
  );
};

export const getTravelReviewRate = ({ travelId }: { travelId: number }) => {
  return http.get<ApiResponse<TravelReviewRate>>(
    `/reviews/${travelId}/ratings`,
  );
};

export const getReview = ({ pageParam, sortOrder }: ReviewParams) => {
  return http.get<ApiResponse<ReviewResponse>>(
    `/reviews?page=${pageParam}&sortBy=${sortOrder}&limit=12`,
  );
};

export const getMyReview = (limit: number, offset: number) => {
  return http.get<MyReview>(
    `/reviews/published?limit=${limit}&offset=${offset}`,
  );
};

export const getReviewDetail = (id: number) => {
  return http.get<ReviewDetailResponse>(`/reviews/${id}`);
};

export const postReviewLike = (id: number) => {
  return http.post<unknown>(`/reviews/${id}/likes`);
};

export const deleteReviewLike = (id: number) => {
  return http.delete<unknown>(`/reviews/${id}/likes`);
};
