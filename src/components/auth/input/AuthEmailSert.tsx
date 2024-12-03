import { useCallback, memo, useState } from 'react';

import { useAuthInput } from '@/hooks/useAuthInput';
import AuthText from './AuthText';

// TODO: 추후 button 컴포넌트로 대체
const EmailVerifyButton = memo(({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    className="mt-[6px] h-11 w-[101px] rounded-[4px] bg-black text-sm text-white"
    onClick={onClick}
  >
    인증
  </button>
));

EmailVerifyButton.displayName = 'EmailVerifyButton';

const AuthEmailSert = memo(() => {
  const [viewEmailCode, setViewEmailCode] = useState(false);
  const email = useAuthInput({ name: 'email' });
  const emailCode = useAuthInput({ name: 'emailCode' });

  const handleVerifyClick = useCallback(() => {
    setViewEmailCode(true);
  }, []);

  return (
    <>
      <AuthText
        type="email"
        name="email"
        value={email.value}
        isValid={email.isValid}
        onChange={email.handleChange}
        className="mb-6"
        size="withButton"
      >
        <EmailVerifyButton onClick={handleVerifyClick} />
      </AuthText>

      <AuthText
        type="email"
        name="emailCode"
        value={emailCode.value}
        isValid={emailCode.isValid}
        onChange={emailCode.handleChange}
        className="-mt-3 mb-6"
        classNameCondition={{
          hidden: !viewEmailCode,
        }}
      />
    </>
  );
});

AuthEmailSert.displayName = 'AuthEmailSert';

export default AuthEmailSert;
