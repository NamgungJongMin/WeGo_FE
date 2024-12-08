import { QueryError } from '@/@types/query';
import { checkMail } from '@/api/auth/signupApi';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast';

const useCheckMail = (
  onSuccessCallback: (token: string) => void,
  onErrorCallback: () => void,
) => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: checkMail,
    onError: (error: QueryError) => {
      onErrorCallback();
      switch (error.status) {
        case 400:
          showToast('이메일 인증 코드가 일치하지 않습니다.', 'error');
          break;
        default:
          showToast('이메일 인증에 실패하였습니다.', 'error');
      }
    },
    onSuccess: (data) => {
      onSuccessCallback(data.verifiedToken);
      showToast('이메일 인증이 완료되었습니다.', 'success');
    },
  });
};

export default useCheckMail;
