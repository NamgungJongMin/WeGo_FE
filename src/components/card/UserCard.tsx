import User from '@/@types/user';
import Image from 'next/image';

interface Props {
  openTravelCount: number;
  reviewCount: number;
}
type PopularUser = Pick<User, 'nickname' | 'image'>;

const UserCard = ({
  nickname,
  image,
  openTravelCount,
  reviewCount,
}: Props & PopularUser) => {
  return (
    <article className="flex flex-col items-center gap-4 rounded border border-line-normal px-[1.3125rem] py-5">
      <div className="h-16 w-16 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={`${nickname}의 프로필 사진`}
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="font-bold">{nickname}</div>
      <div className="text-xs font-medium text-label-alternative">
        모임장 {openTravelCount}회 • 리뷰 {reviewCount}개
      </div>
      <div className="rounded-sm bg-label-normal px-[6px] py-[3px] text-[10px] font-semibold text-primary-white">
        상세해요
      </div>
    </article>
  );
};
export default UserCard;
