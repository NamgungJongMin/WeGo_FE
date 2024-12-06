import Image, { StaticImageData } from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';

const UserIconVariants = cva('rounded-full overflow-hidden', {
  variants: {
    size: {
      default: 'w-16 h-16',
      sm: 'w-9 h-9',
      lg: 'w-20 h-20',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface Props extends VariantProps<typeof UserIconVariants> {
  profileImage?: string | StaticImageData;
  nickname?: string;
}

const UserIcon = ({ profileImage, nickname, size }: Props) => {
  return (
    <div className={UserIconVariants({ size })}>
      <Image
        src={profileImage || '/default_profile.png'}
        alt={`${nickname ?? '유저'}의 프로필 이미지`}
        width={64}
        height={64}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
export default UserIcon;
