import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingList from './SettingList';

describe('SettingList', () => {
  it('모든 설정 항목이 올바르게 렌더링되어야 한다', () => {
    render(<SettingList />);

    expect(screen.getByText('문의하기')).toBeInTheDocument();
    expect(screen.getByText('궁금한 내용이 있으신가요?')).toBeInTheDocument();

    expect(screen.getByText('비밀번호 변경')).toBeInTheDocument();
    expect(
      screen.getByText('비밀번호를 변경하시고 싶으신가요?'),
    ).toBeInTheDocument();

    expect(screen.getByText('계정 탈퇴')).toBeInTheDocument();
    expect(
      screen.getByText("이제 WE'GO를 사용할 수 없어요."),
    ).toBeInTheDocument();
  });

  it('각 설정 항목이 올바른 링크를 가져야 한다', () => {
    render(<SettingList />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', '/preparing');
    expect(links[1]).toHaveAttribute('href', '/resetPassword/userPassword');
    expect(links[2]).toHaveAttribute('href', '/deleteAccount');
  });

  it('설정 목록이 올바른 스타일 클래스를 가져야 한다', () => {
    render(<SettingList />);

    const listContainer = screen.getByRole('list');
    expect(listContainer).toHaveClass('mt-5 w-full divide-y px-5');
  });
});
