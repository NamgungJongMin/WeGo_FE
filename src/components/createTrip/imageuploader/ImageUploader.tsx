'use client';

import { useState, useRef, useEffect } from 'react';
import ImageUploadButton from './ImageUploadButton';
import ImagePreview from './ImagePreview';

interface Props {
  size?: 'default' | 'small';
}

const ImageUploader = ({ size }: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const handleImageChange = (imageUrl: string) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = imageUrl;
    setImage(imageUrl);
  };

  const handleRemoveImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setImage(null);
  };

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const id = 'image';
  return (
    <div className="relative flex w-fit flex-col gap-1.5">
      <label
        htmlFor={id}
        className="w-fit cursor-pointer text-sm text-label-normal after:ml-0.5 after:text-status-infomative after:content-['*']"
      >
        사진 추가하기
      </label>
      {image ? (
        <>
          <span
            role="button"
            tabIndex={0}
            className="absolute right-0 top-0 text-sm text-label-alternative underline"
            onClick={handleRemoveImage}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleRemoveImage();
            }}
            aria-label="이미지 편집 버튼"
          >
            편집
          </span>
          <ImagePreview src={image} size={size} />
        </>
      ) : (
        <ImageUploadButton
          id={id}
          onImageChange={handleImageChange}
          size={size}
        />
      )}
    </div>
  );
};

export default ImageUploader;
