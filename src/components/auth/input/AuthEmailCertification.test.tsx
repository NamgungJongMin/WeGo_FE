import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/mocks/server';
import {
  AUTH_LABEL,
  AUTH_PLACEHOLDER,
  AUTH_SUCCESS_MESSAGE,
} from '@/constants/auth';
import { useState } from 'react';
import { FAKE_EMAIL_CODE } from '@/mocks/data/auth/auth';
import AuthEmailCertification from './AuthEmailCertification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

describe('AuthEmailCertification', () => {
  it('기본 이메일 입력 필드가 렌더링되어야 한다', () => {
    renderWithClient(
      <AuthEmailCertification
        email={{
          value: '',
          isValid: null,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        emailCode={{
          value: '',
          isValid: null,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        isEmailCertified={false}
        setIsEmailCertified={jest.fn()}
        setCertifiedToken={jest.fn()}
      />,
    );

    expect(screen.getByText(AUTH_LABEL.email)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.email),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '인증' })).toBeInTheDocument();
  });

  it('이메일이 유효하지 않으면 인증 버튼이 비활성화되어야 한다', () => {
    renderWithClient(
      <AuthEmailCertification
        email={{
          value: '',
          isValid: false,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        emailCode={{
          value: '',
          isValid: null,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        isEmailCertified={false}
        setIsEmailCertified={jest.fn()}
        setCertifiedToken={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: '인증' })).toBeDisabled();
  });

  it('인증 버튼 클릭 시 인증코드 입력 필드가 나타나야 한다', async () => {
    renderWithClient(
      <AuthEmailCertification
        email={{
          value: 'test@example.com',
          isValid: true,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        emailCode={{
          value: '',
          isValid: null,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        isEmailCertified={false}
        setIsEmailCertified={jest.fn()}
        setCertifiedToken={jest.fn()}
      />,
    );

    const verifyButton = screen.getByRole('button', { name: '인증' });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(AUTH_PLACEHOLDER.emailCode),
      ).toBeInTheDocument();
    });
  });

  it('인증코드 전송 후 타이머가 시작되어야 한다', async () => {
    renderWithClient(
      <AuthEmailCertification
        email={{
          value: 'test@example.com',
          isValid: true,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        emailCode={{
          value: '',
          isValid: null,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        isEmailCertified={false}
        setIsEmailCertified={jest.fn()}
        setCertifiedToken={jest.fn()}
      />,
    );

    const verifyButton = screen.getByRole('button', { name: '인증' });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(screen.getByText('05:00')).toBeInTheDocument();
    });
  });

  it('인증 완료 후 성공 메시지가 표시되어야 한다', async () => {
    renderWithClient(
      <AuthEmailCertification
        email={{
          value: 'test@example.com',
          isValid: true,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        emailCode={{
          value: '123456',
          isValid: true,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        isEmailCertified
        setIsEmailCertified={jest.fn()}
        setCertifiedToken={jest.fn()}
      />,
    );

    expect(
      screen.getByText(AUTH_SUCCESS_MESSAGE.emailCode, {
        selector: 'span.text-status-infomative',
      }),
    ).toBeInTheDocument();
  });

  // TODO: 디자이너 작업 후 추가할 테스트

  // it('인증 시간 초과 시 메시지가 표시되어야 한다', async () => {
  //   renderWithClient(
  //     <AuthEmailCertification
  //       email={{
  //         value: 'test@example.com',
  //         isValid: true,
  //         setValue: jest.fn(),
  //         setIsValid: jest.fn(),
  //         handleChange: jest.fn(),
  //       }}
  //       emailCode={{
  //         value: '',
  //         isValid: null,
  //         setValue: jest.fn(),
  //         setIsValid: jest.fn(),
  //         handleChange: jest.fn(),
  //       }}
  //       isEmailCertified={false}
  //       setIsEmailCertified={jest.fn()}
  //       setCertifiedToken={jest.fn()}
  //     />,
  //   );

  //   const verifyButton = screen.getByRole('button', { name: '인증' });
  //   fireEvent.click(verifyButton);

  //   await waitFor(() => {
  //     const codeInput = screen.getByPlaceholderText(AUTH_PLACEHOLDER.emailCode);
  //     expect(codeInput).toBeInTheDocument();
  //   });

  //   // 타이머가 만료되면 메시지가 변경어야 함
  //   jest.advanceTimersByTime(300000); // 5분 경과

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText('인증 시간이 초과되었습니다.'),
  //     ).toBeInTheDocument();
  //   });
  // });

  it('이메일 인증 완료 시 입력 필드들이 비활성화되어야 한다', async () => {
    const TestComponent = () => {
      const [isEmailCertified, setIsEmailCertified] = useState(false);

      return (
        <AuthEmailCertification
          email={{
            value: 'test@example.com',
            isValid: true,
            setValue: jest.fn(),
            setIsValid: jest.fn(),
            handleChange: jest.fn(),
          }}
          emailCode={{
            value: String(FAKE_EMAIL_CODE),
            isValid: true,
            setValue: jest.fn(),
            setIsValid: jest.fn(),
            handleChange: jest.fn(),
          }}
          isEmailCertified={isEmailCertified}
          setIsEmailCertified={setIsEmailCertified}
          setCertifiedToken={jest.fn()}
        />
      );
    };
    renderWithClient(<TestComponent />);

    const verifyButton = screen.getByRole('button', { name: '인증' });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      const codeInput = screen.getByPlaceholderText(AUTH_PLACEHOLDER.emailCode);
      expect(codeInput).toBeInTheDocument();
    });

    const confirmButton = await screen.findByRole('button', { name: '확인' });

    await waitFor(() => {
      expect(confirmButton).toBeEnabled();
    });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText(AUTH_PLACEHOLDER.email);
      const codeInput = screen.getByPlaceholderText(AUTH_PLACEHOLDER.emailCode);

      expect(emailInput).toBeDisabled();
      expect(codeInput).toBeDisabled();
      expect(verifyButton).toBeDisabled();
      expect(confirmButton).toBeDisabled();
    });
  });

  it('재전송 버튼 클릭 시 타이머가 리셋되어야 한다', async () => {
    renderWithClient(
      <AuthEmailCertification
        email={{
          value: 'test@example.com',
          isValid: true,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        emailCode={{
          value: '',
          isValid: null,
          setValue: jest.fn(),
          setIsValid: jest.fn(),
          handleChange: jest.fn(),
        }}
        isEmailCertified={false}
        setIsEmailCertified={jest.fn()}
        setCertifiedToken={jest.fn()}
      />,
    );

    const verifyButton = screen.getByRole('button', { name: '인증' });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      const resendButton = screen.getByRole('button', { name: '재전송' });
      fireEvent.click(resendButton);
    });

    await waitFor(() => {
      expect(screen.getByText('05:00')).toBeInTheDocument();
    });
  });
});
