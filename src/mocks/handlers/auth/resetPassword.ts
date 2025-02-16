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

export const resetPassword = [
  /* ------------------------ 토큰 (이메일 인증)을 통한 비밀번호 재설정 ------------------------ */
  http.put<ResetAuthPasswordRequestBody, PathParams>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/password`,
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/password`,
    async ({ request, cookies }) => {
      const token = cookies.accessToken;
      const { currentPassword, newPassword } = await request.json();

      if (
        !token ||
        (!newPassword &&
          newPassword === currentPassword &&
          currentPassword !== FAKE_USER_PASSWORD)
      ) {
        return HttpResponse.json(
          { message: 'Password reset failed' },
          {
            status: 401,
          },
        );
      }

      const response = HttpResponse.json(
        { message: 'Password reset successful' },
        {
          status: 200,
          headers: {
            'Set-Cookie': 'accessToken=; Max-Age=0; Secure; SameSite=None',
          },
        },
      );

      return response;
    },
  ),
];
