import FormHeader from '@/components/common/formheader/FormHeader';

const ResetPasswordLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <FormHeader title="비밀번호 변경" />

      <h1 className="title-5-sb mx-auto mt-10 max-w-[335px]">
        새로운 비밀번호를 입력해주세요.
      </h1>
      {children}
    </div>
  );
};

export default ResetPasswordLayout;
