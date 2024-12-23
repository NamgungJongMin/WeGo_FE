import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReviewStore } from '@/store/useReviewStore';
import ReviewFilter from './ReviewFilter';

jest.mock('@/store/useReviewStore');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('ReviewFilter', () => {
  const setFiltersMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useReviewStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        filters: {
          sortOrder: 'createdAt', // 기본값 설정
        },
        setFilters: setFiltersMock,
      };
      return selector(state);
    });
  });

  it('기본적으로 "createdAt" 필터가 선택되어야 한다', () => {
    const { getByText } = renderWithQueryClient(<ReviewFilter />);

    expect(getByText(/최근/i)).toHaveAttribute('disabled');
    expect(getByText(/인기/i)).not.toHaveAttribute('disabled');
  });

  it('필터 버튼 클릭 시 setFilters가 호출되어야 한다', () => {
    const { getByText } = renderWithQueryClient(<ReviewFilter />);
    const popularButton = getByText(/인기/i);

    fireEvent.click(popularButton);

    expect(setFiltersMock).toHaveBeenCalledWith({
      sortOrder: 'popular',
    });
  });

  it('필터 버튼 클릭 시 선택된 필터가 업데이트되어야 한다', () => {
    const { getByText } = renderWithQueryClient(<ReviewFilter />);

    const popularButton = getByText(/인기/i);
    fireEvent.click(popularButton);

    expect(getByText(/인기/i)).not.toHaveAttribute('disabled');
    expect(getByText(/최근/i)).toHaveAttribute('disabled');
  });
});
