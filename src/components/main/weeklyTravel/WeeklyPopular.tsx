'use client';

import { formatStartDate, getWeekNumber } from '@/utils/dateChageKr';
import { useMemo } from 'react';
import TravelCard from '@/components/card/TravelCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPopularTravel } from '@/api/travelApi';
import WeeklyHeader from './WeeklyHeader';

const WeeklyPopular = () => {
  const {
    data: travelList,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travels', 'popular'],
    queryFn: fetchPopularTravel,
  });

  const startDateFormatted = useMemo(() => {
    if (!travelList) return [];
    return travelList.map((travel) => ({
      ...travel,
      formattedStartDate: formatStartDate(travel.startDate),
    }));
  }, [travelList]);

  const month = new Date().getMonth() + 1;
  const week = useMemo(() => getWeekNumber(), []);

  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <section className="flex flex-col justify-center gap-6 px-5 py-[50px]">
      <WeeklyHeader month={month} week={week} />
      {isLoading && <div>로딩중 WeeklyPopular</div>}
      {startDateFormatted.map((travel) => (
        <TravelCard
          key={travel.travelId}
          travelId={travel.travelId}
          image={travel.image}
          isDomestic={travel.isDomestic}
          travelName={travel.travelName}
          travelLocation={travel.travelLocation}
          maxParticipant={travel.maxParticipant}
          currentParticipant={travel.currentParticipant}
          startDate={travel.startDate}
          formattedStartDate={travel.formattedStartDate}
        />
      ))}
    </section>
  );
};
export default WeeklyPopular;
