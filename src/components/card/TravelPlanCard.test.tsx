import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelPlanCard from './TravelPlanCard';

const mockPlan = {
  image: 'https://example.com/image.jpg',
  destination: '대전 성심당',
  description: '웨이팅 1시간 예상, 빵 종류별로 사기',
};

describe('TravelPlanCard', () => {
  it('여행일정 정보를 렌더링합니다.', () => {
    render(
      <TravelPlanCard
        image={mockPlan.image}
        destination={mockPlan.destination}
        description={mockPlan.description}
      />,
    );

    // 이미지
    const planImage = screen.getByAltText(
      `${mockPlan.destination} 일정 이미지`,
    );
    expect(planImage).toBeInTheDocument();

    // 일정 제목, 설명
    expect(screen.getByText('대전 성심당')).toBeInTheDocument();
    expect(
      screen.getByText('웨이팅 1시간 예상, 빵 종류별로 사기'),
    ).toBeInTheDocument();
  });
});
