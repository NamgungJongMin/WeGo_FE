import { QueryError } from '@/@types/query';
import { sendMail } from '@/api/auth/signupApi';
import { useMutation } from '@tanstack/react-query';

const useSendMail = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: sendMail,
    onError: (error: QueryError) => {
      switch (error.status) {
        default:
        // default 에러 핸들링
      }
    },
    onSuccess: () => {
      onSuccessCallback();
    },
  });
};

export default useSendMail;
