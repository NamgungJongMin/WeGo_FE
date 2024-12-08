import { QueryError } from '@/@types/query';
import { sendMail } from '@/api/auth/signupApi';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast';

const useSendMail = (
  onSuccessCallback: () => void,
  onErrorCallback: () => void,
) => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: sendMail,
    onError: (error: QueryError) => {
      onErrorCallback();
      switch (error.status) {
        case 400:
          showToast('이미 가입된 이메일입니다.', 'error');
          break;
        default:
          showToast('알 수 없는 에러가 발생했습니다.', 'error');
      }
    },
    onSuccess: () => {
      onSuccessCallback();
      showToast('인증 메일을 전송했습니다.', 'success');
    },
  });
};

export default useSendMail;
