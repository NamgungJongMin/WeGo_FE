import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from './Textarea';

describe('Textarea 컴포넌트', () => {
  it('기본 렌더링이 정상적으로 되어야 한다', () => {
    render(<Textarea name="testTextarea" value="" onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeInTheDocument();
  });

  it('placeholder가 정상적으로 표시되어야 한다', () => {
    const placeholder = '내용을 입력하세요';
    render(
      <Textarea
        name="testTextarea"
        value=""
        placeholder={placeholder}
        onChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('value가 변경되면 onChange 핸들러가 호출되어야 한다', () => {
    const handleChange = jest.fn();
    render(<Textarea name="testTextarea" value="" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '테스트 입력' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('maxLength 제한이 적용되어야 한다', () => {
    const maxLength = 10;
    render(
      <Textarea
        name="testTextarea"
        value=""
        maxLength={maxLength}
        onChange={() => {}}
      />,
    );
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('maxLength', maxLength.toString());
  });

  it('size variant가 정상적으로 적용되어야 한다', () => {
    render(
      <Textarea
        name="testTextarea"
        value=""
        size="small"
        onChange={() => {}}
      />,
    );
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveClass('w-[295px]');
  });

  it('추가 className이 정상적으로 적용되어야 한다', () => {
    const additionalClass = 'test-class';
    const additionalClassCondition = {
      'test-class-true': true,
      'test-class-false': false,
    };
    render(
      <Textarea
        name="testTextarea"
        value=""
        className={additionalClass}
        classNameCondition={additionalClassCondition}
        onChange={() => {}}
      />,
    );
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveClass(additionalClass);
    expect(textarea).toHaveClass('test-class-true');
    expect(textarea).not.toHaveClass('test-class-false');
  });

  it('value 길이를 표시하는 텍스트가 정상적으로 동작해야 한다', () => {
    render(
      <Textarea
        name="testTextarea"
        value="12345"
        maxLength={10}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText('5/10')).toBeInTheDocument();
  });
});
