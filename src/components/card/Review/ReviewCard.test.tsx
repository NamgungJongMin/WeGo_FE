import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewCard from './ReviewCard';

describe('리뷰 카드 컴포넌트', () => {
  const props = {
    reviewId: 1,
    profileImage: '/user.jpg',
    image: '/test.png',
    title: '테스트 리뷰',
    content: '이것은 테스트 리뷰 내용입니다.',
    score: 4.5,
    travelLocation: '서울',
    createdAt: '2023-10-10',
    isLiked: false,
  };

  it('리뷰 카드가 올바르게 렌더링되어야 합니다 (리뷰 페이지)', () => {
    render(<ReviewCard {...props} nickname="테스터" />);

    expect(screen.getByText('테스트 리뷰')).toBeInTheDocument();
    expect(
      screen.getByText('이것은 테스트 리뷰 내용입니다.'),
    ).toBeInTheDocument();
    expect(screen.getByText('테스터')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('리뷰 카드가 올바르게 렌더링되어야 합니다 (마이페이지)', () => {
    render(<ReviewCard {...props} />);

    expect(screen.getByText('테스트 리뷰')).toBeInTheDocument();
    expect(
      screen.getByText('이것은 테스트 리뷰 내용입니다.'),
    ).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
  });

  it('이미지가 올바르게 표시되어야 합니다', () => {
    render(<ReviewCard {...props} />);

    const image = screen.getByAltText('테스트 리뷰');
    expect(image).toBeInTheDocument();
  });
});
