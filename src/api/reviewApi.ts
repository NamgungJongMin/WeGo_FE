import { Review } from '@/@types/review';

export const fetchPopularReview = async (): Promise<Review[]> => {
  const response = await fetch('/api/review/popular');
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getTravelReview = async ({
  id,
}: {
  id: string;
}): Promise<Review[]> => {
  const response = await fetch(`/api/review?id=${id}`);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
