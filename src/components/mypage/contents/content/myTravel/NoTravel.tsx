import EmptyShapes from '@/assets/icon/empty_shape.svg';
import Dot from '@/assets/icon/dot.svg';
import Link from 'next/link';

interface PropsWithMessage {
  message: string;
  travelSuggestion?: boolean;
}

interface PropsWithTravelSuggestion {
  message?: string;
  travelSuggestion: boolean;
}

type Props = PropsWithMessage | PropsWithTravelSuggestion;

const NoTravel = ({ message, travelSuggestion }: Props) => {
  if (travelSuggestion)
    return (
      <div
        className="mt-[80px] flex flex-col items-center gap-4"
        data-testid="no-travel-suggestion"
      >
        <div className="heading-1-sb text-center">
          나의 취향을 담은
          <br />
          여행 모임을 한번 만들어보세요.
        </div>
        <Link href="/travel/new">
          <button
            type="button"
            className="body-2-m h-9 w-32 rounded-[44px] bg-label-normal px-3 py-1 text-primary-white"
          >
            첫 여행모임 만들기
          </button>
        </Link>
      </div>
    );

  return (
    <div
      className="mt-[80px] flex flex-col items-center"
      data-testid="no-travel-message"
    >
      <div className="relative h-9 w-9">
        <EmptyShapes className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          <Dot />
          <Dot />
          <Dot />
        </div>
      </div>
      <p className="heading-1-sb mt-4 text-label-alternative">{message}</p>
    </div>
  );
};

export default NoTravel;
