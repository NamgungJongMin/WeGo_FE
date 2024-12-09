'use client';

import AuthEmailCertification from '@/components/auth/input/AuthEmailCertification';
import FormHeader from '@/components/common/formheader/FormHeader';
import useAuthInput from '@/hooks/useAuthInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/button/Button';

import usePasswordSendMail from '@/queries/auth/usePasswordSendMail';

const FindPasswordPage = () => {
  const router = useRouter();

  const email = useAuthInput({ name: 'email' });
  const emailCode = useAuthInput({ name: 'emailCode' });
  const [isEmailCertified, setIsEmailCertified] = useState<boolean | null>(
    null,
  );
  const [certifiedToken, setCertifiedToken] = useState('');
  const [due, setDue] = useState(300);
  const [successMailSend, setSuccessMailSend] = useState<boolean | null>(null);

  const isFormValid = () => {
    return isEmailCertified && email.isValid && emailCode.isValid;
  };

  const { mutate: passwordSendMail } = usePasswordSendMail(
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

  const clickNext = () => {
    router.push(
      `/resetPassword/authPassword?email=${email.value}&token=${certifiedToken}`,
    );
  };

  return (
    <div>
      <FormHeader title="비밀번호 찾기" />

      <div className="mx-auto mt-10 flex max-w-[335px] justify-center">
        <div className="w-full">
          <AuthEmailCertification
            email={email}
            emailCode={emailCode}
            isEmailCertified={isEmailCertified}
            due={due}
            setDue={setDue}
            successMailSend={successMailSend}
            sendMail={passwordSendMail}
            setIsEmailCertified={setIsEmailCertified}
            setCertifiedToken={setCertifiedToken}
          />

          <Button
            label="다음"
            type="submit"
            className="mt-[362px]"
            disabled={!isFormValid()}
            handler={clickNext}
          />
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
