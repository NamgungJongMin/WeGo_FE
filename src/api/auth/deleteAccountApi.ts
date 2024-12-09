interface DeleteAccountError extends Error {
  status?: number;
  message: string;
}

const checkPassword = async (password: { password: string }) => {
  const res = await fetch('/api/users/check/password', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(password),
  });

  if (!res.ok) {
    const error = new Error('Check Password failed') as DeleteAccountError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

const deleteAccount = async () => {
  const res = await fetch('/api/users', {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const error = new Error('Delete Account failed') as DeleteAccountError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export { checkPassword, deleteAccount };
