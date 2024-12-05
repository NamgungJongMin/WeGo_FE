import { UserList } from '@/@types/user';

export const fetchPopularUser = async (): Promise<UserList[]> => {
  try {
    const response = await fetch('/users/popular', { cache: 'force-cache' });
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
