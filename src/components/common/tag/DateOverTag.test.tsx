import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DateOverTag from './DateOverTag';

describe('DateOverTag', () => {
  it('마감 태그를 렌더링합니다', () => {
    render(<DateOverTag endAt="2024.12.01" />);
    expect(screen.getByText('마감')).toBeInTheDocument();
  });

  it('오늘마감 태그를 렌더링합니다', () => {
    const today = new Date();
    const todayISOString = today.toISOString().split('T')[0];
    render(<DateOverTag endAt={todayISOString} />);
    const tagElement = screen.getByText('오늘 마감');
    expect(tagElement).toBeInTheDocument();
  });

  it('null을 반환합니다 (endAt이 미래일 때)', () => {
    const endAt = new Date('2025-12-01').toISOString();
    render(<DateOverTag endAt={endAt} />);
    const tagElement = screen.queryByText('오늘 마감');
    expect(tagElement).not.toBeInTheDocument();

    const tagElement2 = screen.queryByText('마감');
    expect(tagElement2).not.toBeInTheDocument();
  });
});
