import { HttpResponse, http } from 'msw';

export const editProfile = http.put(
  `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
  async ({ request, cookies }) => {
    const formData = await request.formData();
    const token = cookies.accessToken;

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
  },
);
