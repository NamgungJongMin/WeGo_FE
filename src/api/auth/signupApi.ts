interface SignupError extends Error {
  status?: number;
  message: string;
}

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
    credentials: 'include',
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

export default signup;
