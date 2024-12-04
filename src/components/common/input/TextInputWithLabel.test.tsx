import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TextInputWithLabel from './TextInputWithLabel';

describe('TextInputWithLabel 컴포넌트', () => {
  it('label이 정상적으로 렌더링되어야 한다', () => {
    const label = 'Username';
    render(
      <TextInputWithLabel
        label={label}
        name="username"
        type="text"
        value=""
        onChange={() => {}}
      />,
    );

    const renderedLabel = screen.getByText(label);
    const input = screen.getByRole('textbox');
    expect(renderedLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('srOnly가 true일 경우 label에 sr-only 클래스가 적용되어야 한다', () => {
    render(
      <TextInputWithLabel
        label="Username"
        srOnly
        name="username"
        type="text"
        value=""
        onChange={() => {}}
      />,
    );

    const hiddenLabel = screen.getByText('Username');
    expect(hiddenLabel).toHaveClass('sr-only');
  });

  it('children이 전달되면 아이콘이 렌더링되어야 한다', () => {
    const icon = <svg data-testid="icon" />;
    render(
      <TextInputWithLabel
        label="Search"
        name="search"
        type="text"
        value=""
        onChange={() => {}}
      >
        {icon}
      </TextInputWithLabel>,
    );

    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('placeholder 상태에 따라 children을 변경해야 한다', () => {
    const icon = <svg data-testid="icon" />;
    render(
      <TextInputWithLabel
        label="Email"
        name="email"
        type="text"
        value=""
        placeholder="Enter your email"
        onChange={() => {}}
      >
        {icon}
      </TextInputWithLabel>,
    );
    const input = screen.getByRole('textbox');
    const placeholderIcon = screen.getByTestId('icon').parentElement;
    expect(input).toHaveClass('peer');
    expect(placeholderIcon).toHaveClass(
      'peer-placeholder-shown:text-label-alternative',
    );
    expect(placeholderIcon).toHaveClass('peer-focus:text-label-normal');
  });
});
