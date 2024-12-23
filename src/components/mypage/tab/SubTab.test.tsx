import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SubTab from './SubTab';

describe('SubTab 컴포넌트', () => {
  const setSelectedSubTabMock = jest.fn();

  it('selectedTab이 myTravel일 때 MyTravelSubTab을 렌더링한다', () => {
    render(
      <SubTab
        selectedTab="myTravel"
        selectedSubTab="upcomming"
        setSelectedSubTab={setSelectedSubTabMock}
      />,
    );

    expect(screen.getByTestId('myTravelSubTab')).toBeInTheDocument();
  });

  it('selectedTab이 myReview일 때 MyReviewSubTab을 렌더링한다', () => {
    render(
      <SubTab
        selectedTab="myReview"
        selectedSubTab="mySelfTravel"
        setSelectedSubTab={setSelectedSubTabMock}
      />,
    );

    expect(screen.getByTestId('myReviewSubTab')).toBeInTheDocument();
  });
});
