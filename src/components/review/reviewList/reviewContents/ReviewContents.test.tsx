import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useReview from '@/queries/review/useReview';
import { useReviewStore } from '@/store/useReviewStore';
import ReviewContents from './ReviewContents';

jest.mock('@/queries/review/useReview');
jest.mock('@/store/useReviewStore');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('ReviewContents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useReviewStore as unknown as jest.Mock).mockReturnValue({
      filters: {
        sortOrder: 'createdAt',
      },
      setFilters: jest.fn(),
    });
  });

  it('로딩 중일 때 로딩 메시지를 표시한다', () => {
    (useReview as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { getByText } = renderWithQueryClient(<ReviewContents />);
    expect(getByText(/로딩중/i)).toBeInTheDocument();
  });

  it('에러가 발생했을 때 에러 메시지를 표시한다', () => {
    (useReview as jest.Mock).mockReturnValue({
      isError: true,
    });

    const { getByText } = renderWithQueryClient(<ReviewContents />);
    expect(getByText(/에러/i)).toBeInTheDocument();
  });

  it('리뷰 데이터가 있을 때 리뷰 카드가 렌더링된다', () => {
    (useReview as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            reviews: [
              {
                reviewId: 1,
                nickname: '사용자1',
                profileImage: 'https://example.com/profile1.jpg',
                reviewImage: 'https://example.com/review1.jpg',
                title: '리뷰 제목 1',
                content: '리뷰 내용 1',
                score: 5,
                travelLocation: '서울',
                createdAt: '2023-10-01',
                isLiked: true,
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    const { getByText } = renderWithQueryClient(<ReviewContents />);
    expect(getByText(/리뷰 제목 1/i)).toBeInTheDocument();
    expect(getByText(/리뷰 내용 1/i)).toBeInTheDocument();
  });

  it('리뷰 데이터가 없을 때 아무것도 렌더링하지 않는다', () => {
    (useReview as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            reviews: [],
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    const { queryByText } = renderWithQueryClient(<ReviewContents />);
    expect(queryByText(/리뷰 제목 1/i)).not.toBeInTheDocument();
  });
});
