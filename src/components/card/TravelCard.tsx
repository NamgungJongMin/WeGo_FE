import Image from 'next/image';
import Location from '@/assets/location.svg';
import Multiple from '@/assets/multiple.svg';
import { Travel } from '@/@types/travel';
import { useMemo } from 'react';
import Link from 'next/link';

const TravelCard = ({
  // travelId,
  isDomestic,
  travelName,
  travelLocation,
  maxParticipant,
  currentParticipant,
  formattedStartDate,
}: Travel) => {
  const progressRate = useMemo(
    () => Math.round((currentParticipant / maxParticipant) * 100),
    [currentParticipant, maxParticipant],
  );
  const iconAndText =
    "flex items-center gap-0.5 after:ml-[6px] after:text-line-normal after:content-['|']";

  return (
    <Link href="/" className="flex gap-4">
      <div className="h-[120px] w-[100px] flex-shrink-0">
        <Image
          src="/test2.png"
          alt={`${travelName} - ${travelLocation} 여행 이미지`}
          width={100}
          height={120}
          className="h-full w-full rounded object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="w-fit rounded-[20px] bg-blue-100 px-[6px] py-[3px] text-[10px] font-semibold text-primary-normal">
            {isDomestic ? '해외여행' : '국내여행'}
          </div>
          <h3 className="line-clamp-2 font-bold">{travelName}</h3>
        </div>
        <div className="flex items-center gap-[6px] text-xs font-semibold text-label-alternative">
          <div className={iconAndText}>
            <Location />
            {travelLocation}
          </div>
          <div className={iconAndText}>
            <Multiple />
            {`${currentParticipant}/${maxParticipant}`}
          </div>
          <div className="">{formattedStartDate}</div>
        </div>
        <div className="relative h-[6px] overflow-hidden rounded-[10px] bg-gray-200">
          <div
            className="absolute bottom-0 left-0 top-0 rounded-full bg-primary-normal"
            style={{ width: `${progressRate}%` }}
          />
        </div>
      </div>
    </Link>
  );
};
export default TravelCard;
