import { useCallback, memo, useEffect } from 'react';

import { Button } from '@/components/common/button/Button';
import formatTimeToMMSS from '@/utils/formatTimeToMMSS';
import useCheckCode from '@/queries/auth/useCheckCode';
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
  isEmailCertified: boolean | null;
  due: number;
  setDue: React.Dispatch<React.SetStateAction<number>>;
  successMailSend: boolean | null;
  sendMail: (credentials: { email: string }) => void;
  setIsEmailCertified: (isEmailCertified: boolean | null) => void;
  setCertifiedToken: (token: string) => void;
}

const AuthEmailCertification = memo(
  ({
    email,
    emailCode,
    isEmailCertified,
    due,
    setDue,
    successMailSend,
    sendMail,
    setIsEmailCertified,
    setCertifiedToken,
  }: Props) => {
    const { mutate: checkCode } = useCheckCode(
      (token: string) => {
        setIsEmailCertified(true);
        setCertifiedToken(token);
      },
      () => {
        setIsEmailCertified(false);
      },
    );

    const handleVerifyClick = useCallback(() => {
      sendMail({ email: email.value });
    }, [email.value, sendMail]);

    const handleConfirmClick = useCallback(() => {
      checkCode({
        email: email.value,
        emailCode: Number(emailCode.value),
      });
    }, [email.value, emailCode.value, checkCode]);

    useEffect(() => {
      if (!successMailSend || Boolean(isEmailCertified) || due === 0)
        return () => {};

      const timer = setInterval(() => {
        if (due <= 0) {
          clearInterval(timer);
          return;
        }
        setDue((time) => time - 1);
      }, 1000);

      return () => clearInterval(timer);
    }, [due, setDue, isEmailCertified, successMailSend]);

    return (
      <div className="relative mb-6">
        <AuthText
          type="email"
          name="email"
          value={email.value}
          disabled={Boolean(successMailSend)}
          isValid={email.isValid}
          successMailSend={successMailSend}
          important
          onChange={email.handleChange}
          size="withButton"
        >
          <Button
            label={successMailSend ? '재전송' : '인증'}
            handler={handleVerifyClick}
            size="addon"
            disabled={!email.isValid || Boolean(isEmailCertified)}
            className="mt-[6px]"
          />
        </AuthText>

        <AuthText
          type="text"
          name="emailCode"
          value={emailCode.value}
          disabled={due === 0 || Boolean(isEmailCertified)}
          isValid={due === 0 ? false : isEmailCertified}
          onChange={emailCode.handleChange}
          className=""
          size="withButton"
          classNameCondition={{
            hidden: !successMailSend,
          }}
        >
          {successMailSend && !isEmailCertified && (
            <span className="absolute left-[170px] top-[21px] text-xs text-status-error">
              {formatTimeToMMSS(due)}
            </span>
          )}

          <Button
            label="확인"
            handler={handleConfirmClick}
            size="addon"
            disabled={
              !emailCode.isValid || due === 0 || Boolean(isEmailCertified)
            }
            className="mt-[6px]"
            classNameCondition={{ hidden: !successMailSend }}
          />
        </AuthText>
      </div>
    );
  },
);

AuthEmailCertification.displayName = 'AuthEmailCertification';

export default AuthEmailCertification;
