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

  it('state에 따라 레이블의 클래스가 정해져야 한다', () => {
    render(
      <TextareaWithLabel
        label="srOnly"
        state="srOnly"
        name="srOnly"
        value=""
        onChange={() => {}}
      />,
    );
    render(
      <TextareaWithLabel
        label="required"
        state="required"
        name="required"
        value=""
        onChange={() => {}}
      />,
    );

    const srOnlyLabel = screen.getByText('srOnly');
    const requiredLabel = screen.getByText('required');
    expect(srOnlyLabel).toHaveClass('sr-only');
    expect(requiredLabel).toHaveClass("after:content-['*']");
  });
});
