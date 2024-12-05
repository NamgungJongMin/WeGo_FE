import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import loginApi from '@/api/auth/loginApi';
import { QueryError } from '@/@types/query';

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          throw new Error('credentials not valid');
        // 401 에러 핸들링
        case 400:
          // 400 에러 핸들링
          break;
        default:
        // default 에러 핸들링
      }
    },
    onSuccess: () => {
      router.push('/');
    },
  });
};

export default useLogin;
