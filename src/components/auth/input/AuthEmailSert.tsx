import { useCallback, memo, useState, useEffect } from 'react';

import { useAuthInput } from '@/hooks/useAuthInput';
import { Button } from '@/components/common/button/Button';
import formatTimeToMMSS from '@/utils/formatTimeToMMSS';
import { AUTH_SUCCESS_MESSAGE } from '@/constants/auth';
import AuthText from './AuthText';

const AuthEmailSert = memo(() => {
  const [due, setDue] = useState(10);
  const [viewEmailCode, setViewEmailCode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const email = useAuthInput({ name: 'email' });
  const emailCode = useAuthInput({ name: 'emailCode' });

  useEffect(() => {
    if (!viewEmailCode || due === 0) return () => {};

    const timer = setInterval(() => {
      if (due <= 0) {
        clearInterval(timer);
        return;
      }

      setDue((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [due, viewEmailCode]);

  const handleVerifyClick = useCallback(() => {
    // TODO: 인증 요청 로직 추가
    if (!viewEmailCode) {
      setViewEmailCode(true);
    }

    setDue(300);
    emailCode.setIsValid(false);
    emailCode.setValue('');
  }, [emailCode, viewEmailCode]);

  const handleConfirmClick = useCallback(() => {
    // TODO: 인증 확인 로직 추가

    setIsVerified(true);
  }, []);

  return (
    <div className="relative">
      <AuthText
        type="email"
        name="email"
        value={email.value}
        disabled={viewEmailCode}
        isValid={email.isValid}
        important
        onChange={email.handleChange}
        className="mb-6"
        size="withButton"
      >
        <Button
          label={viewEmailCode ? '재전송' : '인증'}
          handler={handleVerifyClick}
          size="addon"
          disabled={!email.isValid || isVerified}
          className="mt-[6px]"
        />
      </AuthText>

      <AuthText
        type="text"
        name="emailCode"
        value={emailCode.value}
        disabled={due === 0 || isVerified}
        isValid={isVerified}
        onChange={emailCode.handleChange}
        className="-mt-3 mb-6"
        size="withButton"
        classNameCondition={{
          hidden: !viewEmailCode,
          'border-status-infomative focus:border-status-infomative':
            emailCode.isValid,
        }}
      >
        <Button
          label="확인"
          handler={handleConfirmClick}
          size="addon"
          disabled={!emailCode.isValid || due === 0 || isVerified}
          className="-mt-[12px]"
          classNameCondition={{ hidden: !viewEmailCode }}
        />
      </AuthText>

      {viewEmailCode && !isVerified && (
        <span className="absolute bottom-0 text-xs text-status-error">
          {due > 0 ? formatTimeToMMSS(due) : '인증 시간이 초과되었습니다.'}
        </span>
      )}

      {isVerified && (
        <span className="absolute bottom-0 text-xs text-status-infomative">
          {AUTH_SUCCESS_MESSAGE.emailCode}
        </span>
      )}
    </div>
  );
});

AuthEmailSert.displayName = 'AuthEmailSert';

export default AuthEmailSert;
