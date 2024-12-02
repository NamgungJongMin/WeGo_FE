import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import FormHeader from './FormHeader';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/assets/icons/back.svg', () => {
  const MockedIcon = () => <div>back-icon</div>;
  return MockedIcon;
});

describe('FormHeader', () => {
  const mockRouter = {
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('타이틀이 올바르게 렌더링되어야 합니다', () => {
    const title = 'Test Title';
    render(<FormHeader title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('SVG 뒤로가기 버튼이 올바르게 렌더링되어야 합니다', () => {
    render(<FormHeader title="Test Title" />);
    expect(screen.getByText('back-icon')).toBeInTheDocument();
  });

  it('뒤로가기 버튼을 클릭했을 때, router.back이 호출되어야 합니다', () => {
    render(<FormHeader title="Test Title" />);
    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
