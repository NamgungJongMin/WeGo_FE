import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '@/api/auth/deleteAccountApi';
import { useRouter } from 'next/navigation';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';

const useDeleteAccount = () => {
  const router = useRouter();
  const { showModal } = useModal();

  return useMutation({
    mutationFn: deleteAccount,
    onError: (error: QueryError) => {
      switch (error.status) {
        default:
          showModal('네트워크를 확인해주세요.', '회원탈퇴에 실패했습니다.', {
            icon: ModalErrorIcon,
          });
      }
    },
    onSuccess: () => {
      router.push('/');
    },
  });
};

export default useDeleteAccount;
