import { formatStartDate } from '@/utils/dateChageKr';

import { useState } from 'react';
import TravelCard from '@/components/card/TravelCard';
import Pagenation from '@/components/common/pagenation/Pagenation';
import { useMySelfTravel } from '@/queries/travel/useGetMyTravel';
import { TravelList } from '@/@types/travel';
import NoTravel from '../myTravel/NoTravel';

const MySelfTravel = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: travels } = useMySelfTravel(itemsPerPage, currentPage - 1);
  const totalPages = travels ? Math.ceil(travels.total / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="mx-auto flex w-[335px] flex-col justify-center gap-6 pb-10">
      {travels && travels.total > 0 ? (
        travels.travels.map((travel: TravelList) => (
          <TravelCard
            key={travel.travelId}
            travelId={travel.travelId}
            travelName={travel.travelName}
            maxTravelMateCount={travel.maxTravelMateCount}
            currentTravelMateCount={travel.currentTravelMateCount}
            isDomestic={travel.isDomestic}
            location={travel.location}
            image={travel.image}
            startAt={travel.startAt}
            endAt={travel.endAt}
            formattedStartDate={formatStartDate(travel.startAt)}
          />
        ))
      ) : (
        <NoTravel travelSuggestion />
      )}

      {totalPages > 1 && (
        <Pagenation
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </section>
  );
};

export default MySelfTravel;
