import { TextInput } from '@/@types/auth';

interface SignupError extends Error {
  status?: number;
  message: string;
}

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
    const error = new Error('Send Mail failed') as SignupError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  res.json();
};

/* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
type CheckMailRequestBody = Pick<TextInput, 'email' | 'emailCode'>;

const checkMail = async ({ email, emailCode }: CheckMailRequestBody) => {
  const res = await fetch(`/api/auth/mail-check?verifyNumber=${emailCode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = new Error('Check Mail failed') as SignupError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
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
    const error = new Error('Signup failed') as SignupError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export { sendMail, checkMail, signup };
