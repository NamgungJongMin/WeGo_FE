import { HttpResponse, PathParams, http } from 'msw';

export const verifyToken = http.get<PathParams>(
  `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/verify`,
  async ({ cookies }) => {
    const token = cookies.accessToken;
    if (token) {
      return HttpResponse.json({ message: 'Token is valid' }, { status: 200 });
    }

    return HttpResponse.json({ message: 'Token is invalid' }, { status: 401 });
  },
);
