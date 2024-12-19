import { useState } from 'react';
import TravelCard from '@/components/card/TravelCard';
import Pagenation from '@/components/common/pagenation/Pagenation';
import { checkTomorrow } from '@/utils/dateChageKr';
import Link from 'next/link';
import { TravelList } from '@/@types/travel';
import { useWritableTravel } from '@/queries/travel/useGetMyTravel';
import NoTravel from '../myTravel/NoTravel';

const Writable = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: travels } = useWritableTravel(itemsPerPage, currentPage - 1);
  const totalPages = travels ? Math.ceil(travels.total / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="mx-auto flex w-[335px] flex-col justify-center gap-6 pb-10">
      {travels && travels.total > 0 ? (
        travels.travels.map((travel: TravelList) => (
          <div key={travel.travelId} className="relative">
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
              formattedStartDate={checkTomorrow(travel.startAt)}
              closed
            />

            <Link href="/">
              <button
                type="button"
                className="body-3-m absolute right-0 top-0 text-primary-normal underline"
              >
                리뷰 작성
              </button>
            </Link>
          </div>
        ))
      ) : (
        <NoTravel message="아직 다녀온 여행이 없어요!" />
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

export default Writable;
