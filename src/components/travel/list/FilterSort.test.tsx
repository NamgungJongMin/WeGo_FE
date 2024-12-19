import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import FilterSort from './FilterSort';

describe('TravelFilter', () => {
  it('정렬 아이콘을 렌더링 한다', async () => {
    render(<FilterSort />);

    const button = screen.getByLabelText('여행 리스트 정렬 버튼');
    expect(button).toBeInTheDocument();
  });

  it('옵션 목록을 표시한다', () => {
    render(<FilterSort />);
    const button = screen.getByLabelText('여행 리스트 정렬 버튼');
    fireEvent.click(button);
    const latestOption = screen.getByText('최신순');
    const popularOption = screen.getByText('인기순');
    const registrationEndOption = screen.getByText('마감임박');
    expect(latestOption).toBeInTheDocument();
    expect(popularOption).toBeInTheDocument();
    expect(registrationEndOption).toBeInTheDocument();
  });
});
