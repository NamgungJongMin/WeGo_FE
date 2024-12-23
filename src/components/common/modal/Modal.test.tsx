import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useModalStore } from '@/store/useModalStore';
import Modal from './Modal';

jest.mock('@/store/useModalStore');

describe('모달 컴포넌트', () => {
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    (useModalStore as unknown as jest.Mock).mockReturnValue({
      modal: {
        isOpen: true,
        title: '테스트 제목',
        message: '테스트 메시지',
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
      },
      closeModal: mockCloseModal,
    });
  });

  it('모달이 열려 있을 때 제목과 메시지가 표시되어야 합니다', () => {
    render(<Modal />);

    expect(screen.getByText('테스트 제목')).toBeInTheDocument();
    expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
  });

  it('확인 버튼을 클릭하면 onConfirm이 호출되어야 합니다', () => {
    const onConfirm = jest.fn();
    (useModalStore as unknown as jest.Mock).mockReturnValue({
      modal: {
        isOpen: true,
        title: '테스트 제목',
        message: '테스트 메시지',
        onConfirm,
        onCancel: jest.fn(),
      },
      closeModal: mockCloseModal,
    });

    render(<Modal />);

    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('취소 버튼을 클릭하면 onCancel이 호출되어야 합니다', () => {
    const onCancel = jest.fn();
    (useModalStore as unknown as jest.Mock).mockReturnValue({
      modal: {
        isOpen: true,
        title: '테스트 제목',
        message: '테스트 메시지',
        onConfirm: jest.fn(),
        onCancel,
      },
      closeModal: mockCloseModal,
    });

    render(<Modal />);

    const cancelButton = screen.getByText('취소');
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
