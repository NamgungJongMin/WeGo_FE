import { useCallback, memo, useState, useEffect } from 'react';

import { Button } from '@/components/common/button/Button';
import formatTimeToMMSS from '@/utils/formatTimeToMMSS';
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
  isEmailCertified: boolean | null;
  setIsEmailCertified: (isEmailCertified: boolean | null) => void;
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
    const [due, setDue] = useState(300);
    const [successMailSend, setSuccessMailSend] = useState<boolean | null>(
      null,
    );

    const { mutate: sendMail } = useSendMail(
      () => {
        if (!successMailSend) {
          setSuccessMailSend(true);
        }
        setDue(300);
        emailCode.setIsValid(false);
        emailCode.setValue('');
      },
      () => {
        setSuccessMailSend(false);
      },
    );

    const { mutate: checkMail } = useCheckMail(
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
      checkMail({
        email: email.value,
        emailCode: Number(emailCode.value),
      });
    }, [email.value, emailCode.value, checkMail]);

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
    }, [due, isEmailCertified, successMailSend]);

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
