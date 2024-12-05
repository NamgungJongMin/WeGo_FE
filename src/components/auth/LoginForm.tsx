'use client';

import AuthText from '@/components/auth/input/AuthText';
import useAuthInput from '@/hooks/useAuthInput';
import { Button } from '@/components/common/button/Button';
import useLogin from '@/queries/auth/useLogin';
import AuthPassword from './input/AuthPassword';

const LoginForm = () => {
  const email = useAuthInput({ name: 'email' });
  const password = useAuthInput({ name: 'password' });
  const { mutate: login } = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.isValid || !password.isValid) {
      return;
    }

    login({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <form className="mb-4 w-full" onSubmit={handleLogin}>
      <AuthText
        type="email"
        name="email"
        value={email.value}
        isValid={email.isValid}
        onChange={email.handleChange}
        className="mb-6"
      />

      <AuthPassword
        name="password"
        value={password.value}
        isValid={password.isValid}
        onChange={password.handleChange}
      />

      <Button label="로그인" type="submit" className="mt-[180px]" />
    </form>
  );
};

export default LoginForm;
