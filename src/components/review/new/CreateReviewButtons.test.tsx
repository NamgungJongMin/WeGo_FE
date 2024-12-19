import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateReviewButtons from './CreateReviewButtons';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateReviewButtons', () => {
  it('리뷰 생성, 취소 버튼을 렌더링합니다', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CreateReviewButtons />
      </QueryClientProvider>,
    );

    const cancleButton = screen.getByText('취소');
    expect(cancleButton).toBeInTheDocument();
    fireEvent.click(cancleButton);
    expect(mockBack).toHaveBeenCalledTimes(1);

    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  it('필수 입력값이 없으면 submit되지 않습니다', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CreateReviewButtons />
      </QueryClientProvider>,
    );

    // 버튼 클릭 전 값이 비어있으면 handleSubmit이 호출되지 않아야 함
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
    expect(
      screen.queryByText('리뷰 생성 중 오류 발생:'),
    ).not.toBeInTheDocument();
  });
});
