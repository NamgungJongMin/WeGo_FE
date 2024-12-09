import { useMutation } from '@tanstack/react-query';
import {
  resetAuthPassword,
  resetUserPassword,
} from '@/api/auth/resetPasswordApi';
import { QueryError } from '@/@types/query';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import ModalSuccessIcon from '@/assets/modal/modal_success.svg';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';

// 인증(이메일로 받은 토큰)을 통한 비밀번호 재설정
const useResetAuthPassword = () => {
  const router = useRouter();
  const { showModal } = useModal();

  return useMutation({
    mutationFn: resetAuthPassword,
    onError: (error: QueryError) => {
      switch (error.status) {
        default:
          showModal(
            '네트워크를 확인해주세요.',
            '비밀번호 재설정에 실패했습니다.',
            {
              icon: ModalErrorIcon,
              confirmText: '돌아가기',
              onConfirm: () => {
                router.push('/login');
              },
            },
          );
      }
    },

    onSuccess: () => {
      showModal('비밀번호 변경이 완료되었습니다.', '', {
        icon: ModalSuccessIcon,
        confirmText: '확인',
        onConfirm: () => {
          router.push('/login');
        },
      });
    },
  });
};

// 로그인된 사용자의 비밀번호 변경
const useResetUserPassword = () => {
  const router = useRouter();
  const { showModal } = useModal();

  return useMutation({
    mutationFn: resetUserPassword,
    onError: (error: QueryError) => {
      switch (error.status) {
        default:
          showModal(
            '네트워크를 확인해주세요.',
            '비밀번호 재설정에 실패했습니다.',
            {
              icon: ModalErrorIcon,
              confirmText: '돌아가기',
              onConfirm: () => {
                router.push('/mypage');
              },
            },
          );
      }
    },

    onSuccess: () => {
      showModal('비밀번호 변경이 완료되었습니다.', '', {
        icon: ModalSuccessIcon,
        confirmText: '확인',
        onConfirm: () => {
          router.push('/login');
        },
      });
    },
  });
};

export { useResetAuthPassword, useResetUserPassword };
