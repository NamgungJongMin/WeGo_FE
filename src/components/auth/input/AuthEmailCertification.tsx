import { useCallback, memo, useState, useEffect } from 'react';

import { Button } from '@/components/common/button/Button';
import formatTimeToMMSS from '@/utils/formatTimeToMMSS';
import { AUTH_SUCCESS_MESSAGE } from '@/constants/auth';
import useSendMail from '@/queries/auth/useSendMail';
import useCheckMail from '@/queries/auth/useCheckMail';
import AuthText from './AuthText';

interface PropsState {
  value: string;
  isValid: boolean | null;
  setValue: (value: string) => void;
  setIsValid: (isValid: boolean | null) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
  email: PropsState;
  emailCode: PropsState;
  isEmailCertified: boolean;
  setIsEmailCertified: (isEmailCertified: boolean) => void;
  setCertifiedToken: (certifiedToken: string) => void;
}

const AuthEmailCertification = memo(
  ({
    email,
    emailCode,
    isEmailCertified,
    setIsEmailCertified,
    setCertifiedToken,
  }: Props) => {
    const [due, setDue] = useState(0);
    const [viewEmailCode, setViewEmailCode] = useState(false);

    const { mutate: sendMail } = useSendMail(() => {
      if (!viewEmailCode) {
        setViewEmailCode(true);
      }
      setDue(300);
      emailCode.setIsValid(false);
      emailCode.setValue('');
    });

    const { mutate: checkMail } = useCheckMail((token: string) => {
      setIsEmailCertified(true);
      setCertifiedToken(token);
    });

    const handleVerifyClick = useCallback(() => {
      sendMail({ email: email.value });
    }, [email.value, sendMail]);

    const handleConfirmClick = useCallback(() => {
      checkMail({
        email: email.value,
        emailCode: Number(emailCode.value),
      });
    }, [email.value, emailCode.value, checkMail]);

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
            disabled={!email.isValid || isEmailCertified}
            className="mt-[6px]"
          />
        </AuthText>

        <AuthText
          type="text"
          name="emailCode"
          value={emailCode.value}
          disabled={due === 0 || isEmailCertified}
          isValid={isEmailCertified}
          onChange={emailCode.handleChange}
          className="-mt-3 mb-6"
          size="withButton"
          classNameCondition={{
            hidden: !viewEmailCode,
          }}
        >
          <Button
            label="확인"
            handler={handleConfirmClick}
            size="addon"
            disabled={!emailCode.isValid || due === 0 || isEmailCertified}
            className="-mt-[12px]"
            classNameCondition={{ hidden: !viewEmailCode }}
          />
        </AuthText>

        {viewEmailCode && !isEmailCertified && (
          <span className="absolute bottom-0 text-xs text-status-error">
            {due > 0 ? formatTimeToMMSS(due) : '인증 시간이 초과되었습니다.'}
          </span>
        )}

        {isEmailCertified && (
          <span className="absolute bottom-0 text-xs text-status-infomative">
            {AUTH_SUCCESS_MESSAGE.emailCode}
          </span>
        )}
      </div>
    );
  },
);

AuthEmailCertification.displayName = 'AuthEmailCertification';

export default AuthEmailCertification;
