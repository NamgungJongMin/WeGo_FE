import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import IntroductionInput from './Introduction';

describe('IntroductionInput', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('자기소개 라벨이 렌더링되어야 한다', () => {
    render(<IntroductionInput {...defaultProps} />);
    expect(screen.getByText('자기소개')).toBeInTheDocument();
  });

  it('입력 필드의 placeholder가 올바르게 표시되어야 한다', () => {
    render(<IntroductionInput {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('자기소개를 입력해주세요. (20자 이내)'),
    ).toBeInTheDocument();
  });

  it('value prop이 입력 필드에 올바르게 표시되어야 한다', () => {
    const value = '안녕하세요';
    render(<IntroductionInput {...defaultProps} value={value} />);
    expect(screen.getByDisplayValue('안녕하세요')).toBeInTheDocument();
  });

  it('텍스트 입력 시 onChange 함수가 호출되어야 한다', () => {
    render(<IntroductionInput {...defaultProps} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '테스트 입력' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('maxLength가 20으로 제한되어야 한다', () => {
    render(<IntroductionInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '20');
  });
});
