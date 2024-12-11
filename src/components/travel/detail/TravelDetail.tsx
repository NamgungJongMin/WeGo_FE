'use client';

import TravelContents from '@/components/travel/detail/TravelContents';
import { useQuery } from '@tanstack/react-query';
import { getTravelDetail } from '@/api/travelApi';
import { useTravelIdStore } from '@/store/useTravelIdStore';
import { useEffect } from 'react';
import TravelDetailCategory from './TravelDetailCategory';

const TravelDetail = ({ id }: { id: string }) => {
  const setId = useTravelIdStore((state) => state.setId);
  useEffect(() => {
    setId(id);
  }, [id, setId]);

  const {
    data: travelDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travels', { id }],
    queryFn: () => getTravelDetail({ id }),
  });

  if (error) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <article>
      {isLoading && <div>로딩중</div>}
      {travelDetail && (
        <>
          <TravelContents
            name={travelDetail.name}
            image={travelDetail.image}
            isDomestic={travelDetail.isDomestic}
            minTravelMateCount={travelDetail.minTravelMateCount}
            maxTravelMateCount={travelDetail.maxTravelMateCount}
            startAt={travelDetail.startAt}
            endAt={travelDetail.endAt}
            registrationEnd={travelDetail.registrationEnd}
            participant={travelDetail.participant}
          />
          <TravelDetailCategory
            hashTags={travelDetail.hashTags}
            participant={travelDetail.participant}
            description={travelDetail.description}
            tripDuration={travelDetail.tripDuration}
            travelPlan={travelDetail.travelPlan}
            startAt={travelDetail.startAt}
            endAt={travelDetail.endAt}
          />
        </>
      )}
    </article>
  );
};
export default TravelDetail;
