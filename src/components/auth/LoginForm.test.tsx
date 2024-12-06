import '@testing-library/jest-dom';
import { server } from '@/mocks/server';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FAKE_USER_EMAIL, FAKE_USER_PASSWORD } from '@/mocks/data/auth/auth';
import { AUTH_ERROR_MESSAGE, AUTH_PLACEHOLDER } from '@/constants/auth';
import LoginForm from './LoginForm';

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

const renderLoginForm = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>,
  );
};

describe('LoginForm', () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    mockPush.mockClear();
  });
  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  it('이메일과 비밀번호 입력 필드가 렌더링되어야 합니다', () => {
    renderLoginForm();

    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.email),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.password),
    ).toBeInTheDocument();
  });

  it('유효하지 않은 이메일 형식을 입력하면 에러 메시지가 표시되어야 합니다', async () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText(AUTH_PLACEHOLDER.email);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(screen.getByText(AUTH_ERROR_MESSAGE.email)).toBeInTheDocument();
    });
  });

  it('유효하지 않은 비밀번호 형식을 입력하면 에러 메시지가 표시되어야 합니다', async () => {
    renderLoginForm();

    const passwordInput = screen.getByPlaceholderText(
      AUTH_PLACEHOLDER.password,
    );
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    await waitFor(() => {
      expect(screen.getByText(AUTH_ERROR_MESSAGE.password)).toBeInTheDocument();
    });
  });

  it('로그인 성공 시 홈페이지로 리다이렉트되어야 합니다', async () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText(AUTH_PLACEHOLDER.email);
    const passwordInput = screen.getByPlaceholderText(
      AUTH_PLACEHOLDER.password,
    );
    const form = screen.getByTestId('login-form');

    // 이메일 입력 및 유효성 검사 강제 설정
    fireEvent.change(emailInput, { target: { value: FAKE_USER_EMAIL } });
    fireEvent.blur(emailInput); // blur 이벤트 발생

    // 비밀번호 입력 및 유효성 검사 강제 설정
    fireEvent.change(passwordInput, { target: { value: FAKE_USER_PASSWORD } });
    fireEvent.blur(passwordInput); // blur 이벤트 발생

    // 유효성 검사 완료 대기
    await waitFor(() => {
      expect(emailInput).toHaveValue(FAKE_USER_EMAIL);
      expect(passwordInput).toHaveValue(FAKE_USER_PASSWORD);
    });

    // 에러 메시지가 없는지 확인
    expect(
      screen.queryByText(AUTH_ERROR_MESSAGE.email),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(AUTH_ERROR_MESSAGE.password),
    ).not.toBeInTheDocument();

    // 폼 제출
    fireEvent.submit(form);

    // 리다이렉션 확인
    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/');
      },
      { timeout: 3000 },
    );
  });
});
