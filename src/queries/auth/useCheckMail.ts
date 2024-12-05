import { QueryError } from '@/@types/query';
import { checkMail } from '@/api/auth/signupApi';
import { useMutation } from '@tanstack/react-query';

const useCheckMail = (onSuccessCallback: (token: string) => void) => {
  return useMutation({
    mutationFn: checkMail,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 400:
          // 400 에러 핸들링
          throw new Error('VERIFY_FAILED');
        default:
        // default 에러 핸들링
      }
    },
    onSuccess: (data) => {
      onSuccessCallback(data.verifiedToken);
    },
  });
};

export default useCheckMail;
