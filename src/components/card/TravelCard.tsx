import Image from 'next/image';
import Location from '@/assets/location.svg';
import ProfileICon from '@/assets/profile.svg';
import { Travel } from '@/@types/travel';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import cn from '@/utils/cn';
import useBookmarkTravel from '@/queries/travel/useBookmarkTravel';
import { deleteTravelBookMark, postTravelBookMark } from '@/api/travelApi';
import DomesticTag from '../common/tag/DomesticTag';
import ProgressBar from '../common/ProgressBar';
import ExpiredTag from '../common/tag/ExpiredTag';
import CheckMarkButton from '../common/button/CheckMarkButton';

interface Props extends Travel {
  closed?: boolean;
  checkMark?: boolean;
  isChecked?: boolean;
}

const TravelCard = ({
  travelId,
  isDomestic,
  travelName,
  location,
  maxTravelMateCount,
  currentTravelMateCount,
  formattedStartDate,
  image,
  closed,
  checkMark,
  isChecked,
}: Props) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked);
  const [animate, setAnimate] = useState(false);

  const progressRate = useMemo(
    () => Math.round((currentTravelMateCount / maxTravelMateCount) * 100),
    [currentTravelMateCount, maxTravelMateCount],
  );
  const iconAndText =
    "flex items-center gap-0.5 after:ml-[6px] after:text-line-normal after:content-['|']";

  const { mutate: bookmarkTravel } = useBookmarkTravel();

  const handleCheckMark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (!isCheckedState) {
      bookmarkTravel(travelId);
      postTravelBookMark(travelId);
    } else {
      deleteTravelBookMark(travelId);
    }

    setIsCheckedState(!isCheckedState);
  };

  return (
    <Link href={`/travel/${travelId}`} className="flex gap-4">
      <div
        className={cn('relative h-[120px] w-[100px] flex-shrink-0 rounded', {
          'after:absolute after:inset-0 after:rounded after:bg-black after:opacity-50':
            closed,
        })}
      >
        <Image
          src={image}
          alt={`${travelName} - ${location} 여행 이미지`}
          width={100}
          height={120}
          className="h-full w-full rounded object-cover"
        />
        {closed && (
          <div className="body-3-sb absolute inset-0 z-10 flex items-center justify-center text-primary-white">
            마감된 여행
          </div>
        )}
        {checkMark && (
          <CheckMarkButton
            isChecked={isCheckedState}
            animate={animate}
            handler={handleCheckMark}
          />
        )}
      </div>

      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <DomesticTag isDomestic={isDomestic} />
            {closed && <ExpiredTag />}
          </div>
          <h3 className="line-clamp-2 font-bold">{travelName}</h3>
        </div>
        <div className="flex items-center gap-[6px] text-xs font-semibold text-gray-500">
          <div className={iconAndText}>
            <Location />
            {location}
          </div>
          <div className={iconAndText}>
            <ProfileICon />
            {`${currentTravelMateCount}/${maxTravelMateCount}`}
          </div>
          <div className="">{formattedStartDate}</div>
        </div>
        {!closed && <ProgressBar progressRate={progressRate} />}
      </div>
    </Link>
  );
};
export default TravelCard;
