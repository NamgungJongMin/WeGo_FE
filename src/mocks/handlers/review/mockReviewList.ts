import reviewListMock from '@/mocks/data/review/reviewInfinityListMock.json';
import reviewListMock2 from '@/mocks/data/review/reviewInfinityListMock2.json';
import { HttpResponse } from 'msw';
import { URL } from 'url';

export const mockReviewList = (url: URL) => {
  const requestedPage = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '12', 10);
  const sortOrder = url.searchParams.get('sortBy') || 'createdAt';

  const pageSize = limit; // 페이지 크기
  const startIndex = (requestedPage - 1) * pageSize; // 시작 인덱스
  const endIndex = startIndex + pageSize; // 끝 인덱스
  const reviewsToSend = reviewListMock.reviews.slice(startIndex, endIndex);
  const reviewsToSend2 = reviewListMock2.reviews.slice(startIndex, endIndex);

  if (sortOrder === 'createdAt') {
    const response = {
      currentPage: requestedPage,
      size: reviewsToSend.length, // 현재 페이지의 리뷰 수
      isFirst: requestedPage === 1,
      isLast: requestedPage * pageSize >= reviewListMock.reviews.length,
      reviews: reviewsToSend, // 제한된 리뷰 반환
    };
    return HttpResponse.json(response);
  }
  if (sortOrder === 'popular') {
    const response = {
      currentPage: requestedPage,
      size: reviewsToSend.length, // 현재 페이지의 리뷰 수
      isFirst: requestedPage === 1,
      isLast: requestedPage * pageSize >= reviewListMock.reviews.length,
      reviews: reviewsToSend2, // 제한된 리뷰 반환
    };
    return HttpResponse.json(response);
  }

  return HttpResponse.error();
};
