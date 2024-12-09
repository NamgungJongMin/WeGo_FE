interface ResetPasswordError extends Error {
  status?: number;
  message: string;
}

interface ResetAuthPasswordRequestBody {
  email: string;
  password: string;
  token: string;
}

interface ResetUserPasswordRequestBody {
  currentPassword: string;
  newPassword: string;
}

const resetAuthPassword = async (credentials: ResetAuthPasswordRequestBody) => {
  const res = await fetch('/api/auth/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = new Error('Reset Auth Password failed') as ResetPasswordError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

const resetUserPassword = async (credentials: ResetUserPasswordRequestBody) => {
  const res = await fetch('/api/users/password', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = new Error('Reset User Password failed') as ResetPasswordError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export { resetAuthPassword, resetUserPassword };
