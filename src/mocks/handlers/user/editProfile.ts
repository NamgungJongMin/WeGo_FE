import { HttpResponse, http } from 'msw';

const editProfile = http.put('/api/users', async ({ request, cookies }) => {
  const formData = await request.formData();
  const token = cookies['access-token'];

  if (!token || !formData) {
    return HttpResponse.json(
      { message: 'Profile update failed' },
      { status: 401 },
    );
  }

  return HttpResponse.json(
    { message: 'Profile updated successfully' },
    { status: 200 },
  );
});

export default editProfile;
