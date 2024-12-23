import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReviewHeader from './ReviewHeader';

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('ReviewHeader', () => {
  it('제목이 "여행 리뷰"로 렌더링되어야 한다', () => {
    renderWithQueryClient(<ReviewHeader />);
    expect(screen.getByText(/여행 리뷰/i)).toBeInTheDocument();
  });

  it('리뷰 작성 버튼이 렌더링되어야 한다', () => {
    renderWithQueryClient(<ReviewHeader />);
    expect(screen.getByLabelText(/리뷰 작성 버튼/i)).toBeInTheDocument();
  });

  it('리뷰 작성 버튼을 클릭하면 "/review/new"로 이동해야 한다', () => {
    renderWithQueryClient(<ReviewHeader />);
    const button = screen.getByLabelText(/리뷰 작성 버튼/i);
    expect(button).toHaveAttribute('href', '/review/new');
  });
});
