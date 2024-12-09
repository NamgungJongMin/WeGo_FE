import { useMutation } from '@tanstack/react-query';
import { checkPassword } from '@/api/auth/deleteAccountApi';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import { useRouter } from 'next/navigation';
import useDeleteAccount from './useDeleteAccount';

const useCheckPassword = () => {
  const { showModal } = useModal();
  const router = useRouter();
  const { mutate: deleteAccount } = useDeleteAccount();

  return useMutation({
    mutationFn: checkPassword,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('잘못된 비밀번호입니다.', '비밀번호를 확인해주세요.', {
            icon: ModalErrorIcon,
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '회원탈퇴에 실패했습니다.', {
            icon: ModalErrorIcon,
          });
      }
    },
    onSuccess: () => {
      showModal(
        '탈퇴를 진행하시겠습니까?',
        `계정 탈퇴를 진행하시면,\n녹차라떼 님의 여행과 관련된 데이터가\n모두 사라집니다.`,
        {
          cancelText: '취소',
          confirmText: '확인',
          onCancel: () => {
            router.push('/mypage');
          },
          onConfirm: deleteAccount,
        },
      );
    },
  });
};

export default useCheckPassword;
