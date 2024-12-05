import { User } from '@/@types/user';

type LoginRequestBody = Pick<User, 'email' | 'password'>;

const login = async (credentials: LoginRequestBody) => {
  const res = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
};

export default login;
