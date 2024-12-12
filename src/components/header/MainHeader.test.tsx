import { render, screen, fireEvent, act } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';
import MainHeader from './MainHeader';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MainHeader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('초기 상태를 렌더링합니다', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<MainHeader />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const logoLink = screen.getByLabelText('WEGO 로고');
    expect(logoLink).toBeInTheDocument();
  });

  it('스크롤하면 로고와 배경이 변경됩니다', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<MainHeader />);

    fireEvent.scroll(window, { target: { scrollY: 300 } });
    const logoLink = screen.getByLabelText('WEGO 로고');
    expect(logoLink).toBeInTheDocument();
    const logoIcon = logoLink.querySelector('svg');
    expect(logoIcon).toHaveClass('text-label-normal');
  });

  it('스크롤 위치에 따라 올바른 아이콘을 표시합니다', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<MainHeader />);
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 300 } });
    });

    const writeLink = screen.getByLabelText('모임 만들기');
    const svgIcon = writeLink.querySelector('svg');
    const mypageLink = screen.getByLabelText('마이페이지로 가기');
    const mypageIcon = writeLink.querySelector('svg');

    expect(writeLink).toBeInTheDocument();
    expect(mypageLink).toBeInTheDocument();

    expect(svgIcon).toHaveClass('text-label-normal');
    expect(mypageIcon).toHaveClass('text-label-normal');
  });
});
