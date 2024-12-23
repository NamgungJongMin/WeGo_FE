import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useToastStore } from '@/store/useToastStore';
import Toast from './Toast';

// useToastStore를 모킹합니다.
jest.mock('@/store/useToastStore');

describe('Toast 컴포넌트 테스트', () => {
  it('토스트 메시지가 올바르게 렌더링된다', () => {
    (useToastStore as unknown as jest.Mock).mockReturnValue({
      toasts: [
        { id: 1, type: 'success', message: '성공 메시지' },
        { id: 2, type: 'error', message: '오류 메시지' },
      ],
    });

    const { getByText } = render(<Toast />);

    expect(getByText('성공 메시지')).toBeInTheDocument();
    expect(getByText('오류 메시지')).toBeInTheDocument();
  });

  it('토스트 유형에 따라 올바른 스타일이 적용된다', () => {
    (useToastStore as unknown as jest.Mock).mockReturnValue({
      toasts: [
        { id: 1, type: 'success', message: '성공 메시지' },
        { id: 2, type: 'error', message: '오류 메시지' },
      ],
    });

    const { container } = render(<Toast />);

    const successToast = container.querySelector('.bg-blue-100');
    const errorToast = container.querySelector('.bg-red-100');

    expect(successToast).toBeInTheDocument();
    expect(errorToast).toBeInTheDocument();
  });
});
