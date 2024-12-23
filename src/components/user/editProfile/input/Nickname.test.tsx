import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NicknameInput from './Nickname';

describe('NicknameInput', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('닉네임 라벨이 렌더링되어야 한다', () => {
    render(<NicknameInput {...defaultProps} />);
    expect(screen.getByText('닉네임')).toBeInTheDocument();
  });

  it('입력 필드의 placeholder가 올바르게 표시되어야 한다', () => {
    render(<NicknameInput {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('닉네임을 입력해 주세요.'),
    ).toBeInTheDocument();
  });

  it('value prop이 입력 필드에 올바르게 표시되어야 한다', () => {
    const value = '테스트닉네임';
    render(<NicknameInput {...defaultProps} value={value} />);
    expect(screen.getByDisplayValue('테스트닉네임')).toBeInTheDocument();
  });

  it('텍스트 입력 시 onChange 함수가 호출되어야 한다', () => {
    render(<NicknameInput {...defaultProps} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '새로운닉네임' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
