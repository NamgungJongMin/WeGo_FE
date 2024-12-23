import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useGetUser from '@/queries/user/useGetUser';
import ProfileSection from './ProfileSection';

jest.mock('@/queries/user/useGetUser');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('ProfileSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('사용자 정보가 없을 때 기본 프로필 이미지가 렌더링되어야 한다', () => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: {
        profileImage: null,
        nickname: '테스트 사용자',
        email: 'test@example.com',
        description: '테스트 설명',
      },
    });

    renderWithQueryClient(<ProfileSection />);

    expect(screen.getByLabelText('기본 프로필 이미지')).toBeInTheDocument();
    expect(screen.getByText('테스트 사용자')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('테스트 설명')).toBeInTheDocument();
  });

  it('사용자 프로필 이미지가 있을 때 해당 이미지가 렌더링되어야 한다', () => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: {
        profileImage: '/path/to/profile/image.jpg',
        nickname: '테스트 사용자',
        email: 'test@example.com',
        description: '테스트 설명',
      },
    });

    renderWithQueryClient(<ProfileSection />);

    expect(screen.getByAltText('프로필 이미지')).toBeInTheDocument();
    expect(screen.getByText('테스트 사용자')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('테스트 설명')).toBeInTheDocument();
  });

  it('프로필 수정 버튼이 렌더링되어야 한다', () => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: {
        profileImage: null,
        nickname: '테스트 사용자',
        email: 'test@example.com',
        description: '테스트 설명',
      },
    });

    renderWithQueryClient(<ProfileSection />);

    expect(
      screen.getByRole('button', { name: /프로필 수정/i }),
    ).toBeInTheDocument();
  });
});
