import { create } from 'zustand';
import { ComponentType } from 'react';

interface TextHighlight {
  range: {
    start: number;
    end: number;
  };
  color: string;
}

interface ModalState {
  isOpen: boolean;
  icon?: ComponentType;
  title: string;
  titleHighlight?: TextHighlight;
  message: string;
  messageHighlight?: TextHighlight;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalStore {
  modal: ModalState;
  openModal: (modal: Partial<ModalState>) => void;
  closeModal: () => void;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  message: '',
  confirmText: '확인',
};

const useModalStore = create<ModalStore>((set) => ({
  modal: initialState,
  openModal: (modal) =>
    set((state) => ({
      modal: { ...state.modal, ...modal, isOpen: true },
    })),
  closeModal: () => set({ modal: initialState }),
}));

export { useModalStore, type TextHighlight };
