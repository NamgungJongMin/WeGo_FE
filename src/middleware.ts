import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NEED_LOGIN_PATH, NEED_LOGOUT_PATH } from './constants/auth';
import { verifyToken } from './api/auth/verifyTokenApi';
import { mockFetch } from './mocks/middleware-mock';

const setPathnameHeader = (request: NextRequest, response: NextResponse) => {
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
};

const verifyTokenMock = async (request: NextRequest) => {
  return mockFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/verify`, {
    headers: {
      Cookie: request.headers.get('cookie') || '',
    },
  });
};

const authRedirect = async (request: NextRequest, response: NextResponse) => {
  const verifyResponse =
    process.env.NODE_ENV === 'development'
      ? await verifyTokenMock(request)
      : await verifyToken();

  // 토큰 유효성 검증 통과가 필요한 페이지의 redirect
  if (
    (Object.values(NEED_LOGIN_PATH) as string[]).includes(
      request.nextUrl.pathname,
    )
  ) {
    if (verifyResponse.status === 200) {
      return response;
    }

    if (process.env.NODE_ENV === 'development') {
      return NextResponse.redirect('http://localhost:3000/login');
    }
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
  }

  // 토큰 유효성 검증 통과 시 접근하지 못하는 페이지의 redirect
  if (
    (Object.values(NEED_LOGOUT_PATH) as string[]).includes(
      request.nextUrl.pathname,
    )
  ) {
    if (verifyResponse.status !== 200) {
      return response;
    }

    if (process.env.NODE_ENV === 'development') {
      return NextResponse.redirect('http://localhost:3000/');
    }
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
  }

  return response;
};

export const middleware = (request: NextRequest) => {
  const response = NextResponse.next();

  // 서버 컴포넌트에서 pathname을 가져오기 위해 헤더에 설정
  setPathnameHeader(request, response);

  // 로그인 여부에 따라 리다이렉트
  return authRedirect(request, response);
};
