export interface Review {
  reviewId: number;
  title: string;
  nickname?: string;
  profileImage?: string;
  reviewImage: string;
  content: string;
  score: number;
  travelLocation: string;
  createdAt: string;
  isLast: boolean;
  isLiked?: boolean;
}

export interface ReviewResponse {
  reviews: Review[];
  currentPage: number;
  size: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface Filters {
  sortOrder: 'createdAt' | 'popular';
}

interface ReviewUser {
  nickname: string;
  profileImage: string;
}

export interface ReviewDetail {
  reviewId: number;
  user: ReviewUser;
  title: string;
  reviewImages: string[];
  liked: boolean;
  content: string;
  score: number;
  travelLocation: string;
  createdAt: string;
}

export interface CreateReview {
  score: number;
  content: string;
  reviewImage: File[];
}
