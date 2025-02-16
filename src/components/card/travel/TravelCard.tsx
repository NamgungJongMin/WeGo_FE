import Image from 'next/image';
import Location from '@/assets/location.svg';
import ProfileICon from '@/assets/profile.svg';
import { TravelCard as TravelCardProps } from '@/@types/travel';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import cn from '@/utils/cn';
import {
  useBookmarkTravel,
  useDeleteBookmarkTravel,
} from '@/queries/travel/useBookmarkTravel';
import { formatDateToShortWithDay } from '@/utils/dateChangeKr';
import DomesticTag from '../../common/tag/DomesticTag';
import ProgressBar from '../../common/progressbar/ProgressBar';
import ExpiredTag from '../../common/tag/ExpiredTag';
import CheckMarkButton from '../../common/button/CheckMarkButton';

interface Props extends TravelCardProps {
  closed?: boolean;
  formattedStartDate?: string;
}

const TravelCard = ({
  travelId,
  isDomestic,
  travelName,
  travelLocation,
  maxTravelMateCount,
  currentTravelMateCount,
  formattedStartDate,
  travelImage,
  closed,
  bookmarkFlag,
}: Props) => {
  const [isCheckedState, setIsCheckedState] = useState(bookmarkFlag);
  const [animate, setAnimate] = useState(false);

  const progressRate = useMemo(
    () => Math.round((currentTravelMateCount / maxTravelMateCount) * 100),
    [currentTravelMateCount, maxTravelMateCount],
  );
  const iconAndText =
    "flex items-center gap-0.5 after:ml-[6px] after:text-line-normal after:content-['|']";

  const { mutate: postBookMark } = useBookmarkTravel();
  const { mutate: deleteBookMark } = useDeleteBookmarkTravel();

  const handleCheckMark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (!isCheckedState) {
      postBookMark(travelId, {
        onError: () => setIsCheckedState(false),
      });
    } else {
      deleteBookMark(travelId, {
        onError: () => setIsCheckedState(true),
      });
    }
    setIsCheckedState(!isCheckedState);
  };

  return (
    <Link
      href={`/travel/${travelId}`}
      className="flex max-w-[335px] gap-4 md:max-w-[688px] md:gap-9"
    >
      <div
        className={cn(
          'relative h-[120px] w-[100px] flex-shrink-0 rounded md:h-[160px] md:w-[223px]',
          {
            'after:absolute after:inset-0 after:rounded after:bg-black after:opacity-50':
              closed,
          },
        )}
      >
        <Image
          src={travelImage}
          alt={`${travelName} - ${travelLocation} 여행 이미지`}
          width={300}
          height={300}
          className="h-full w-full rounded object-cover opacity-0 duration-300 ease-in-out"
          onLoadingComplete={(img) => {
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          }}
        />
        {closed && (
          <div className="body-3-sb absolute inset-0 z-10 flex items-center justify-center text-primary-white">
            마감된 여행
          </div>
        )}
        {isCheckedState !== null && (
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
          <h3 className="heading-1-b line-clamp-2 font-bold md:title-5-b">
            {travelName}
          </h3>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-[6px] text-gray-500">
            <span className={`body-3-sb ${iconAndText}`}>
              <Location />
              {travelLocation}
            </span>
            <span className={`body-3-r ${iconAndText}`}>
              <ProfileICon />
              {`${currentTravelMateCount}/${maxTravelMateCount}`}
            </span>
            <span className="body-3-r">
              {formatDateToShortWithDay(formattedStartDate, 0, false, false)} -{' '}
            </span>
          </div>
          {!closed && <ProgressBar progressRate={progressRate} />}
        </div>
      </div>
    </Link>
  );
};
export default TravelCard;
