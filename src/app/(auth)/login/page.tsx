import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/common/button/Button';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="mx-5 flex flex-col items-center">
      <div className="mx-auto max-w-[335px]">
        <h1 className="my-[60px] mb-10 w-full text-3xl font-bold">
          WE&apos;GO에
          <br />
          오신 것을 환영해요!
        </h1>

        <div className="flex flex-col justify-between">
          <LoginForm />

          <Link href="/signup">
            <Button fill="white" label="회원가입" />
          </Link>

          <div className="mt-6 flex justify-center divide-x text-sm">
            <Link href="/find-id" className="pr-2.5 text-label-alternative">
              아이디 찾기
            </Link>
            <Link
              href="/find-password"
              className="px-2.5 text-label-alternative"
            >
              비밀번호 찾기
            </Link>
            <Link href="/" className="pl-2.5 text-primary-normal underline">
              둘러보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
