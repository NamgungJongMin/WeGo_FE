import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SelectTravelDetail from './SelectTravelDetail';

describe('', () => {
  const mock = {
    participant: true,
    organizer: {
      id: 1,
      nickname: '녹차라떼',
      role: 'string',
      profileImage: 'string',
    },
    hashTags: '#겨울여행#액티비티',
    description:
      '12월의 겨울 낭만을 즐기고 싶은 분들 계신가요?함께 국내 겨울 여행지를 돌아다니고 싶습니다!춥지만, 마음만은 따듯한 겨울 여행 함께해요 :)다양한 사람들이 모여서 함께 하고 싶어요!',
  };
  it('여행 상세가 렌더링됩니다', () => {
    render(
      <SelectTravelDetail
        participant={mock.participant}
        organizer={mock.organizer}
        hashTags={mock.hashTags}
        description={mock.description}
      />,
    );
    expect(screen.getByText('녹차라떼')).toBeInTheDocument();
    expect(screen.getByText('2시간 전 업로드')).toBeInTheDocument();
    expect(screen.getByText('# 겨울여행')).toBeInTheDocument();
    expect(screen.getByText('# 액티비티')).toBeInTheDocument();
    expect(
      screen.getByText(
        '12월의 겨울 낭만을 즐기고 싶은 분들 계신가요?함께 국내 겨울 여행지를 돌아다니고 싶습니다!춥지만, 마음만은 따듯한 겨울 여행 함께해요 :)다양한 사람들이 모여서 함께 하고 싶어요!',
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('북마크')).toBeInTheDocument();
    expect(screen.getByText('채팅방')).toBeInTheDocument();
  });

  it('여행 모임장은 북마크는 렌더링되지 않습니다', () => {
    const mockPart = {
      participant: true,
      organizer: {
        id: 4,
        nickname: '녹차라떼',
        role: 'string',
        profileImage: 'string',
      },
      hashTags: '#',
      description: '12월',
    };

    render(
      <SelectTravelDetail
        participant={mockPart.participant}
        organizer={mockPart.organizer}
        hashTags={mockPart.hashTags}
        description={mockPart.description}
      />,
    );

    expect(screen.queryByLabelText('북마크')).not.toBeInTheDocument();
  });
});
