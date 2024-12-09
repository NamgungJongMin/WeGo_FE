'use client';

import { useToastStore } from '@/store/useToastStore';
import cn from '@/utils/cn';
import ToastErrorIcon from '@/assets/toast/toast_error.svg';
import ToastSuccessIcon from '@/assets/toast/toast_success.svg';

const Toast = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed left-1/2 top-0 z-50 flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'min-w-[320px] animate-slide-down rounded-lg px-4 py-3 shadow-lg transition-all duration-300',
            {
              'bg-red-100 text-status-error': toast.type === 'error',
              'bg-blue-100 text-status-success': toast.type === 'success',
              // 'bg-blue-500 text-white': toast.type === 'info',
            },
          )}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' && <ToastSuccessIcon />}
            {toast.type === 'error' && <ToastErrorIcon />}

            <p className="text-sm">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
