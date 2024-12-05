import { Review } from '@/@types/review';

export const fetchPopularReview = async (): Promise<Review[]> => {
  try {
    const response = await fetch('/review/popular', { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch popular travel:', error);
    throw error;
  }
};
