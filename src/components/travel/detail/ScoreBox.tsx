import VerticalProgressBar from '@/components/common/VerticalProgressBar';
import BlueStart from '@/assets/blue_star.svg';
import StarRate from './StarRate';

const ScoreBox = ({
  total,
  averageScore,
  scoreFrequency = {},
}: {
  total: number;
  averageScore: string;
  scoreFrequency?: Record<number, number>;
}) => {
  const fullScoreFrequency = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    ...scoreFrequency,
  };

  return (
    <div className="flex h-40 w-full flex-shrink-0 items-center justify-center gap-[18px] rounded border border-gray-100 px-3.5 py-5">
      <div className="flex flex-col items-center gap-2">
        <div>
          <span className="title-4-b">{averageScore}</span>
          <span className="title-4-sb text-gray-400">/5</span>
        </div>
        <div className="relative flex">
          <StarRate score={Number(averageScore)} />
          <div className="absolute flex">
            {[1, 2, 3, 4, 5].map((v) => (
              <BlueStart key={`star-${v}`} className="text-label-disable" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3.5">
        {Object.entries(fullScoreFrequency)
          .reverse()
          .map(([score, count]) => (
            <div key={score} className="flex flex-col items-center">
              <div className="body-3-r pb-2 text-gray-400">{count}</div>
              <VerticalProgressBar
                progressRate={Math.floor((count / total) * 100)}
              />
              <div className="body-2-m pt-1">{score}점</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScoreBox;
