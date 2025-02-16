import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useReview from '@/queries/review/useReview';
import { useReviewStore } from '@/store/useReviewStore';
import ReviewContents from './ReviewContents';

jest.mock('@/queries/review/useReview');
jest.mock('@/store/useReviewStore');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

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

  it('로딩 중일 때 스켈레톤 UI를 표시한다', () => {
    (useReview as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { container } = renderWithQueryClient(<ReviewContents />);
    // 스켈레톤 UI의 특정 클래스명을 기준으로 요소를 찾습니다.
    const skeletonElements = container.querySelectorAll('.skeleton-style');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('리뷰 데이터가 있을 때 리뷰 카드가 렌더링된다', () => {
    (useReview as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            data: {
              content: [
                {
                  id: 1,
                  nickname: '사용자1',
                  profileImage: 'https://example.com/profile1.jpg',
                  reviewImage: 'https://example.com/review1.jpg',
                  title: '리뷰 제목 1',
                  content: '리뷰 내용 1',
                  starRating: 5,
                  travelLocation: '서울',
                  createdAt: '2023-10-01',
                  isLiked: true,
                },
              ],
            },
          },
        ],
      },
      isLoading: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    });

    const { getByText } = renderWithQueryClient(<ReviewContents />);
    expect(getByText('리뷰 제목 1')).toBeInTheDocument();
    expect(getByText('리뷰 내용 1')).toBeInTheDocument();
  });

  it('리뷰 데이터가 없을 때 아무것도 렌더링하지 않는다', () => {
    (useReview as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            data: {
              content: [],
            },
          },
        ],
      },
      isLoading: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    });

    const { queryByText } = renderWithQueryClient(<ReviewContents />);
    expect(queryByText(/리뷰 제목 1/i)).not.toBeInTheDocument();
  });
});
