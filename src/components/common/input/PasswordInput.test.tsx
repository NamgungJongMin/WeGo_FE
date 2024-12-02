import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from './PasswordInput';

jest.mock('@/assets/pw_open.svg', () => {
  const MockedIcon = () => <div>pw-open-icon</div>;
  return MockedIcon;
});

jest.mock('@/assets/pw_close.svg', () => {
  const MockedIcon = () => <div>pw-close-icon</div>;
  return MockedIcon;
});

describe('PasswordInput', () => {
  const placeholder = '비밀번호를 입력해주세요.';

  it('기본 렌더링이 정상적으로 되어야 한다', () => {
    render(
      <PasswordInput
        name="password"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
      />,
    );
    const input = screen.getByPlaceholderText(placeholder);

    expect(input).toBeInTheDocument();
  });

  it('placeholder가 정상적으로 표시되어야 한다', () => {
    render(
      <PasswordInput
        name="password"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('value가 변경되면 onChange 핸들러가 호출되어야 한다', () => {
    const handleChange = jest.fn();
    render(
      <PasswordInput
        name="password"
        placeholder={placeholder}
        value=""
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'test123' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('maxLength 제한이 적용되어야 한다', () => {
    render(
      <PasswordInput
        name="password"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute(
      'maxLength',
      '15',
    );
  });

  it('type이 password로 설정되어야 한다', () => {
    render(
      <PasswordInput
        name="password"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('추가 className이 정상적으로 적용되어야 한다', () => {
    const additionalClass = 'test-class';
    render(
      <PasswordInput
        name="password"
        placeholder={placeholder}
        value=""
        className={additionalClass}
        onChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toHaveClass(
      additionalClass,
    );
  });
});
