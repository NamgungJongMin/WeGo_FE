import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelCard from './TravelCard';

describe('TravelCard', () => {
  it('사용자 프로필 정보를 렌더링합니다', () => {
    render(
      <TravelCard
        travelId={12}
        isDomestic
        travelName="부여로 떠나는 다함께 시골투어"
        travelLocation="충남 부여"
        maxParticipant={6}
        currentParticipant={1}
        startDate="12/3"
        formattedStartDate="12/03"
        image="/test/travel/test1.png"
      />,
    );

    // 1. 여행 이름이 렌더링되는지 확인
    expect(
      screen.getByAltText(
        '부여로 떠나는 다함께 시골투어 - 충남 부여 여행 이미지',
      ),
    ).toBeInTheDocument();
    // 2. 여행 위치가 렌더링되는지 확인
    expect(screen.getByText('충남 부여')).toBeInTheDocument();
    // 3. 참가자 정보가 올바르게 표시되는지 확인
    expect(screen.getByText('1/6')).toBeInTheDocument();
    // 4. 날짜가 올바르게 표시되는지 확인
    expect(screen.getByText('12/03')).toBeInTheDocument();
    // 5. 국내/해외 여행 라벨 확인
    expect(screen.getByText('해외여행')).toBeInTheDocument();
    // 6. 링크 확인
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/travel/12');
    // 7. 이미지 확인
    const travelImage = screen.getByAltText(
      '부여로 떠나는 다함께 시골투어 - 충남 부여 여행 이미지',
    );
    expect(travelImage).toBeInTheDocument();
  });
});
