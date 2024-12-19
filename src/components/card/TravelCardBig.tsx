import Image from 'next/image';
import Location from '@/assets/location.svg';
import ProfileICon from '@/assets/profile.svg';
import { Travel } from '@/@types/travel';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import cn from '@/utils/cn';
import { deleteTravelBookMark, postTravelBookMark } from '@/api/travelApi';
import useBookmarkTravel from '@/queries/travel/useBookmarkTravel';
import { formatDateToShortWithDay } from '@/utils/dateChageKr';
import DomesticTag from '../common/tag/DomesticTag';
import ProgressBar from '../common/ProgressBar';
import ExpiredTag from '../common/tag/ExpiredTag';
import CheckMarkButton from '../common/button/CheckMarkButton';

interface Props extends Travel {
  closed?: boolean;
  checkMark?: boolean;
  isChecked?: boolean;
}

const TravelCardBig = ({
  travelId,
  isDomestic,
  travelName,
  location,
  maxTravelMateCount,
  currentTravelMateCount,
  startAt,
  endAt,
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
    <Link
      href={`/travel/${travelId}`}
      className="flex flex-col overflow-hidden rounded"
    >
      <div
        className={cn('relative h-[140px] w-full flex-shrink-0', {
          'after:absolute after:inset-0 after:rounded after:bg-black after:opacity-50':
            closed,
        })}
      >
        <Image
          src={image}
          alt={`${travelName} - ${location} 여행 이미지`}
          width={100}
          height={120}
          className="h-full w-full object-cover"
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
            locatedRight
          />
        )}
      </div>

      <div className="flex w-full flex-col justify-between rounded border-x border-b px-4 pb-4 pt-5">
        <div className="flex flex-col gap-1.5 pb-[18px]">
          <div className="flex items-center gap-1">
            <DomesticTag isDomestic={isDomestic} />
            {closed && <ExpiredTag />}
          </div>
          <h3 className="title-5-b line-clamp-2">{travelName}</h3>
          <div className="body-3-sb flex h-3.5 items-center divide-x divide-line-normal text-gray-500">
            <div className="body-3-sb flex items-center gap-0.5 pr-1.5">
              <Location />
              {location}
            </div>
            <div className="body-3-r flex items-center gap-0.5 px-1.5">
              <ProfileICon />
              {`${currentTravelMateCount}/${maxTravelMateCount}`}
            </div>
            <div className="body-3-r flex gap-0.5 pl-1.5">
              {formatDateToShortWithDay(startAt, undefined, true)} -{' '}
              {formatDateToShortWithDay(endAt, undefined, true)}
            </div>
          </div>
        </div>

        {!closed && (
          <div className="caption-1-sb flex items-center gap-2.5 text-primary-normal">
            <ProgressBar progressRate={progressRate} />
            <span>{progressRate}%</span>
          </div>
        )}
      </div>
    </Link>
  );
};
export default TravelCardBig;
