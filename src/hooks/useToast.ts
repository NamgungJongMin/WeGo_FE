import { ToastType, useToastStore } from '@/store/useToastStore';

const useToast = () => {
  const { addToast } = useToastStore();

  const showToast = (
    message: string,
    type: ToastType = 'info',
    duration = 3000,
  ) => {
    addToast(message, type, duration);
  };

  return { showToast };
};

export default useToast;
