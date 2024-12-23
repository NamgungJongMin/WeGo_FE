import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckMarkButton from './CheckMarkButton';

describe('체크마크 버튼 컴포넌트', () => {
  const handler = jest.fn();

  it('버튼이 클릭되면 핸들러가 호출되어야 합니다', () => {
    render(<CheckMarkButton handler={handler} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('isChecked가 true일 때 체크마크가 표시되어야 합니다', () => {
    render(<CheckMarkButton isChecked handler={handler} />);

    const checkMark = screen.getByTestId('check-mark');
    expect(checkMark).toHaveAttribute('fill', '#fff');
  });

  it('isChecked가 false일 때 체크마크가 투명해야 합니다', () => {
    render(<CheckMarkButton isChecked={false} handler={handler} />);

    const checkMark = screen.getByTestId('check-mark');
    expect(checkMark).toHaveAttribute('fill', 'transparent');
  });
});
