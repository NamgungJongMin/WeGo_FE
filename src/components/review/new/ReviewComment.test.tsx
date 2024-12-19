import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReviewComment from './ReviewComment';

describe('ReviewComment', () => {
  it('리뷰 작성칸을 렌더링합니다', () => {
    render(<ReviewComment />);

    expect(
      screen.getByText('여행에 대한 후기를 남겨주세요!'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('최대 20자 입력 가능 textarea'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('여행 제목을 입력해 주세요.'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('최대 100자 입력 가능 textarea'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('여행에 대한 다양한 후기를 공유해 주세요!'),
    ).toBeInTheDocument();
  });
});
