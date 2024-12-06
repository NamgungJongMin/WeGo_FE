import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  AUTH_LABEL,
  AUTH_ERROR_MESSAGE,
  AUTH_PLACEHOLDER,
} from '@/constants/auth';
import AuthPassword from './AuthPassword';

describe('AuthPassword', () => {
  it('기본 렌더링이 정상적으로 되어야 한다', () => {
    render(
      <AuthPassword
        name="password"
        value=""
        isValid={null}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText(AUTH_LABEL.password)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.password),
    ).toBeInTheDocument();
  });

  it('important가 true일 때 별표가 표시되어야 한다', () => {
    render(
      <AuthPassword
        name="password"
        value=""
        isValid={null}
        important
        onChange={() => {}}
      />,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('입력값 변경이 정상적으로 동작해야 한다', () => {
    const handleChange = jest.fn();
    render(
      <AuthPassword
        name="password"
        value=""
        isValid={null}
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText(AUTH_PLACEHOLDER.password);
    input.focus();
    input.blur();

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('유효성 검사 실패 시 에러 메시지가 표시되어야 한다', () => {
    render(
      <AuthPassword
        name="password"
        value="invalid"
        isValid={false}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText(AUTH_ERROR_MESSAGE.password)).toBeInTheDocument();
  });

  it('유효성 검사 성공 시 에러 메시지가 표시되지 않아야 한다', () => {
    render(
      <AuthPassword
        name="password"
        value="validPass123"
        isValid
        onChange={() => {}}
      />,
    );

    expect(
      screen.queryByText(AUTH_ERROR_MESSAGE.password),
    ).not.toBeInTheDocument();
  });

  it('비밀번호 확인 필드가 정상적으로 렌더링되어야 한다', () => {
    render(
      <AuthPassword
        name="passwordConfirm"
        value=""
        isValid={null}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText(AUTH_LABEL.passwordConfirm)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(AUTH_PLACEHOLDER.passwordConfirm),
    ).toBeInTheDocument();
  });

  it('유효성 상태에 따라 적절한 스타일이 적용되어야 한다', () => {
    const { rerender } = render(
      <AuthPassword
        name="password"
        value="validPass123"
        isValid
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText(AUTH_PLACEHOLDER.password);
    expect(input).toHaveClass('border-label-normal');

    rerender(
      <AuthPassword
        name="password"
        value="invalid"
        isValid={false}
        onChange={() => {}}
      />,
    );

    expect(input).toHaveClass('border-status-error');
  });

  it('비밀번호 입력 필드의 type이 password여야 한다', () => {
    render(
      <AuthPassword
        name="password"
        value=""
        isValid={null}
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText(AUTH_PLACEHOLDER.password);
    expect(input).toHaveAttribute('type', 'password');
  });
});
