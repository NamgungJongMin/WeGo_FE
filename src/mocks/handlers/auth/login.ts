import { http, HttpResponse, PathParams } from 'msw';
import { FAKE_USER_EMAIL, FAKE_USER_PASSWORD } from '@/mocks/data/auth/auth';

interface LoginRequestBody {
  email: string;
  password: string;
}

export const login = http.post<LoginRequestBody, PathParams>(
  `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in`,
  async ({ request }) => {
    const { email, password } = await request.json();

    if (email !== FAKE_USER_EMAIL || password !== FAKE_USER_PASSWORD) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      { message: 'Login successful' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'accessToken=msw-access, refreshToken=msw-refresh',
        },
      },
    );
  },
);
