import { Travel } from '@/@types/travel';
import { formatStartDate, getWeekNumber } from '@/utils/dateChageKr';
import { useMemo } from 'react';
import TravelCard from '@/components/card/TravelCard';
import WeeklyHeader from './WeeklyHeader';

interface Props {
  travelList: Travel[];
}

const WeeklyPopular = ({ travelList }: Props) => {
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
      <WeeklyHeader month={month} week={week} />
      {startDateFormatted.map((travel) => (
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
      ))}
    </section>
  );
};
export default WeeklyPopular;
