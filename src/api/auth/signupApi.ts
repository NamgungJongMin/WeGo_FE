import { TextInput } from '@/@types/auth';

/* -------------------------------- 인증 이메일 전송 ------------------------------- */
type MailSendRequestBody = Pick<TextInput, 'email'>;

const sendMail = async (credentials: MailSendRequestBody) => {
  const res = await fetch('/api/auth/mail-send', {
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

/* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
type CheckMailRequestBody = Pick<TextInput, 'email' | 'emailCode'>;

const checkMail = async ({ email, emailCode }: CheckMailRequestBody) => {
  const res = await fetch(`/api/auth/mail-check?verifyNumber=${emailCode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  return res.json();
};

/* -------------------------------- 회원 가입 요청 -------------------------------- */
type SignupRequestBody = {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthDate: number;
  contact: string;
  verifiedToken: string;
};

const signup = async (credentials: SignupRequestBody) => {
  const res = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  return res.json();
};

export { sendMail, checkMail, signup };
