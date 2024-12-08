import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import loginApi from '@/api/auth/loginApi';
import { QueryError } from '@/@types/query';
import useToast from '@/hooks/useToast';

const useLogin = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: loginApi,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showToast('가입되지 않은 계정입니다.', 'error');
          break;
        case 500:
          showToast('네트워크를 확인해주세요.', 'error');
          break;
        default:
          showToast('알 수 없는 에러가 발생했습니다.', 'error');
      }
    },
    onSuccess: () => {
      router.push('/');
    },
  });
};

export default useLogin;
