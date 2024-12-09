'use client';

import AuthPassword from '@/components/auth/input/AuthPassword';
import useAuthInput from '@/hooks/useAuthInput';
import { useEffect } from 'react';
import validate from '@/utils/validateAuthInput';
import { Button } from '@/components/common/button/Button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResetAuthPassword } from '@/queries/auth/useResetPassword';

const AuthPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const password = useAuthInput({ name: 'password' });
  const passwordConfirm = useAuthInput({
    name: 'passwordConfirm',
    password: password.value,
  });

  const { mutate: resetAuthPassword } = useResetAuthPassword();

  const isFormValid = () => {
    return password.isValid && passwordConfirm.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetAuthPassword({
      email: email ?? '',
      password: password.value,
      token: token ?? '',
    });
  };

  useEffect(() => {
    if (!email && !token) {
      router.back();
    }
  }, [email, token, router]);

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
    <div className="mx-auto mt-6 flex max-w-[335px] justify-center">
      <form onSubmit={handleSubmit} className="w-full">
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

        <Button
          label="완료"
          type="submit"
          className="mt-[296px]"
          disabled={!isFormValid()}
        />
      </form>
    </div>
  );
};

export default AuthPasswordPage;
