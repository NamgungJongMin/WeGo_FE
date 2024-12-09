import { User } from '@/@types/user';

type LoginRequestBody = Pick<User, 'email' | 'password'>;

interface LoginError extends Error {
  status?: number;
  message: string;
}

const login = async (credentials: LoginRequestBody) => {
  const res = await fetch('/api/auth/sign-in', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = new Error('Login failed') as LoginError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export default login;
