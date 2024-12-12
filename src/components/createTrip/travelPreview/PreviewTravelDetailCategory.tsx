'use client';

import { TravelDetail } from '@/@types/travel';
import { useState } from 'react';
import SelectTravelItinerary from '@/components/travel/detail/category/SelectTravelItinerary';
import { Button } from '@/components/common/button/Button';
import PreviewSelectTravelReview from './PreviewSelectTravelReview';
import PreviewSelectTravelDetail from './PreviewSelectTravelDetail';

type PreviewTravelDetailCategoryType = Pick<
  TravelDetail,
  | 'hashTags'
  | 'participant'
  | 'description'
  | 'tripDuration'
  | 'travelPlan'
  | 'startAt'
>;

interface Props extends PreviewTravelDetailCategoryType {
  onSubmit: () => void;
}

const PreviewTravelDetailCategory = ({
  hashTags,
  participant,
  description,
  tripDuration,
  travelPlan,
  startAt,
  onSubmit,
}: Props) => {
  const [category, setCategory] = useState(0);
  const onClickCategory = (index: number) => {
    setCategory(index);
  };
  const organizer = participant.find((part) => part.role === 'ORGANIZER');
  const selectCss = 'border-b-[3px] border-label-normal text-label-normal';
  return (
    <section>
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
        <button
          type="button"
          onClick={() => onClickCategory(2)}
          className={`cursor-pointer pb-2.5 ${category === 2 ? selectCss : ''}`}
        >
          모임리뷰
        </button>
      </div>
      <div className="px-5 pb-10 pt-6">
        {category === 0 && (
          <PreviewSelectTravelDetail
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
        {category === 2 && <PreviewSelectTravelReview />}
        <Button handler={onSubmit}>메인</Button>
      </div>
    </section>
  );
};
export default PreviewTravelDetailCategory;
