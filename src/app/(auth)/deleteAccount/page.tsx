'use client';

import AuthPassword from '@/components/auth/input/AuthPassword';
import { Button } from '@/components/common/button/Button';
import FormHeader from '@/components/common/formheader/FormHeader';
import useAuthInput from '@/hooks/useAuthInput';
import useCheckPassword from '@/queries/auth/useCheckPassword';

const DeleteAccountPage = () => {
  const password = useAuthInput({ name: 'password' });

  const { mutate: checkPassword } = useCheckPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkPassword({ password: password.value });
  };

  return (
    <div>
      <FormHeader title="계정 탈퇴" />

      <h1 className="title-5-sb mx-auto mt-10 max-w-[335px]">
        계정을 탈퇴하기 위해 비밀번호가 필요해요.
      </h1>

      <div className="mx-auto mt-6 flex max-w-[335px] justify-center">
        <form onSubmit={handleSubmit}>
          <AuthPassword
            name="password"
            value={password.value}
            isValid={password.isValid}
            important
            onChange={password.handleChange}
          />
          <Button
            label="탈퇴하기"
            type="submit"
            className="mt-[372px]"
            disabled={!password.isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
