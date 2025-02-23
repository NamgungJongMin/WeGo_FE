import TravelCard from '@/components/card/travel/TravelCard';
import Pagination from '@/components/common/pagination/Pagination';
import { checkTomorrow } from '@/utils/dateChangeKr';
import { useState } from 'react';
import { useUpcommingTravel } from '@/queries/travel/useGetMyTravel';
import { TravelCard as TravelCardProps } from '@/@types/travel';
import HorizontalDivider from '@/components/common/divider/HorizontalDivider';
import MyTravelCardSkeleton from '@/components/mypage/skeleton/MyTravelCardSkeleton';
import NoTravel from './NoTravel';

const Upcomming = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: travels, isLoading } = useUpcommingTravel(
    itemsPerPage,
    currentPage - 1,
  );
  const totalPages = travels ? Math.ceil(travels.data.total / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) return <MyTravelCardSkeleton />;

  return (
    <section
      className="w-full max-w-[335px] pb-10 md:max-w-[688px] xl:max-w-[1400px]"
      data-testid="upcomming-travels"
    >
      {travels && travels.data.total > 0 ? (
        <div className="grid w-full gap-5 xl:grid-cols-2 xl:gap-6">
          {travels.data?.content.map((travel: TravelCardProps) => (
            <div key={travel.travelId}>
              <TravelCard
                key={travel.travelId}
                travelId={travel.travelId}
                travelImage={travel.travelImage}
                isDomestic={travel.isDomestic}
                travelName={travel.travelName}
                travelLocation={travel.travelLocation}
                maxTravelMateCount={travel.maxTravelMateCount}
                currentTravelMateCount={travel.currentTravelMateCount}
                startAt={travel.startAt}
                endAt={travel.endAt}
                bookmarkFlag={travel.bookmarkFlag}
                formattedStartDate={checkTomorrow(travel.startAt)}
              />
              <HorizontalDivider className="mt-5 xl:mt-6" />
            </div>
          ))}
        </div>
      ) : (
        <NoTravel message="아직 참여한 여행이 없어요!" />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </section>
  );
};

export default Upcomming;
