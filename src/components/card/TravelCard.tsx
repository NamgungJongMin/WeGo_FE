import Image from 'next/image';
import Location from '@/assets/location.svg';
import Multiple from '@/assets/multiple.svg';
import { Travel } from '@/@types/travel';

const TravelCard = ({
  // travelId,
  isDomestic,
  travelName,
  travelLocation,
  maxParticipant,
  currentParticipant,
  formattedStartDate,
}: Travel & { formattedStartDate: string }) => {
  return (
    <article className="flex gap-4">
      <div className="h-[120px] w-[100px] flex-shrink-0">
        <Image
          src="/test2.png"
          alt=""
          width={100}
          height={120}
          className="h-full w-full rounded object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="w-fit rounded-[20px] bg-blue-100 px-[6px] py-[3px] text-[10px] font-semibold text-[#2563EB]">
            {isDomestic ? '국내여행' : '해외여행'}
          </div>
          <div className="line-clamp-2 font-bold">{travelName}</div>
        </div>
        <div className="flex items-center gap-[6px] text-[#878A92]">
          <div className="flex items-center gap-[2px] after:ml-[6px] after:text-[#E0E0E2] after:content-['|']">
            <Location />
            {travelLocation}
          </div>
          <div className="flex items-center gap-[2px] after:ml-[6px] after:text-[#E0E0E2] after:content-['|']">
            <Multiple />
            {`${currentParticipant}/${maxParticipant}`}
          </div>
          <div>{formattedStartDate}</div>
        </div>
      </div>
    </article>
  );
};
export default TravelCard;
