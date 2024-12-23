import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainTab from './MainTab';

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('MainTab', () => {
  const setSelectedTabMock = jest.fn();
  const setSelectedSubTabMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본적으로 "myTravel" 탭이 선택되어야 한다', () => {
    renderWithQueryClient(
      <MainTab
        selectedTab="myTravel"
        setSelectedTab={setSelectedTabMock}
        setSelectedSubTab={setSelectedSubTabMock}
      />,
    );

    expect(screen.getByText(/나의 여행/i)).toBeInTheDocument();
  });

  it('탭 클릭 시 setSelectedTab이 호출되어야 한다', () => {
    renderWithQueryClient(
      <MainTab
        selectedTab="myTravel"
        setSelectedTab={setSelectedTabMock}
        setSelectedSubTab={setSelectedSubTabMock}
      />,
    );

    const reviewTabButton = screen.getByText(/나의 리뷰/i);

    fireEvent.click(reviewTabButton);

    expect(setSelectedTabMock).toHaveBeenCalledWith('myReview');
    expect(setSelectedSubTabMock).toHaveBeenCalled();
  });

  it('선택된 탭에 대해 올바른 클래스가 적용되어야 한다', () => {
    renderWithQueryClient(
      <MainTab
        selectedTab="myTravel"
        setSelectedTab={setSelectedTabMock}
        setSelectedSubTab={setSelectedSubTabMock}
      />,
    );

    const travelTab = screen.getByLabelText('myTravel 탭');
    expect(travelTab).toHaveClass('heading-1-b text-label-normal');
  });
});
