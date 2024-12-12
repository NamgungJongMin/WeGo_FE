import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';
import MainNavigation from './MainNavigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MainNavigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('현재 경로에 따라 네비게이션을 렌더링하지 않는다 (login, signup, write, chat 제외)', () => {
    // 로그인 페이지 경로로 설정
    (usePathname as jest.Mock).mockReturnValue('/login');
    render(<MainNavigation />);
    expect(screen.queryByRole('navigation')).toBeNull();

    // 회원가입 페이지 경로로 설정
    (usePathname as jest.Mock).mockReturnValue('/signup');
    render(<MainNavigation />);
    expect(screen.queryByRole('navigation')).toBeNull();

    // 글쓰기 페이지 경로로 설정
    (usePathname as jest.Mock).mockReturnValue('/write');
    render(<MainNavigation />);
    expect(screen.queryByRole('navigation')).toBeNull();

    // 채팅 페이지 제외 경로로 설정
    (usePathname as jest.Mock).mockReturnValue('/chat/some-id');
    render(<MainNavigation />);
    expect(screen.queryByRole('navigation')).toBeNull();
  });

  it('기본 페이지에서 네비게이션이 올바르게 렌더링된다', () => {
    // 홈 페이지 경로로 설정
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<MainNavigation />);

    // 네비게이션 바 렌더링 확인
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // 각 NavLink가 올바르게 렌더링되는지 확인
    expect(screen.getByText('여행리뷰')).toBeInTheDocument();
    expect(screen.getByText('여행찾기')).toBeInTheDocument();
    expect(screen.getByText('채팅')).toBeInTheDocument();
    expect(screen.getByText('메인')).toBeInTheDocument();
  });
});
