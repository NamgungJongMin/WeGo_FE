'use client';

import AuthText from '@/components/auth/input/AuthText';
import useAuthInput from '@/hooks/useAuthInput';
import { Button } from '@/components/common/button/Button';
import { useEffect, useState } from 'react';
import validate from '@/utils/validateAuthInput';
import useSignup from '@/queries/auth/useSignup';
import useSendMail from '@/queries/auth/useSendMail';
import AuthPassword from './input/AuthPassword';
import AuthEmailCertification from './input/AuthEmailCertification';

const SignupForm = () => {
  const [isEmailCertified, setIsEmailCertified] = useState<boolean | null>(
    null,
  );
  const [certifiedToken, setCertifiedToken] = useState('');
  const [due, setDue] = useState(300);
  const [successMailSend, setSuccessMailSend] = useState<boolean | null>(null);

  const email = useAuthInput({ name: 'email' });
  const emailCode = useAuthInput({ name: 'emailCode' });
  const password = useAuthInput({ name: 'password' });
  const passwordConfirm = useAuthInput({
    name: 'passwordConfirm',
    password: password.value,
  });
  const name = useAuthInput({ name: 'name' });
  const nickname = useAuthInput({ name: 'nickname' });
  const birthDate = useAuthInput({ name: 'birthDate' });
  const contact = useAuthInput({ name: 'contact' });

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

  const { mutate: signup } = useSignup();

  const isFormValid = () => {
    return (
      isEmailCertified &&
      password.isValid &&
      passwordConfirm.isValid &&
      name.isValid &&
      nickname.isValid &&
      contact.isValid &&
      birthDate.isValid
    );
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      verifiedToken: certifiedToken,
      email: email.value,
      password: password.value,
      name: name.value,
      nickname: nickname.value,
      birthDate: Number(birthDate.value),
      contact: contact.value,
    };

    signup(requestBody);
  };

  useEffect(() => {
    if (passwordConfirm.value) {
      passwordConfirm.setIsValid(
        validate({
          name: 'passwordConfirm',
          value: passwordConfirm.value,
          password: password.value,
        }),
      );
    }
  }, [password.value, passwordConfirm]);

  return (
    <form onSubmit={handleSignup} className="w-full" data-testid="signup-form">
      <AuthEmailCertification
        email={email}
        emailCode={emailCode}
        isEmailCertified={isEmailCertified}
        due={due}
        setDue={setDue}
        successMailSend={successMailSend}
        sendMail={sendMail}
        setIsEmailCertified={setIsEmailCertified}
        setCertifiedToken={setCertifiedToken}
      />

      <AuthPassword
        name="password"
        value={password.value}
        isValid={password.isValid}
        important
        onChange={password.handleChange}
      />

      <AuthPassword
        name="passwordConfirm"
        value={passwordConfirm.value}
        isValid={passwordConfirm.isValid}
        important
        onChange={passwordConfirm.handleChange}
      />

      <AuthText
        type="text"
        name="name"
        value={name.value}
        isValid={name.isValid}
        important
        onChange={name.handleChange}
      />

      <AuthText
        type="tel"
        name="contact"
        value={contact.value}
        isValid={contact.isValid}
        important
        onChange={contact.handleChange}
      />

      <AuthText
        type="text"
        name="nickname"
        value={nickname.value}
        isValid={nickname.isValid}
        important
        onChange={nickname.handleChange}
      />

      <AuthText
        type="text"
        name="birthDate"
        value={birthDate.value}
        isValid={birthDate.isValid}
        important
        onChange={birthDate.handleChange}
      />

      <Button
        label="회원가입"
        type="submit"
        className="mt-9"
        disabled={!isFormValid()}
      />
    </form>
  );
};

export default SignupForm;
