import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MyReviewSubTab from './MyReviewSubTab';

describe('MyReviewSubTab 컴포넌트', () => {
  const setSelectedSubTabMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <MyReviewSubTab
        selectedSubTab="writable"
        setSelectedSubTab={setSelectedSubTabMock}
      />,
    );
  });

  it('writable과 written 컴포넌트가 정상적으로 렌더링 되어야한다.', () => {
    expect(
      screen.getByRole('button', { name: '작성가능한' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '작성한' })).toBeInTheDocument();
  });

  it('selectedSubTab이 writable일 때 작성가능한 버튼이 비활성화 되어야 한다.', () => {
    expect(screen.getByRole('button', { name: '작성가능한' })).toBeDisabled();
  });

  it('작성한 버튼을 클릭하면 setSelectedSubTab이 호출되어야 한다.', () => {
    const writtenButton = screen.getByRole('button', { name: '작성한' });

    fireEvent.click(writtenButton);

    expect(setSelectedSubTabMock).toHaveBeenCalledWith('written');
  });
});
