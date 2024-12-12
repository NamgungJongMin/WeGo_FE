import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecruimentBox from './RecruimentBox';

jest.mock('../../common/user/UserIconList', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked UserIconList</div>),
}));

jest.mock('../../common/ProgressBar', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ProgressBar</div>),
}));

describe('RecruimentBox', () => {
  const mockParticipants = [
    { id: 1, nickname: 'string', role: 'string', profileImage: 'string' },
    { id: 2, nickname: 'string', role: 'string', profileImage: 'string' },
  ];

  it('마감된 여행일 때 "마감된 여행입니다." 메시지를 렌더링합니다', () => {
    render(
      <RecruimentBox
        isDateOver
        minTravelMateCount={2}
        maxTravelMateCount={5}
        participant={[]}
      />,
    );

    expect(screen.getByText('마감된 여행입니다.')).toBeInTheDocument();
    expect(screen.queryByText('모집 중')).not.toBeInTheDocument(); // 모집 중 메시지는 없어야 한다
  });

  it('모집 중인 여행일 때 여행 정보와 프로그레스바가 렌더링됩니다', () => {
    render(
      <RecruimentBox
        isDateOver={false}
        minTravelMateCount={2}
        maxTravelMateCount={5}
        participant={mockParticipants}
      />,
    );

    // 모집 중 표시 확인
    expect(screen.getByText('모집 중')).toBeInTheDocument();
    expect(screen.getByText('최소인원')).toBeInTheDocument();
    expect(screen.getByText('최대인원')).toBeInTheDocument();
    expect(screen.getByText('2명')).toBeInTheDocument(); // 최소인원
    expect(screen.getByText('5명')).toBeInTheDocument(); // 최대인원

    // Mocked Components 확인
    expect(screen.getByText('Mocked UserIconList')).toBeInTheDocument();
    expect(screen.getByText('Mocked ProgressBar')).toBeInTheDocument();
  });
});
