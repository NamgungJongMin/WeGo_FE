// 미들웨어 모킹 응답 정의
export const mockResponses = {
  '/auth/token/verify': {
    success: {
      status: 200,
      body: { ok: true, message: 'Token is valid' },
    },
    error: {
      status: 401,
      body: { ok: false, message: 'Unauthorized' },
    },
  },
};

// 모킹된 fetch 함수
export const mockFetch = async (url: string, options?: RequestInit) => {
  // URL에서 엔드포인트 추출
  const endpoint = new URL(url).pathname;
  const mock = mockResponses[endpoint as keyof typeof mockResponses];

  if (!mock) {
    return fetch(url);
  }

  // 쿠키 확인
  const cookies =
    options?.headers && 'Cookie' in options.headers
      ? options.headers.Cookie
      : '';
  const hasAccessToken = cookies.includes('accessToken=');

  // 개발 환경에서는 모의 응답 반환
  return new Response(
    JSON.stringify(hasAccessToken ? mock.success.body : mock.error.body),
    {
      status: hasAccessToken ? mock.success.status : mock.error.status,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
