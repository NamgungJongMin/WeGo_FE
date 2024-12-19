import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CreateReviewHeader from './CreateReviewHeader';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateReviewHeader', () => {
  it('리뷰 작성 헤더를 렌더링합니다', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    render(<CreateReviewHeader />);
    expect(screen.getByText('리뷰 작성')).toBeInTheDocument();
    const XButton = screen.getByLabelText('모달창 닫기');
    expect(XButton).toBeInTheDocument();
    fireEvent.click(XButton);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
