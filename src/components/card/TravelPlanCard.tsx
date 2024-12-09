import { TravelPlan } from '@/@types/travel';
import LocationIcon from '@/assets/location.svg';
import Image from 'next/image';

const TravelPlanCard = ({
  image,
  destination,
  description,
}: Omit<TravelPlan, 'tripDay' | 'tripOrderNumber'>) => {
  return (
    <div className="overflow-hidden rounded bg-background-alternative">
      <div className="flex h-[100px] items-center overflow-hidden">
        <Image
          src={image}
          alt={destination}
          width={300}
          height={100}
          className="w-full object-cover"
        />
      </div>

      <div className="px-3 py-4">
        <div className="heading-1-b flex items-center gap-1">
          <LocationIcon fill="#6B7280" stroke="#6B7280" />
          <span>{destination}</span>
        </div>
        <div className="body-2-r pt-1">{description}</div>
      </div>
    </div>
  );
};

export default TravelPlanCard;
