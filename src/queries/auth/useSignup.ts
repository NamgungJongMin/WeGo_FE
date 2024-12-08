import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/auth/signupApi';
import { QueryError } from '@/@types/query';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import ModalSuccessIcon from '@/assets/modal/modal_success.svg';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';

const useSignup = () => {
  const router = useRouter();
  const { showModal } = useModal();

  return useMutation({
    mutationFn: signup,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 500:
          showModal('네트워크를 확인해주세요.', '회원가입에 실패했습니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
            messageHighlight: {
              range: { start: 6, end: 8 },
              color: 'text-status-error',
            },
            onConfirm: () => {
              router.push('/login');
            },
          });
          break;
        case 400:
          // 400 에러 핸들링
          break;
        default:
        // default 에러 핸들링
      }
    },
    onSuccess: () => {
      showModal(
        "축하해요! WE'GO의\n회원가입이 완료 되었습니다.",
        '이제 함께 떠나는 여행을 시작해요.',
        {
          icon: ModalSuccessIcon,
          confirmText: '확인',
          titleHighlight: {
            range: { start: 19, end: 21 },
            color: 'text-primary-normal',
          },
          onConfirm: () => {
            router.push('/');
          },
        },
      );
    },
  });
};

export default useSignup;
