'use client';

import AuthPassword from '@/components/auth/input/AuthPassword';
import useAuthInput from '@/hooks/useAuthInput';
import { useEffect } from 'react';
import validate from '@/utils/validateAuthInput';
import { Button } from '@/components/common/button/Button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResetAuthPassword } from '@/queries/auth/useResetPassword';
import FormHeader from '@/components/common/formheader/FormHeader';

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
    <div>
      <FormHeader title="비밀번호 변경" />

      <h1 className="title-5-sb mx-auto mt-10 max-w-[335px]">
        새로운 비밀번호를 입력해주세요.
      </h1>

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
    </div>
  );
};

export default AuthPasswordPage;
