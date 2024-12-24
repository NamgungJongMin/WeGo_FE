import Image from 'next/image';
import Profile from '@/assets/profile.svg';
import Timeline from '@/assets/timeline.svg';
import DateIcon from '@/assets/date.svg';
import { TravelDetail } from '@/@types/travel';
import DomesticTag from '../../common/tag/DomesticTag';
import RecruimentBox from './RecruimentBox';
import DateOverTag from '../../common/tag/DateOverTag';

type Props = Pick<
  TravelDetail,
  | 'name'
  | 'image'
  | 'isDomestic'
  | 'minTravelMateCount'
  | 'maxTravelMateCount'
  | 'startAt'
  | 'endAt'
  | 'participant'
  | 'registrationEnd'
>;

const TravelContents = ({
  name,
  image,
  isDomestic,
  minTravelMateCount,
  maxTravelMateCount,
  startAt,
  endAt,
  participant,
  registrationEnd,
}: Props) => {
  const now = new Date();
  const endDate = new Date(registrationEnd);
  const isDateOver = now > endDate;
  const info = 'flex items-center justify-start text-gray-500';
  return (
    <main className="flex flex-col items-center justify-center md:flex-row md:gap-6 md:px-10 md:pt-10">
      <figure className="relative flex h-[250px] w-[375px] flex-shrink-0 flex-col overflow-hidden md:h-[277px] md:w-[309px]">
        <Image
          src={image}
          alt={`${name} 이미지`}
          height={250}
          width={375}
          className="h-full w-full object-cover"
        />
        {now >= endDate && <DateOverTag endAt={endAt} />}
      </figure>
      <div className="flex w-full flex-col px-5 pt-6 md:px-0">
        <DomesticTag isDomestic={isDomestic} />
        <h2 className="title-4-b border-b border-line-normal pb-4 pt-1.5 font-bold">
          {name}
        </h2>
        <div className="body-2-m flex flex-col gap-2 pt-4">
          <div className={`${info} justify-start`}>
            <DateIcon />
            <span className="pl-2">
              {startAt} - {endAt}
            </span>
          </div>

          <div className="flex gap-2 divide-x pb-5">
            <div className={`${info}`}>
              <Profile />
              <span className="pl-2 pr-1">모집정원</span>
              <span className="text-primary-normal">
                {maxTravelMateCount}명
              </span>
            </div>
            <div className={`${info} pl-2`}>
              <Timeline />
              <span className="pl-2 pr-1">모집기한</span>
              <span className="text-primary-normal">2024.11.31</span>
            </div>
          </div>
        </div>
        <RecruimentBox
          isDateOver={isDateOver}
          minTravelMateCount={minTravelMateCount}
          maxTravelMateCount={maxTravelMateCount}
          participant={participant}
        />
      </div>
    </main>
  );
};

export default TravelContents;
