import MoreButton from '@/components/common/button/MoreButton';

const WeeklyHeader = ({ month, week }: { month: number; week: number }) => (
  <header className="flex flex-col gap-1.5">
    <div className="flex justify-between">
      <h2 className="title-3-eb pb-[6px] text-label-normal">
        이번주 인기 여행모임
      </h2>
      <MoreButton href="/" aria="이번주 인기 여행모임 페이지로 이동하기" />
    </div>
    <p className="body-2-m text-label-alternative">
      {month}월 {week}주차 조회수가 가장 많은 여행 모임을 알려드려요!
    </p>
  </header>
);

export default WeeklyHeader;
