import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MoreButton from './MoreButton';

const mock = {
  href: '/',
  aria: '메인으로 이동',
};

describe('MoreButton', () => {
  it('More 버튼을 렌더링합니다', () => {
    render(<MoreButton href={mock.href} aria={mock.aria} />);

    // 링크
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');
    expect(screen.getByLabelText('메인으로 이동')).toBeInTheDocument();
    // 버튼 글씨
    expect(screen.getByText('MORE')).toBeInTheDocument();
  });
});
