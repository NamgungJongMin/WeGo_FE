import '@testing-library/jest-dom';
import mockUser from '@/mocks/user/popularUser.json';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

// {
//   "profileImage": "/user.jpg",
//   "nickname": "녹차라떼",
//   "openTravelCount": 11,
//   "reviewCount": 25
// },

describe('UserCard', () => {
  it('사용자 프로필 정보를 렌더링합니다', () => {
    render(
      <UserCard
        nickname={mockUser[0].nickname}
        profileImage={mockUser[0].profileImage}
        openTravelCount={mockUser[0].openTravelCount}
        reviewCount={mockUser[0].reviewCount}
      />,
    );
    // 1. 닉네임이 렌더링되는지 확인
    expect(screen.getByText('녹차라떼')).toBeInTheDocument();

    // 2. 프로필 이미지가 렌더링되는지 확인 (next이미지)
    const profileImage = screen.getByAltText('녹차라떼의 프로필 사진');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fuser.jpg&w=128&q=75',
    );

    // 3. openTravelCount와 reviewCount가 렌더링되는지 확인
    expect(screen.getByText('모임장 11회 • 리뷰 25개')).toBeInTheDocument();

    // 4. '상세해요' 태그 렌더링되는지 확인
    expect(screen.getByText('상세해요')).toBeInTheDocument();

    // 5. 링크가 올바르게 설정되는지 확인
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');

    // 6. aria-label이 적용된 링크를 확인
    const label = screen.getByLabelText('녹차라떼 프로필 보기');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('href', '/');
  });
});
