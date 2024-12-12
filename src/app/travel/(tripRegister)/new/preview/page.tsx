/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */

'use client';

import FormHeader from '@/components/common/formheader/FormHeader';
import TravelContents from '@/components/travel/detail/TravelContents';
import PreviewTravelDetailCategory from '@/components/createTrip/travelPreview/PreviewTravelDetailCategory';
import useTravelForm from '@/hooks/useTravelForm';
import { formatDateToStringWithDot } from '@/utils/calendarHelper';
import participantList from '@/mocks/data/user/participantList.json';

export default function PreviewPage() {
  const { formData, isLoading, closePreview, goBackPreview } = useTravelForm();

  const {
    travelName,
    minTravelMateCount,
    maxTravelMateCount,
    registrationEnd,
    travelDescription,
    travelImage,
    hashTags,
    isDomestic,
    startAt,
    endAt,
    detailTravel,
  } = formData;

  const getDaysInRange = () => {
    if (!endAt) return 1;
    const days: Date[] = [];
    const current = new Date(startAt as Date);
    while (current <= endAt) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days.length;
  };

  return (
    <>
      <FormHeader title="미리보기" onRoute={goBackPreview} />
      {isLoading ? (
        <div className="flex h-1/2 items-center justify-center">로딩중...</div>
      ) : (
        <article>
          <TravelContents
            name={travelName}
            image={URL.createObjectURL(travelImage as File)}
            isDomestic={isDomestic}
            minTravelMateCount={+minTravelMateCount}
            maxTravelMateCount={+maxTravelMateCount}
            startAt={formatDateToStringWithDot(startAt)}
            endAt={formatDateToStringWithDot(endAt ?? startAt)}
            registrationEnd={formatDateToStringWithDot(
              registrationEnd.startDate,
            )}
            participant={participantList}
          />
          <PreviewTravelDetailCategory
            hashTags={hashTags.join('')}
            participant={participantList}
            description={travelDescription}
            tripDuration={getDaysInRange()}
            travelPlan={detailTravel.map((travel) => ({
              ...travel,
              image: URL.createObjectURL(travel.destinationImage as File),
            }))}
            startAt={formatDateToStringWithDot(startAt)}
            onSubmit={closePreview}
          />
        </article>
      )}
    </>
  );
}
