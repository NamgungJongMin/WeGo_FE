import { UserList } from '@/@types/user';

export const fetchPopularUser = async (): Promise<UserList[]> => {
  const response = await fetch('/api/users/popular');
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
