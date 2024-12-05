import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';

const mockReview = {
  reviewId: 123,
  nickname: 'testuser',
  reviewImage: 'https://example.com/image.jpg',
};

describe('ReviewCard', () => {
  it('리뷰 정보를 렌더링합니다', () => {
    render(
      <ReviewCard
        reviewId={mockReview.reviewId}
        nickname={mockReview.nickname}
        reviewImage={mockReview.reviewImage}
      />,
    );

    // 이미지와 닉네임이 잘 렌더링되는지 확인
    const image = screen.getByAltText(
      `${mockReview.nickname}의 여행 후기 사진`,
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'alt',
      `${mockReview.nickname}의 여행 후기 사진`,
    );

    const nicknameText = screen.getByText(`@${mockReview.nickname}`);
    expect(nicknameText).toBeInTheDocument();

    // 링크가 제대로 작동하는지 확인
    const reviewLink = screen.getByRole('link', {
      name: `${mockReview.nickname}의 여행 후기 사진`,
    });
    expect(reviewLink).toHaveAttribute('href', `/${mockReview.reviewId}`);
  });
});
