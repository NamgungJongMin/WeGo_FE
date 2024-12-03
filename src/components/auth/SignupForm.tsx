'use client';

import AuthText from '@/components/auth/input/AuthText';
import { useAuthInput } from '@/hooks/useAuthInput';
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

  return (
    <form className="w-full">
      <AuthEmailSert />

      <AuthPassword
        name="password"
        value={password.value}
        isValid={password.isValid}
        onChange={password.handleChange}
      />

      <AuthPassword
        name="passwordConfirm"
        value={passwordConfirm.value}
        isValid={passwordConfirm.isValid}
        onChange={passwordConfirm.handleChange}
      />

      <AuthText
        type="text"
        name="name"
        value={name.value}
        isValid={name.isValid}
        onChange={name.handleChange}
        className="mb-6"
      />

      <AuthText
        type="text"
        name="nickname"
        value={nickname.value}
        isValid={nickname.isValid}
        onChange={nickname.handleChange}
        className="mb-6"
      />

      <AuthText
        type="number"
        name="birthDate"
        value={birthDate.value}
        isValid={birthDate.isValid}
        onChange={birthDate.handleChange}
        className="mb-6"
      />
    </form>
  );
};

export default SignupForm;
