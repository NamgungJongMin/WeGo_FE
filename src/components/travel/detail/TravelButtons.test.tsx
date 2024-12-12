import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelButtons from './TravelButtons';

const mockParticipants = [
  { id: 1, nickname: '1', role: 'string', profileImage: 'string' },
  { id: 2, nickname: '2', role: 'string', profileImage: 'string' },
  { id: 3, nickname: '3', role: 'string', profileImage: 'string' },
];

describe('TravelButtons', () => {
  it('주최자인 경우 "여행취소"와 "공유" 버튼이 렌더링됩니다', () => {
    render(<TravelButtons participant={mockParticipants} organizer={4} />);
    expect(screen.getByText('여행취소')).toBeInTheDocument();
    expect(screen.getByText('공유')).toBeInTheDocument();
  });

  it('참여한 사용자일 경우 "동행취소" 버튼이 렌더링됩니다', () => {
    const mockParticipantsWithUser = [
      ...mockParticipants,
      { id: 4, nickname: '4', role: 'string', profileImage: 'string' },
    ];
    render(
      <TravelButtons
        participant={mockParticipantsWithUser}
        organizer={undefined}
      />,
    );
    expect(screen.getByText('동행취소')).toBeInTheDocument();
  });

  it('참여하지 않은 사용자일 경우 "동행" 버튼이 렌더링됩니다', () => {
    render(
      <TravelButtons participant={mockParticipants} organizer={undefined} />,
    );
    expect(screen.getByText('동행')).toBeInTheDocument();
  });
});
