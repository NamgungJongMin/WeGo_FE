import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import InputImage from './InputImage';

describe('InputImage', () => {
  it('이미지 등록버튼이 렌더링됩니다', async () => {
    render(<InputImage />);
    const fileInput = screen.getByLabelText('이미지 등록');
    expect(fileInput).toBeInTheDocument();
  });
});
