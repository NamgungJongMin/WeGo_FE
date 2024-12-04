import Image from 'next/image';
import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const imagePreviewVariants = cva('relative h-[120px] ', {
  variants: {
    size: {
      default: 'w-[335px]',
      small: 'w-[295px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface Props extends VariantProps<typeof imagePreviewVariants> {
  src: string;
  size?: 'default' | 'small';
  className?: string;
  classNameCondition?: Record<string, boolean>;
}

const ImagePreview = ({ src, size, className, classNameCondition }: Props) => (
  <div
    className={cn(
      imagePreviewVariants({ size, className }),
      classNameCondition,
    )}
  >
    <Image
      src={src}
      alt="업로드된 이미지 미리보기"
      fill
      className="object-contain"
    />
  </div>
);

export default ImagePreview;
