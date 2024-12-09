'use client';

import AuthPassword from '@/components/auth/input/AuthPassword';
import { Button } from '@/components/common/button/Button';
import FormHeader from '@/components/common/formheader/FormHeader';
import useAuthInput from '@/hooks/useAuthInput';
import { useResetUserPassword } from '@/queries/auth/useResetPassword';

const UserPassword = () => {
  const currentPassword = useAuthInput({ name: 'currentPassword' });
  const newPassword = useAuthInput({ name: 'newPassword' });
  const passwordConfirm = useAuthInput({
    name: 'passwordConfirm',
    password: newPassword.value,
  });

  const { mutate: resetUserPassword } = useResetUserPassword();

  const isFormValid = () => {
    return (
      currentPassword.isValid && newPassword.isValid && passwordConfirm.isValid
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetUserPassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });
  };

  return (
    <div>
      <FormHeader title="비밀번호 변경" isConfigButton />

      <h1 className="title-5-sb mx-auto mt-10 max-w-[335px]">
        새로운 비밀번호를 입력해주세요.
      </h1>

      <div className="mx-auto mt-6 flex max-w-[335px] justify-center">
        <form onSubmit={handleSubmit} className="w-full">
          <AuthPassword
            name="currentPassword"
            value={currentPassword.value}
            isValid={currentPassword.isValid}
            important
            onChange={currentPassword.handleChange}
          />

          <AuthPassword
            name="newPassword"
            value={newPassword.value}
            isValid={newPassword.isValid}
            important
            onChange={newPassword.handleChange}
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
            className="mt-[176px]"
            disabled={!isFormValid()}
          />
        </form>
      </div>
    </div>
  );
};

export default UserPassword;
