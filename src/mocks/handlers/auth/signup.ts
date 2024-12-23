import { http, HttpResponse, PathParams } from 'msw';
import {
  FAKE_EMAIL_CODE,
  FAKE_USER_EMAIL,
  FAKE_VERIFIED_TOKEN,
} from '@/mocks/data/auth/auth';

interface MailSendRequestBody {
  email: string;
}

interface SignupRequestBody {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthDate: string;
  contact: string;
  verifiedToken: string;
}

export const signup = [
  /* -------------------------------- 인증 이메일 전송 ------------------------------- */
  http.post<MailSendRequestBody, PathParams>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up/emails`,
    async ({ request }) => {
      const { email } = await request.json();

      // 이메일 중복 체크 실패 (이미 가입된 이메일)
      if (email === FAKE_USER_EMAIL) {
        return HttpResponse.json(
          { message: 'Email already exists' },
          { status: 400 },
        );
      }

      // 이메일 중복 체크 성공
      return HttpResponse.json(
        {
          message: 'Email sent',
        },
        { status: 200 },
      );
    },
  ),

  /* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
  http.post<PathParams>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/emails/verify`,
    async ({ request }) => {
      const url = new URL(request.url);
      const emailCode = url.searchParams.get('verifyNumber');

      // 이메일 인증코드 확인 실패
      if (Number(emailCode) !== FAKE_EMAIL_CODE) {
        return HttpResponse.json(
          {
            message: 'Invalid email code',
          },
          {
            status: 400,
          },
        );
      }

      // 이메일 인증코드 확인 성공
      return HttpResponse.json(
        {
          message: 'Email code verified',
          verifiedToken: FAKE_VERIFIED_TOKEN,
        },
        { status: 200 },
      );
    },
  ),

  /* -------------------------------- 회원 가입 요청 -------------------------------- */
  http.post<SignupRequestBody, PathParams>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up`,
    async ({ request }) => {
      const {
        email,
        password,
        name,
        nickname,
        birthDate,
        contact,
        verifiedToken,
      } = await request.json();

      // 회원 가입 성공
      if (
        email &&
        password &&
        name &&
        nickname &&
        birthDate &&
        contact &&
        verifiedToken
      ) {
        return HttpResponse.json(
          {
            message: 'Sign up successful',
          },
          {
            status: 200,
            headers: {
              'Set-Cookie': 'accessToken=msw-access, refreshToken=msw-refresh',
            },
          },
        );
      }
      return HttpResponse.json({ message: 'Sign up failed' }, { status: 400 });
    },
  ),
];
