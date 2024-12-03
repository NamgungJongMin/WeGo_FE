import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button 컴포넌트', () => {
  it('label prop이 정상적으로 렌더링되어야 한다', () => {
    render(<Button label="테스트 버튼" />);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('children prop이 정상적으로 렌더링되어야 한다', () => {
    render(<Button>테스트 버튼</Button>);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('클릭 이벤트가 정상적으로 동작해야 한다', () => {
    const mockHandler = jest.fn();
    render(<Button label="클릭 테스트" handler={mockHandler} />);

    fireEvent.click(screen.getByText('클릭 테스트'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태일 때 스타일이 적용되어야 한다', () => {
    render(<Button label="비활성화 버튼" disabled />);

    const button = screen.getByText('비활성화 버튼');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:bg-[#F7F7F8]');
  });

  it('variant 스타일이 정상적으로 적용되어야 한다', () => {
    render(<Button label="white 버튼" fill="white" />);

    const button = screen.getByText('white 버튼');
    expect(button).toHaveClass('bg-white', 'border', 'border-[#E0E0E2]');
  });

  it('size variant가 정상적으로 적용되어야 한다', () => {
    render(<Button label="모달 버튼" size="modal_sm" />);

    const button = screen.getByText('모달 버튼');
    expect(button).toHaveClass('w-[90px]', 'h-[38px]');
  });
});
