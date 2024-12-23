import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileImage from './ProfileImage';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line
    return <img alt={props.alt} src={props.src} {...props} />;
  },
}));

jest.mock('@/assets/icon/icon_camera.svg', () => ({
  __esModule: true,
  default: () => <div data-testid="camera-icon" />,
}));

describe('ProfileImage', () => {
  const mockHandleImageChange = jest.fn();
  const defaultProps = {
    previewImage: '',
    handleImageChange: mockHandleImageChange,
  };

  beforeEach(() => {
    mockHandleImageChange.mockClear();
  });

  it('프로필 이미지가 없을 때 카메라 아이콘이 표시되어야 한다', () => {
    render(<ProfileImage {...defaultProps} />);
    expect(screen.getByTestId('camera-icon')).toBeInTheDocument();
  });

  it('프로필 이미지가 있을 때 이미지가 표시되어야 한다', () => {
    const previewImage = 'test-image-url.jpg';
    render(<ProfileImage {...defaultProps} previewImage={previewImage} />);

    const image = screen.getByAltText('프로필 이미지');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', previewImage);
  });

  it('파일 입력 필드가 숨겨져 있어야 한다', () => {
    render(<ProfileImage {...defaultProps} />);
    const fileInput = screen.getByLabelText('이미지 업로드');
    expect(fileInput).toHaveClass('hidden');
  });

  it('이미지 업로드 시 handleImageChange가 호출되어야 한다', () => {
    render(<ProfileImage {...defaultProps} />);
    const fileInput = screen.getByLabelText('이미지 업로드');

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockHandleImageChange).toHaveBeenCalled();
  });

  it('이미지 입력이 image/* 타입만 허용해야 한다', () => {
    render(<ProfileImage {...defaultProps} />);
    const fileInput = screen.getByLabelText('이미지 업로드');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });
});
