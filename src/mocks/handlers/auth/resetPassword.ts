import { FAKE_USER_PASSWORD } from '@/mocks/data/auth/auth';
import { http, HttpResponse, PathParams } from 'msw';

interface ResetAuthPasswordRequestBody {
  email: string;
  password: string;
  token: string;
}

interface ResetAuthSignupRequestBody {
  currentPassword: string;
  newPassword: string;
}

const resetPassword = [
  /* ------------------------ 토큰 (이메일 인증)을 통한 비밀번호 재설정 ------------------------ */
  http.put<ResetAuthPasswordRequestBody, PathParams>(
    '/api/auth/password',
    async ({ request }) => {
      const { email, password, token } = await request.json();

      if (email && password && token) {
        return HttpResponse.json(
          { message: 'Password reset successful' },
          { status: 200 },
        );
      }

      return HttpResponse.json(
        { message: 'Password reset failed' },
        { status: 500 },
      );
    },
  ),

  /* --------------------------- 로그인 된 사용자의 비밀번호 재설정 -------------------------- */
  http.put<ResetAuthSignupRequestBody, PathParams>(
    '/api/users/password',
    async ({ request, cookies }) => {
      const token = cookies['access-token'];
      const { currentPassword, newPassword } = await request.json();

      if (token && newPassword && currentPassword === FAKE_USER_PASSWORD) {
        return HttpResponse.json(
          { message: 'Password reset successful' },
          { status: 401 },
        );
      }

      const response = HttpResponse.json(
        { message: 'Password reset failed' },
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
    },
  ),
];

export default resetPassword;
