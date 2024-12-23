import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MyTravelSubTab from './MyTravelSubTab';

describe('MyTravelSubTab 컴포넌트', () => {
  const setSelectedSubTabMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <MyTravelSubTab
        selectedSubTab="upcomming"
        setSelectedSubTab={setSelectedSubTabMock}
      />,
    );
  });

  it('upcomming, pastTravel, checkedTravel 컴포넌트가 정상적으로 렌더링 되어야 한다.', () => {
    expect(
      screen.getByRole('button', { name: '예정 여행' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '다녀온 여행' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '체크한 여행' }),
    ).toBeInTheDocument();
  });

  it('다녀온 여행 버튼을 클릭하면 setSelectedSubTab이 호출되어야 한다.', () => {
    const pastTravelButton = screen.getByRole('button', {
      name: '다녀온 여행',
    });

    fireEvent.click(pastTravelButton);

    expect(setSelectedSubTabMock).toHaveBeenCalledWith('pastTravel');
  });
});
