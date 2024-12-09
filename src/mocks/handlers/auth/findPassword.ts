import { FAKE_USER_EMAIL } from '@/mocks/data/auth/auth';
import { http, HttpResponse, PathParams } from 'msw';

interface MailSendRequestBody {
  email: string;
}

const findPassword = http.post<MailSendRequestBody, PathParams>(
  '/api/auth/password/emails',
  async ({ request }) => {
    const { email } = await request.json();

    // 가입된 이메일이 존재하지 않음.
    if (email !== FAKE_USER_EMAIL) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 },
      );
    }

    // 이메일 존재 확인
    return HttpResponse.json({ message: 'Email sent' }, { status: 200 });
  },
);

export default findPassword;
