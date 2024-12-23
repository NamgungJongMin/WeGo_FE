import { APIError } from '@/@types/api';

export const verifyToken = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/verify`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const error = new Error('Login failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
  }

  return response.json();
};
