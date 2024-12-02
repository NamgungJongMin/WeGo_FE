import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput 컴포넌트', () => {
  it('기본 렌더링이 정상적으로 되어야 한다', () => {
    render(
      <TextInput type="text" name="testInput" value="" onChange={() => {}} />,
    );
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('placeholder가 정상적으로 표시되어야 한다', () => {
    const placeholder = '텍스트를 입력하세요';
    render(
      <TextInput
        type="text"
        name="testInput"
        value=""
        placeholder={placeholder}
        onChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('value가 변경되면 onChange 핸들러가 호출되어야 한다', () => {
    const handleChange = jest.fn();
    render(
      <TextInput
        type="text"
        name="testInput"
        value=""
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '테스트 입력' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('maxLength 제한이 적용되어야 한다', () => {
    const maxLength = 10;
    render(
      <TextInput
        type="text"
        name="testInput"
        value=""
        maxLength={maxLength}
        onChange={() => {}}
      />,
    );
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('maxLength', maxLength.toString());
  });

  it('size variant가 정상적으로 적용되어야 한다', () => {
    render(
      <TextInput
        type="text"
        name="testInput"
        value=""
        size="withButton"
        onChange={() => {}}
      />,
    );
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('w-[218px]');
  });

  it('추가 className이 정상적으로 적용되어야 한다', () => {
    const additionalClass = 'test-class';
    render(
      <TextInput
        type="text"
        name="testInput"
        value=""
        className={additionalClass}
        onChange={() => {}}
      />,
    );
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(additionalClass);
  });
});
