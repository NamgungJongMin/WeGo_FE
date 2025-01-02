'use client';

import AuthText from '@/components/auth/input/AuthText';
import useAuthInput from '@/hooks/useAuthInput';
import { Button } from '@/components/common/button/Button';
import useLogin from '@/queries/auth/useLogin';
import AuthPassword from '../input/AuthPassword';

const LoginForm = () => {
  const email = useAuthInput({ name: 'email' });
  const password = useAuthInput({ name: 'password' });
  const { mutate: login } = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <form
      className="mb-4 w-full"
      onSubmit={handleLogin}
      data-testid="login-form"
    >
      <AuthText
        type="email"
        name="email"
        size="full"
        value={email.value}
        isValid={email.isValid}
        onChange={email.handleChange}
      />

      <AuthPassword
        name="password"
        value={password.value}
        isValid={password.isValid}
        onChange={password.handleChange}
      />

      <Button
        label="로그인"
        type="submit"
        size="full"
        className="mt-[180px]"
        disabled={!email.isValid || !password.isValid}
      />
    </form>
  );
};

export default LoginForm;
