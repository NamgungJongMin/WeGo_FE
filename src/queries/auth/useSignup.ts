import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/auth/signupApi';
import { QueryError } from '@/@types/query';
import { useRouter } from 'next/navigation';

const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 400:
          // 400 에러 핸들링 (show Toast)
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

export default useSignup;
