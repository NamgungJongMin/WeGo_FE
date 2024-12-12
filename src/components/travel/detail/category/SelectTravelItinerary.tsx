'use client';

import { TravelDetail } from '@/@types/travel';
import ArrowDownIcon from '@/assets/arrow_down.svg';
import { useState } from 'react';
import { formatDateToShortWithDay } from '@/utils/dateChageKr';
import TravelPlanCard from '../../../card/TravelPlanCard';

type Props = Pick<TravelDetail, 'tripDuration' | 'travelPlan' | 'startAt'>;

const SelectTravelItinerary = ({
  tripDuration,
  travelPlan,
  startAt,
}: Props) => {
  const [isOppen, setIsOppen] = useState<Set<number>>(new Set());
  const toggleDay = (day: number) => {
    setIsOppen((prev) => {
      const newOpen = new Set(prev);
      if (newOpen.has(day)) {
        newOpen.delete(day);
      } else {
        newOpen.add(day);
      }
      return newOpen;
    });
  };
  return (
    <div className="flex flex-col gap-6 divide-y divide-line-normal pb-6">
      {Array.from({ length: tripDuration }, (_, index) => index + 1).map(
        (i) => (
          <div
            key={i}
            className={`flex justify-between gap-5 ${i !== 1 && 'pt-6'}`}
          >
            <div className="title-5-b flex flex-shrink-0 flex-col">
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={() => toggleDay(i)}
              >
                <span>Day {i}</span>
                <ArrowDownIcon
                  className={`transform cursor-pointer transition-transform duration-200 ${isOppen.has(i) ? '' : 'scale-y-[-1]'}`}
                />
              </button>

              <span className="body-2-m text-label-alternative">
                {formatDateToShortWithDay(startAt, i - 1)}
              </span>
            </div>

            {isOppen.has(i) && (
              <div className="flex w-full flex-col gap-4">
                {travelPlan
                  .filter((plan) => plan.tripDay === i)
                  .map((plan) => (
                    <div key={plan.destination}>
                      <TravelPlanCard
                        image={plan.image}
                        destination={plan.destination}
                        description={plan.description}
                      />
                    </div>
                  ))}
              </div>
            )}
            {!isOppen.has(i) && (
              <button
                type="button"
                onClick={() => toggleDay(i)}
                className="body-2-m h-fit rounded-[20px] bg-gray-100 px-2.5 py-1 text-label-neutral"
              >
                상세 일정 확인
              </button>
            )}
          </div>
        ),
      )}
    </div>
  );
};

export default SelectTravelItinerary;
