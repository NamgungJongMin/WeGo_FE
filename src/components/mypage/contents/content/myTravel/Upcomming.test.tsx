import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUpcommingTravel } from '@/queries/travel/useGetMyTravel';
import Upcomming from './Upcomming';

jest.mock('@/queries/travel/useGetMyTravel');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('Upcomming', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('여행 데이터가 있을 때 여행 카드가 렌더링된다', () => {
    (useUpcommingTravel as jest.Mock).mockReturnValue({
      data: {
        data: {
          content: [
            {
              travelId: 1,
              travelName: '다가오는 여행 1',
              maxTravelMateCount: 5,
              currentTravelMateCount: 2,
              isDomestic: true,
              travelLocation: '서울',
              travelImage: 'https://example.com/image.jpg',
              startAt: '2023-10-01',
              endAt: '2023-10-10',
            },
          ],
          total: 1,
        },
      },
    });

    const { getByText } = renderWithQueryClient(<Upcomming />);
    expect(getByText(/다가오는 여행 1/i)).toBeInTheDocument();
  });

  it('여행 데이터가 없을 때 NoTravel 컴포넌트가 렌더링된다', () => {
    (useUpcommingTravel as jest.Mock).mockReturnValue({
      data: {
        data: {
          content: [],
          total: 0,
        },
      },
    });

    const { getByText } = renderWithQueryClient(<Upcomming />);
    expect(getByText(/아직 참여한 여행이 없어요!/i)).toBeInTheDocument();
  });

  it('페이지네이션이 렌더링된다', () => {
    (useUpcommingTravel as jest.Mock).mockReturnValue({
      data: {
        data: {
          content: [
            {
              travelId: 1,
              travelName: '다가오는 여행 1',
              maxTravelMateCount: 5,
              currentTravelMateCount: 2,
              isDomestic: true,
              travelLocation: '서울',
              travelImage: 'https://example.com/image.jpg',
              startAt: '2023-10-01',
              endAt: '2023-10-10',
            },
            {
              travelId: 2,
              travelName: '다가오는 여행 2',
              maxTravelMateCount: 5,
              currentTravelMateCount: 2,
              isDomestic: true,
              travelLocation: '부산',
              travelImage: 'https://example.com/image.jpg',
              startAt: '2023-10-01',
              endAt: '2023-10-10',
            },
          ],
          total: 8,
        },
      },
    });

    const { getByTestId } = renderWithQueryClient(<Upcomming />);
    expect(getByTestId('mypage-pagination')).toBeInTheDocument();
  });
});
