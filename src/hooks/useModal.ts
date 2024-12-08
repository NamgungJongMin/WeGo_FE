import { useModalStore, type TextHighlight } from '@/store/useModalStore';
import { ComponentType, SVGProps } from 'react';

interface ModalOptions {
  icon?: ComponentType<SVGProps<SVGElement>>;
  titleHighlight?: TextHighlight;
  messageHighlight?: TextHighlight;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const useModal = () => {
  const { openModal, closeModal } = useModalStore();

  const showModal = (
    title: string,
    message: string,
    options?: ModalOptions,
  ) => {
    openModal({
      title,
      message,
      ...options,
    });
  };

  return {
    showModal,
    closeModal,
  };
};

export default useModal;
