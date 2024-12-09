import Image, { StaticImageData } from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';

const UserIconVariants = cva('rounded-full overflow-hidden', {
  variants: {
    size: {
      default: 'w-16 h-16', // 64px
      sm: 'w-9 h-9', // 36px
      lg: 'w-20 h-20', // 80px
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

const sizeMapping = {
  default: 64,
  sm: 36,
  lg: 80,
};

const UserIcon = ({ profileImage, nickname, size = 'default' }: Props) => {
  const sizeInPx = sizeMapping[size ?? 'default'];
  return (
    <div className={UserIconVariants({ size })}>
      <Image
        src={profileImage || '/default_profile.png'}
        alt={`${nickname ?? '유저'}의 프로필 이미지`}
        width={sizeInPx}
        height={sizeInPx}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
export default UserIcon;
