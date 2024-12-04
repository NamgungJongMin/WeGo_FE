'use client';

import AuthText from '@/components/auth/input/AuthText';
import useAuthInput from '@/hooks/useAuthInput';
import { Button } from '@/components/common/button/Button';
import AuthPassword from './input/AuthPassword';
import AuthEmailSert from './input/AuthEmailSert';

const SignupForm = () => {
  const password = useAuthInput({ name: 'password' });
  const passwordConfirm = useAuthInput({
    name: 'passwordConfirm',
    password: password.value,
  });
  const name = useAuthInput({ name: 'name' });
  const nickname = useAuthInput({ name: 'nickname' });
  const birthDate = useAuthInput({ name: 'birthDate' });
  const contact = useAuthInput({ name: 'contact' });
  return (
    <form className="w-full">
      <AuthEmailSert />

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
        className="mb-6"
        onChange={name.handleChange}
      />

      <AuthText
        type="tel"
        name="contact"
        value={contact.value}
        isValid={contact.isValid}
        important
        className="mb-6"
        onChange={contact.handleChange}
      />

      <AuthText
        type="text"
        name="nickname"
        value={nickname.value}
        isValid={nickname.isValid}
        important
        onChange={nickname.handleChange}
        className="mb-6"
      />

      <AuthText
        type="text"
        name="birthDate"
        value={birthDate.value}
        isValid={birthDate.isValid}
        important
        onChange={birthDate.handleChange}
        className="mb-6"
      />

      <Button label="회원가입" className="mt-9" />
    </form>
  );
};

export default SignupForm;
