import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthText from './AuthText';

describe('AuthText', () => {
  it('기본 렌더링이 정상적으로 되어야 한다', () => {
    render(
      <AuthText
        type="text"
        name="email"
        value=""
        isValid={null}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText('이메일(아이디)')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('emailCode인 경우 라벨이 숨겨져야 한다', () => {
    render(
      <AuthText
        type="text"
        name="emailCode"
        value=""
        isValid={null}
        onChange={() => {}}
      />,
    );

    const label = screen.getByText('인증 번호');
    expect(label).toHaveClass('sr-only');
  });

  it('important가 true일 때 별표가 표시되어야 한다', () => {
    render(
      <AuthText
        type="text"
        name="email"
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
      <AuthText
        type="text"
        name="email"
        value=""
        isValid={null}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('유효성 검사 실패 시 에러 메시지가 표시되어야 한다', () => {
    render(
      <AuthText
        type="text"
        name="email"
        value="invalid"
        isValid={false}
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByText('올바른 이메일 형식을 입력해주세요.'),
    ).toBeInTheDocument();
  });

  it('이메일 인증 성공 시 성공 메시지가 표시되어야 한다', () => {
    render(
      <AuthText
        type="text"
        name="emailCode"
        value="123456"
        isValid
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByText('이메일 인증이 완료되었습니다.'),
    ).toBeInTheDocument();
  });

  it('disabled 상태가 정상적으로 적용되어야 한다', () => {
    render(
      <AuthText
        type="text"
        name="email"
        value=""
        isValid={null}
        disabled
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('maxLength가 정상적으로 적용되어야 한다', () => {
    render(
      <AuthText
        type="text"
        name="emailCode"
        value=""
        isValid={null}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '6');
  });

  it('children이 있을 경우 정상적으로 렌더링되어야 한다', () => {
    render(
      <AuthText
        type="text"
        name="email"
        value=""
        isValid={null}
        onChange={() => {}}
      >
        <button type="button">테스트 버튼</button>
      </AuthText>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('유효성 상태에 따라 적절한 스타일이 적용되어야 한다', () => {
    const { rerender } = render(
      <AuthText
        type="text"
        name="email"
        value="test"
        isValid
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveClass('border-line-strong');

    rerender(
      <AuthText
        type="text"
        name="email"
        value="test"
        isValid={false}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveClass('border-status-error');
  });
});
