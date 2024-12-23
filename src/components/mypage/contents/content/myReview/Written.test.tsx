import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useMyReview from '@/queries/review/useMyReview';
import Written from './Written';

// Mocking the useMyReview hook
jest.mock('@/queries/review/useMyReview');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('Written', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰 데이터가 있을 때 리뷰 카드가 렌더링된다', () => {
    (useMyReview as jest.Mock).mockReturnValue({
      data: {
        total: 1,
        reviews: [
          {
            reviewId: 1,
            reviewImage: 'https://example.com/image.jpg',
            title: '리뷰 제목 1',
            content: '리뷰 내용 1',
            score: 5,
            travelLocation: '서울',
            createdAt: '2023-10-01',
          },
        ],
      },
    });

    const { getByText } = renderWithQueryClient(<Written />);
    expect(getByText(/리뷰 제목 1/i)).toBeInTheDocument();
    expect(getByText(/리뷰 내용/i)).toBeInTheDocument();
  });

  it('리뷰 데이터가 없을 때 NoTravel 컴포넌트가 렌더링된다', () => {
    (useMyReview as jest.Mock).mockReturnValue({
      data: {
        total: 0,
        reviews: [],
      },
    });

    const { getByText } = renderWithQueryClient(<Written />);
    expect(getByText(/아직 다녀온 여행이 없어요!/i)).toBeInTheDocument();
  });

  it('페이지네이션이 렌더링된다', () => {
    (useMyReview as jest.Mock).mockReturnValue({
      data: {
        total: 8,
        reviews: [
          {
            reviewId: 1,
            reviewImage: 'https://example.com/image.jpg',
            title: '리뷰 제목 1',
            content: '리뷰 내용 1',
            score: 5,
            travelLocation: '서울',
            createdAt: '2023-10-01',
          },
          {
            reviewId: 2,
            reviewImage: 'https://example.com/image.jpg',
            title: '리뷰 제목 2',
            content: '리뷰 내용 2',
            score: 4,
            travelLocation: '부산',
            createdAt: '2023-10-02',
          },
        ],
      },
    });

    const { getByTestId } = renderWithQueryClient(<Written />);
    expect(getByTestId('mypage-pagination')).toBeInTheDocument();
  });
});
