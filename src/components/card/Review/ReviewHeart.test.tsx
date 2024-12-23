import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewHeart from './ReviewHeart';

describe('ReviewHeart 컴포넌트 테스트', () => {
  it('기본 렌더링이 올바른지 확인', () => {
    render(<ReviewHeart isLiked={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-none');
  });

  it('버튼 클릭 시 상태가 변경되는지 확인', () => {
    render(<ReviewHeart isLiked={false} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-primary-white');
  });

  it('red prop이 true일 때 클래스가 올바른지 확인', () => {
    render(<ReviewHeart isLiked red />);
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-red-400');
  });
});
