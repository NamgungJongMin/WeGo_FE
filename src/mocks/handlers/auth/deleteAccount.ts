import { FAKE_USER_PASSWORD } from '@/mocks/data/auth/auth';
import { http, HttpResponse, PathParams } from 'msw';

interface CheckPasswordRequestBody {
  password: string;
}

const deleteAccount = [
  http.post<CheckPasswordRequestBody, PathParams>(
    '/api/users/check/password',
    async ({ request }) => {
      const { password } = await request.json();

      if (password !== FAKE_USER_PASSWORD) {
        return HttpResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        { message: 'Password checked' },
        { status: 200 },
      );
    },
  ),

  http.delete<PathParams>('/api/users', async () => {
    const response = HttpResponse.json(
      { message: 'Account deleted' },
      { status: 200 },
    );

    response.headers.set(
      'Set-Cookie',
      `accessToken=; Path=/; Expires=${new Date(0).toUTCString()}`,
    );
    response.headers.set(
      'Set-Cookie',
      `refreshToken=; Path=/; Expires=${new Date(0).toUTCString()}`,
    );

    return response;
  }),
];

export default deleteAccount;
