import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingItem from './SettingItem';

jest.mock('@/assets/icon/right_20px.svg', () => ({
  __esModule: true,
  default: () => <div data-testid="right-arrow-icon" />,
}));

describe('SettingItem', () => {
  const defaultProps = {
    destination: '/settings/profile',
    title: '프로필 설정',
    description: '프로필 정보를 수정할 수 있습니다.',
  };

  it('제목과 설명이 올바르게 렌더링되어야 한다', () => {
    render(<SettingItem {...defaultProps} />);

    expect(screen.getByText('프로필 설정')).toBeInTheDocument();
    expect(
      screen.getByText('프로필 정보를 수정할 수 있습니다.'),
    ).toBeInTheDocument();
  });

  it('오른쪽 화살표 아이콘이 표시되어야 한다', () => {
    render(<SettingItem {...defaultProps} />);
    expect(screen.getByTestId('right-arrow-icon')).toBeInTheDocument();
  });

  it('링크가 올바른 destination을 가리켜야 한다', () => {
    render(<SettingItem {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/settings/profile');
  });

  it('링크가 올바른 스타일 클래스를 가져야 한다', () => {
    render(<SettingItem {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('mx-auto flex max-w-[335px] justify-between py-4');
  });
});
