'use client';

import { TravelDetail } from '@/@types/travel';
import { useState } from 'react';
import TravelButtons from './TravelButtons';
import SelectTravelReviewContainer from './SelectTravelReviewContainer';
import SelectTravelDetail from './category/SelectTravelDetail';
import SelectTravelItinerary from './category/SelectTravelItinerary';

type Props = Pick<
  TravelDetail,
  | 'hashTags'
  | 'participant'
  | 'description'
  | 'tripDuration'
  | 'travelPlan'
  | 'startAt'
  | 'endAt'
>;

const TravelDetailCategory = ({
  hashTags,
  participant,
  description,
  tripDuration,
  travelPlan,
  startAt,
  endAt,
}: Props) => {
  const [category, setCategory] = useState(0);
  const onClickCategory = (index: number) => {
    setCategory(index);
  };
  const organizer = participant.find((part) => part.role === 'ORGANIZER');
  const now = new Date();
  const endDate = new Date(endAt);
  const selectCss = 'border-b-[3px] border-label-normal text-label-normal';
  return (
    <section className="pb-20">
      <div className="heading-1-b flex items-start gap-5 border-b px-5 text-label-alternative">
        <button
          type="button"
          onClick={() => onClickCategory(0)}
          className={`cursor-pointer pb-2.5 ${category === 0 ? selectCss : ''}`}
        >
          여행상세
        </button>
        <button
          type="button"
          onClick={() => onClickCategory(1)}
          className={`cursor-pointer pb-2.5 ${category === 1 ? selectCss : ''}`}
        >
          여행일정
        </button>
        {now > endDate && (
          <button
            type="button"
            onClick={() => onClickCategory(2)}
            className={`cursor-pointer pb-2.5 ${category === 2 ? selectCss : ''}`}
          >
            모임리뷰
          </button>
        )}
      </div>
      <div className="px-5 pb-10 pt-6">
        {category === 0 && (
          <SelectTravelDetail
            participant={false}
            organizer={organizer}
            hashTags={hashTags}
            description={description}
          />
        )}
        {category === 1 && (
          <SelectTravelItinerary
            tripDuration={tripDuration}
            travelPlan={travelPlan}
            startAt={startAt}
          />
        )}
        {category === 2 && <SelectTravelReviewContainer />}
        {(category === 1 || category === 0) && now < endDate && (
          <TravelButtons organizer={organizer?.id} participant={participant} />
        )}
      </div>
    </section>
  );
};
export default TravelDetailCategory;
