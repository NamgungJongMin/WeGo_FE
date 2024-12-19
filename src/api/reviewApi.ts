import { APIError } from '@/@types/api';
import { Review, ReviewResponse } from '@/@types/review';

interface ReviewParams {
  pageParam: number;
  sortOrder: string;
}

interface MyReview {
  total: number;
  reviews: Review[];
}

export const getReview = async ({
  pageParam,
  sortOrder,
}: ReviewParams): Promise<ReviewResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews?page=${pageParam}&sortBy=${sortOrder}&limit=12`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const error = new Error('Get review failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

export const fetchPopularReview = async (): Promise<Review[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/popular`,
  );
  if (!response.ok) {
    const error = new Error('Get popular review failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

export const getTravelReview = async ({
  id,
}: {
  id: any;
}): Promise<Review[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews?id=${id}`,
  );
  if (!response.ok) {
    const error = new Error('Get travel review failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

export const getMyReview = async (
  limit: number,
  offset: number,
): Promise<MyReview> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/published?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const error = new Error('Get my review failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

export const createReview = async (formData: FormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = new Error('Create review failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
