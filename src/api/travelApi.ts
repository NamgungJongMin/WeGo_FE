import { Travel } from '@/@types/travel';

export const fetchPopularTravel = async (): Promise<Travel[]> => {
  const response = await fetch('/api/travels/popular');
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
