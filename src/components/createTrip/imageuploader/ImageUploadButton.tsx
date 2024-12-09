'use client';

import { useRef } from 'react';
import Photo from '@/assets/photo.svg';
import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const uploadButtonVariants = cva(
  'h-[120px] cursor-pointer flex flex-col items-center justify-center bg-background-alternative rounded',
  {
    variants: {
      size: {
        default: 'w-[335px]',
        small: 'w-[295px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface Props extends VariantProps<typeof uploadButtonVariants> {
  id: string;
  size?: 'default' | 'small';
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onImageChange: (imageUrl: string) => void;
}

const ImageUploadButton = ({
  id,
  size,
  className,
  classNameCondition,
  onImageChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      onImageChange(imageUrl);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        uploadButtonVariants({ size, className }),
        classNameCondition,
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      aria-label="이미지 업로드 버튼"
    >
      <Photo />
      <span className="text-xs text-label-alternative">
        이미지를 등록 해 주세요.
      </span>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadButton;
