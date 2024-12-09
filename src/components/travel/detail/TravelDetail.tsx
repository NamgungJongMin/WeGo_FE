import { TravelDetail as TravelDetailType } from '@/@types/travel';
import TravelContents from '@/components/travel/detail/TravelContents';
import TravelDetailCategory from './TravelDetailCategory';

const TravelDetail = async ({
  travelDetail,
}: {
  travelDetail: TravelDetailType;
}) => {
  return (
    <article>
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
    </article>
  );
};
export default TravelDetail;
