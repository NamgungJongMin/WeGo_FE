import HeartIcon from '@/assets/icon/review/heart_18px.svg';
import cn from '@/utils/cn';
import { useState } from 'react';

interface Props {
  isLiked: boolean;
  red?: boolean;
}

const ReviewHeart = ({ isLiked, red }: Props) => {
  // 백엔드쪽 좋아요 기능 구현 후 대체 예정
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLikedState(!isLikedState);
  };
  // --------------------------

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute right-2 top-2 z-50 flex h-9 w-9 items-center justify-center rounded bg-black/30"
    >
      <HeartIcon
        data-testid="heart-icon"
        className={cn('fill-none', {
          'stroke-primary-white': !red,
          'fill-primary-white': !red && isLikedState,
          'stroke-red-400': red,
          'fill-red-400': red && isLikedState,
        })}
      />
    </button>
  );
};

export default ReviewHeart;
