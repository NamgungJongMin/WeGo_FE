import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TextareaWithLabel from './TextareaWithLabel';

describe('TextareaWithLabel 컴포넌트', () => {
  it('레이블과 텍스트 영역이 정상적으로 렌더링되어야 한다', () => {
    render(
      <TextareaWithLabel
        label="설명"
        name="description"
        value=""
        onChange={() => {}}
      />,
    );

    const label = screen.getByText('설명');
    const textarea = screen.getByLabelText('설명');

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
  });

  it('React 엘리먼트가 포함된 label이 정상적으로 렌더링되어야 한다', () => {
    render(
      <TextareaWithLabel
        label={
          <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
            Email
          </span>
        }
        name="email"
        value=""
        onChange={() => {}}
      />,
    );

    const labelElement = screen.getByText('Email');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('after:ml-0.5 after:text-red-500');
  });

  it('srOnly가 true일 경우 label에 sr-only 클래스가 적용되어야 한다', () => {
    const label = '숨겨진 레이블';
    render(
      <TextareaWithLabel
        label={label}
        srOnly
        name="testTextarea"
        value=""
        onChange={() => {}}
      />,
    );

    const hiddenLabel = screen.getByText(label);
    expect(hiddenLabel).toHaveClass('sr-only');
  });
});
