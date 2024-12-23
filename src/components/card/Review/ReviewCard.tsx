import Link from 'next/link';
import Image from 'next/image';
import LocationIcon from '@/assets/icon/location_18px.svg';
import StarIcon from '@/assets/icon/star_20px.svg';
import UserIcon from '@/components/common/user/UserIcon';
import ReviewHeart from './ReviewHeart';

interface Props {
  reviewId: number;
  nickname?: string;
  profileImage?: string;
  image: string;
  title: string;
  content: string;
  score: number;
  travelLocation: string;
  createdAt: string;
  isLiked?: boolean;
}

const ReviewCard = ({
  reviewId,
  nickname,
  profileImage,
  image,
  title,
  content,
  score,
  travelLocation,
  createdAt,
  isLiked,
}: Props) => {
  return (
    <Link href={`/review/${reviewId}`} className="min-w-[160px] flex-1">
      <div className="group relative h-[242px] w-full">
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={160}
            height={210}
            className="h-[210px] w-full rounded object-cover"
          />

          {isLiked !== undefined && <ReviewHeart isLiked={isLiked} />}

          <div className="absolute bottom-0 z-10 flex h-[80px] w-full flex-col justify-end gap-0.5 bg-gradient-to-b from-black/0 to-black/80 px-3 pb-3 text-primary-white transition-all duration-200 group-hover:h-full group-hover:bg-black/50">
            <p className="body-3-m line-clamp-1 group-hover:opacity-0">
              {title}
            </p>
            <p className="body-3-m line-clamp-5 max-h-0 overflow-hidden group-hover:max-h-[90px]">
              {content}
            </p>
            <p className="caption-1-r text-label-assistive group-hover:mb-1.5">
              {createdAt}
            </p>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          {nickname ? (
            <div className="flex items-center gap-2">
              <UserIcon size="xs" profileImage={profileImage} />
              <p className="body-3-m">{nickname}</p>
            </div>
          ) : (
            <div className="flex">
              <LocationIcon />
              <p className="text-grey-900 body-2-m">{travelLocation}</p>
            </div>
          )}

          <div className="flex items-center">
            <StarIcon />
            <p className="body-3-m text-label-alternative">{score}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
