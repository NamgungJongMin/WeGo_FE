import SignupForm from '@/components/auth/SignupForm';
import FormHeader from '@/components/common/formheader/FormHeader';
import Link from 'next/link';

const Signup = () => {
  return (
    <div>
      <FormHeader title="회원가입" />

      <div className="mx-auto mt-10 flex max-w-[335px] justify-center">
        <SignupForm />
      </div>

      <div className="mb-[50px] mt-6 flex justify-center text-sm">
        <span className="text-gray-400">이미 회원이신가요?</span>
        <Link href="/login" className="ml-[6px] text-primary-normal underline">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default Signup;
