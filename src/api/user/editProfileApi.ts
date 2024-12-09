interface EditProfileError extends Error {
  status?: number;
  message: string;
}

const editProfile = async (formData: FormData) => {
  const res = await fetch('/api/users', {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    const error = new Error('Login failed') as EditProfileError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export default editProfile;
