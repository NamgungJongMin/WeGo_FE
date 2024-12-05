import { Travel } from '@/@types/travel';

export const fetchPopularTravel = async (): Promise<Travel[]> => {
  try {
    const response = await fetch('/travles/popular', { cache: 'force-cache' });
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
