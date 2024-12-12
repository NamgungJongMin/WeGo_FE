import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelContents from './TravelContents';

describe('TravelContents', () => {
  const travelDetail = {
    name: '제주도 여행',
    image: '/test.png',
    isDomestic: true,
    minTravelMateCount: 5,
    maxTravelMateCount: 10,
    startAt: '2024.12.01',
    endAt: '2024.12.10',
    participant: [
      { id: 1, nickname: '1', role: 'string', profileImage: 'string' },
      { id: 2, nickname: '2', role: 'string', profileImage: 'string' },
      { id: 3, nickname: '3', role: 'string', profileImage: 'string' },
    ],
    registrationEnd: '2024.11.30',
  };

  const renderComponent = () =>
    render(
      <TravelContents
        name={travelDetail.name}
        image={travelDetail.image}
        isDomestic={travelDetail.isDomestic}
        minTravelMateCount={travelDetail.minTravelMateCount}
        maxTravelMateCount={travelDetail.maxTravelMateCount}
        startAt={travelDetail.startAt}
        endAt={travelDetail.endAt}
        registrationEnd={travelDetail.registrationEnd}
        participant={travelDetail.participant}
      />,
    );

  it('이미지와 여행 이름이 렌더링됩니다.', () => {
    renderComponent();

    expect(screen.getByAltText('제주도 여행 이미지')).toBeInTheDocument();
    expect(screen.getByText('제주도 여행')).toBeInTheDocument();
  });

  it('여행 태그가 표시됩니다.', () => {
    renderComponent();

    expect(screen.getByText('해외여행')).toBeInTheDocument();
  });

  it('날짜 정보가 렌더링됩니다.', () => {
    renderComponent();

    expect(screen.getByText('2024.12.01 - 2024.12.10')).toBeInTheDocument();
  });

  it('모집 정원과 모집 기한이 표시됩니다.', () => {
    renderComponent();

    expect(screen.getByText('모집정원')).toBeInTheDocument();
    expect(screen.getByText('10명')).toBeInTheDocument();
    expect(screen.getByText('모집기한')).toBeInTheDocument();
    expect(screen.getByText('2024.11.31')).toBeInTheDocument();
  });

  it('모집 마감 태그가 올바르게 표시됩니다.', () => {
    const pastDateProps = { ...travelDetail, registrationEnd: '2024-11-01' };
    render(
      <TravelContents
        name={pastDateProps.name}
        image={pastDateProps.image}
        isDomestic={pastDateProps.isDomestic}
        minTravelMateCount={pastDateProps.minTravelMateCount}
        maxTravelMateCount={pastDateProps.maxTravelMateCount}
        startAt={pastDateProps.startAt}
        endAt={pastDateProps.endAt}
        registrationEnd={pastDateProps.registrationEnd}
        participant={pastDateProps.participant}
      />,
    );

    expect(screen.getByText('마감된 여행입니다.')).toBeInTheDocument();
  });
});
