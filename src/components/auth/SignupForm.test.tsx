import '@testing-library/jest-dom';
import { server } from '@/mocks/server';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AUTH_ERROR_MESSAGE, AUTH_PLACEHOLDER } from '@/constants/auth';
import SignupForm from './SignupForm';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
      replace: jest.fn(),
    };
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderSignupForm = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <SignupForm />
    </QueryClientProvider>,
  );
};

describe('SignupForm', () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    mockPush.mockClear();
  });
  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  it('모든 필수 입력 필드가 렌더링되어야 합니다', () => {
    renderSignupForm();

    // 이메일 인증 관련 필드
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.email),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.emailCode),
    ).toBeInTheDocument();

    // 비밀번호 필드
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.password),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.passwordConfirm),
    ).toBeInTheDocument();

    // 개인정보 필드
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.name),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.contact),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.nickname),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.birthDate),
    ).toBeInTheDocument();
  });

  it('유효하지 않은 이메일을 입력하면 에러 메시지가 표시되어야 합니다', async () => {
    renderSignupForm();

    const emailInput = screen.getByPlaceholderText(AUTH_PLACEHOLDER.email);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(screen.getByText(AUTH_ERROR_MESSAGE.email)).toBeInTheDocument();
    });
  });

  it('비밀번호 확인이 일치하지 않으면 에러 메시지가 표시되어야 합니다', async () => {
    renderSignupForm();

    const passwordInput = screen.getByPlaceholderText(
      AUTH_PLACEHOLDER.password,
    );
    const passwordConfirmInput = screen.getByPlaceholderText(
      AUTH_PLACEHOLDER.passwordConfirm,
    );

    fireEvent.change(passwordInput, {
      target: { value: 'asdasd123' },
    });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'different-password' },
    });

    await waitFor(() => {
      expect(
        screen.getByText(AUTH_ERROR_MESSAGE.passwordConfirm),
      ).toBeInTheDocument();
    });
  });
});
