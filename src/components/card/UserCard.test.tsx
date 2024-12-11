import '@testing-library/jest-dom';
import mockUser from '@/mocks/data/user/userList.json';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  const user = mockUser[0];
  it('사용자 프로필 정보를 렌더링합니다', async () => {
    render(
      <UserCard
        nickname={user.nickname}
        profileImage={user.profileImage}
        openTravelCount={user.openTravelCount}
        reviewCount={user.reviewCount}
        hashTags={user.hashTags}
      />,
    );
    // 1. 닉네임이 렌더링되는지 확인
    expect(screen.getByText('녹차라떼')).toBeInTheDocument();

    // 2. 프로필 이미지가 렌더링되는지 확인 (next이미지)
    const profileImage = await screen.findByAltText('녹차라떼의 프로필 이미지');
    expect(profileImage).toBeInTheDocument();

    // 3. openTravelCount와 reviewCount가 렌더링되는지 확인
    expect(screen.getByText('모임장 11회 • 리뷰 25개')).toBeInTheDocument();

    // 4. '상세해요' 태그 렌더링되는지 확인
    expect(screen.getByText('상세해요')).toBeInTheDocument();

    // 5. 링크가 올바르게 설정되는지 확인
    const link = screen.getByRole('link', { name: '녹차라떼 프로필 보기' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
