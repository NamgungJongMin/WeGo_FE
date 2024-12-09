import { TextInput } from '@/@types/auth';

interface VerifyEmailError extends Error {
  status?: number;
  message: string;
}

/* -------------------------------- 인증 이메일 전송 (회원가입)------------------------------- */
type SendMailRequestBody = Pick<TextInput, 'email'>;

const sendMail = async (credentials: SendMailRequestBody) => {
  const res = await fetch('/api/auth/sign-up/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = new Error('Send Mail failed') as VerifyEmailError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

/* -------------------------------- 인증 이메일 전송 (비밀번호 재설정)------------------------------- */

const passwordSendMail = async (credentials: SendMailRequestBody) => {
  const res = await fetch('/api/auth/password/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = new Error('Send Mail failed') as VerifyEmailError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

/* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
type CheckCodeRequestBody = Pick<TextInput, 'email' | 'emailCode'>;

const checkCode = async ({ email, emailCode }: CheckCodeRequestBody) => {
  const res = await fetch(`/api/auth/emails/verify?verifyNumber=${emailCode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = new Error('Check Mail failed') as VerifyEmailError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export { sendMail, passwordSendMail, checkCode };
