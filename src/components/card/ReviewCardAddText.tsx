import { Review } from '@/@types/review';
import StartIcon from '@/assets/blue_star.svg';
import Image from 'next/image';

const ReviewCardAddText = ({
  nickname,
  reviewImage,
  content,
  score,
}: Omit<Review, 'reviewId'>) => {
  return (
    <article className="flex gap-[18px]">
      <div className="relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded">
        <Image
          src={reviewImage}
          alt={`${nickname}의 여행리뷰 이미지`}
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="heading-1-b">{nickname}</span>
          <span className="body-2-m flex items-center gap-0.5 text-label-alternative">
            <StartIcon />
            {score}
          </span>
        </div>
        <div className="body-2-m text-label-neutral">{content}</div>
      </div>
    </article>
  );
};

export default ReviewCardAddText;
