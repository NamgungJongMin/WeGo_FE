import { http, HttpResponse, PathParams } from 'msw';

interface ReviewSendRequestBody {
  score: string;
  content: string;
  images: string[];
}

export const createReview = http.post<ReviewSendRequestBody, PathParams>(
  `${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
  async ({ request }) => {
    const formData = await request.formData();

    const score = formData.get('score');
    const content = formData.get('content');
    const images = formData.getAll('images');

    if (score === '' || content === '' || !images || images.length === 0) {
      return HttpResponse.error();
    }

    return HttpResponse.json(
      { message: '리뷰가 성공적으로 생성되었습니다.' },
      { status: 200 },
    );
  },
);
