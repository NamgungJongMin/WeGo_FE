import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReviewCardAddText from './ReviewCardAddText';

const mockReveiwAndText = {
  nickname: '녹차',
  reviewImage: 'https://example.com/image.jpg',
  content: '맛있는 녹차',
  score: 5,
};

describe('ReviewCardAddText', () => {
  it('여행리뷰 정보를 렌더링 합니다', () => {
    render(
      <ReviewCardAddText
        nickname={mockReveiwAndText.nickname}
        reviewImage={mockReveiwAndText.reviewImage}
        content={mockReveiwAndText.content}
        score={mockReveiwAndText.score}
      />,
    );

    // 이미지가 렌더링되는지 확인
    const image = screen.getByAltText(
      `${mockReveiwAndText.nickname}의 여행리뷰 이미지`,
    );
    expect(image).toBeInTheDocument();

    // 닉네임
    const nicknameText = screen.getByText(`${mockReveiwAndText.nickname}`);
    expect(nicknameText).toBeInTheDocument();

    // 점수와 내용
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('맛있는 녹차')).toBeInTheDocument();
  });
});
