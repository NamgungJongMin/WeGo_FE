import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/common/button/Button';
import Link from 'next/link';
import Logo from '@/assets/icon/auth/logo_login.svg';

const Login = () => {
  return (
    <div className="mx-5 flex flex-col items-center">
      <div className="mx-auto max-w-[335px]">
        <h1 className="title-1-eb mb-2 mt-[60px] w-full text-label-normal">
          <p className="mb-2.5 flex items-center">
            <Logo aria-label="위고 앱 로고" className="inline-block" /> 에
          </p>
          <p>오신 것을 환영해요!</p>
        </h1>

        <p className="body-2-r text-label-neutral">
          <span className="body-2-sb text-primary-normal">WEGO</span> 에
          로그인하고 함께하는 여행의 재미를 즐겨보세요!
        </p>

        <div className="mt-11 flex flex-col justify-between">
          <LoginForm />

          <Link href="/signup">
            <Button fill="white" label="회원가입" />
          </Link>

          <div className="mt-6 flex justify-center divide-x text-sm">
            <Link href="/preparing" className="pr-2.5 text-label-alternative">
              아이디 찾기
            </Link>
            <Link
              href="/findPassword"
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
