import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProfile } from '@/api/user/editProfile';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalSuccessIcon from '@/assets/modal/modal_success.svg';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import { useRouter } from 'next/navigation';

const useEditProfile = () => {
  const router = useRouter();
  const { showModal } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    onError: (error: QueryError) => {
      console.error(error);
      switch (error.status) {
        case 401:
          showModal('토큰이 만료되었습니다.', '프로필 수정에 실패했습니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
            type: 'error',
            onConfirm: () => {
              router.push('/login');
            },
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '프로필 수정에 실패했습니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
            type: 'error',
            onConfirm: () => {
              router.push('/mypage');
            },
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      showModal('프로필 수정이 완료되었습니다.', '', {
        icon: ModalSuccessIcon,
        confirmText: '확인',
        onConfirm: () => {
          router.replace('/mypage');
        },
      });
    },
  });
};

export default useEditProfile;
