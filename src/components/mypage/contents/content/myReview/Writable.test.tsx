import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWritableTravel } from '@/queries/travel/useGetMyTravel';
import Writable from './Writable';

jest.mock('@/queries/travel/useGetMyTravel');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('Writable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('여행 데이터가 있을 때 여행 카드가 렌더링된다', () => {
    (useWritableTravel as jest.Mock).mockReturnValue({
      data: {
        total: 1,
        travels: [
          {
            travelId: 1,
            travelName: '여행 1',
            maxTravelMateCount: 5,
            currentTravelMateCount: 2,
            isDomestic: true,
            location: '서울',
            image: 'https://example.com/image.jpg',
            startAt: '2023-10-01',
            endAt: '2023-10-10',
          },
        ],
      },
    });

    const { getByText } = renderWithQueryClient(<Writable />);
    expect(getByText(/여행 1/i)).toBeInTheDocument();
    expect(getByText(/리뷰 작성/i)).toBeInTheDocument();
  });

  it('여행 데이터가 없을 때 NoTravel 컴포넌트가 렌더링된다', () => {
    (useWritableTravel as jest.Mock).mockReturnValue({
      data: {
        total: 0,
        travels: [],
      },
    });

    const { getByText } = renderWithQueryClient(<Writable />);
    expect(getByText(/아직 다녀온 여행이 없어요!/i)).toBeInTheDocument();
  });

  it('페이지네이션이 렌더링된다', () => {
    (useWritableTravel as jest.Mock).mockReturnValue({
      data: {
        total: 8,
        travels: [
          {
            travelId: 1,
            travelName: '여행 1',
            maxTravelMateCount: 5,
            currentTravelMateCount: 2,
            isDomestic: true,
            location: '서울',
            image: 'https://example.com/image.jpg',
            startAt: '2023-10-01',
            endAt: '2023-10-10',
          },
          {
            travelId: 2,
            travelName: '여행 2',
            maxTravelMateCount: 5,
            currentTravelMateCount: 2,
            isDomestic: true,
            location: '부산',
            image: 'https://example.com/image.jpg',
            startAt: '2023-10-01',
            endAt: '2023-10-10',
          },
        ],
      },
    });

    const { getByTestId } = renderWithQueryClient(<Writable />);
    expect(getByTestId('mypage-pagination')).toBeInTheDocument();
  });
});
