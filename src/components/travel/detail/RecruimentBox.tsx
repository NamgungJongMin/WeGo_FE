import Error from '@/assets/error.svg';
import Square from '@/assets/square.svg';
import { Participant } from '@/@types/travel';
import ProgressBar from '../../common/ProgressBar';
import UserIconList from '../../common/user/UserIconList';

interface Props {
  isDateOver: boolean;
  minTravelMateCount: number;
  maxTravelMateCount: number;
  participant: Participant[];
}

const RecruimentBox = ({
  isDateOver,
  minTravelMateCount,
  maxTravelMateCount,
  participant,
}: Props) => {
  const personnel = 'flex items-center gap-1.5';

  if (isDateOver) {
    return (
      <div className="flex items-center gap-1.5 rounded bg-slate-50 px-4 py-3">
        <Error />
        <span className="body-2-sb text-label-neutral">마감된 여행입니다.</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col rounded bg-slate-50 px-5 py-4">
      <div className="flex justify-between pb-3">
        <span className="flex items-center gap-1.5">
          <Square />
          <span className="body-2-sb text-label-neutral">모집 중</span>
        </span>
        <UserIconList participant={participant} />
      </div>
      <ProgressBar progressRate={33} />
      <div className="flex justify-between pt-2 text-xs font-medium">
        <div className={personnel}>
          <span className="text-gray-500">최소인원</span>
          <span className="text-gray-600">{minTravelMateCount}명</span>
        </div>
        <div className={personnel}>
          <span className="text-gray-500">최대인원</span>
          <span className="text-gray-600">{maxTravelMateCount}명</span>
        </div>
      </div>
    </div>
  );
};
export default RecruimentBox;
