import { http, HttpResponse, PathParams } from 'msw';
import { FAKE_USER_EMAIL, FAKE_USER_PASSWORD } from '@/mocks/data/auth';

interface LoginRequestBody {
  email: string;
  password: string;
}

const login = http.post<LoginRequestBody, PathParams>(
  '/api/auth/sign-in',
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
          'Set-Cookie': 'access-token=msw-access, refresh-token=msw-refresh',
        },
      },
    );
  },
);

export default login;
