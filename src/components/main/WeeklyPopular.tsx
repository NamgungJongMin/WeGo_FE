import { Travel } from '@/@types/travel';
import { formatStartDate, getWeekNumber } from '@/utils/dateChageKr';
import { useMemo } from 'react';
import Link from 'next/link';
import TravelCard from '../card/TravelCard';

interface Props {
  travelList: Travel[];
}

function WeeklyPopular({ travelList }: Props) {
  const startDateFormatted = useMemo(() => {
    return travelList.map((travel) => ({
      ...travel,
      formattedStartDate: formatStartDate(travel.startDate),
    }));
  }, [travelList]);

  const month = new Date().getMonth() + 1;
  const week = useMemo(() => getWeekNumber(), []);

  return (
    <section className="flex flex-col justify-center gap-6 px-10 py-[50px]">
      <div className="flex flex-col gap-[6px]">
        <div className="text-2xl font-extrabold text-[#222222]">
          이번주 인기 여행모임
        </div>
        <div className="text-sm font-medium text-[#878A92]">
          {month}월 {week}주차 조회수가 가장 많은 여행 모임을 알려드려요!
        </div>
      </div>
      {startDateFormatted.map((travel) => (
        <Link href="/" key={travel.travelId}>
          <TravelCard
            key={travel.travelId}
            travelId={travel.travelId}
            isDomestic={travel.isDomestic}
            travelName={travel.travelName}
            travelLocation={travel.travelLocation}
            maxParticipant={travel.maxParticipant}
            currentParticipant={travel.currentParticipant}
            startDate={travel.startDate}
            formattedStartDate={travel.formattedStartDate}
          />
        </Link>
      ))}
    </section>
  );
}
export default WeeklyPopular;
