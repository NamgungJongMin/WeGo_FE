'use client';

import AuthTextInput from '@/components/auth/input/AuthText';
import { useAuthInput } from '@/hooks/useAuthInput';
import { Button } from '@/components/common/button/Button';
import AuthPasswordInput from './input/AuthPassword';

const LoginForm = () => {
  const email = useAuthInput({ name: 'email' });
  const password = useAuthInput({ name: 'password' });

  return (
    <form className="mb-4 w-full">
      <AuthTextInput
        type="email"
        name="email"
        value={email.value}
        isValid={email.isValid}
        onChange={email.handleChange}
        className="mb-6"
      />

      <AuthPasswordInput
        name="password"
        value={password.value}
        isValid={password.isValid}
        onChange={password.handleChange}
      />

      <Button label="로그인" className="mt-[180px]" />
    </form>
  );
};

export default LoginForm;
