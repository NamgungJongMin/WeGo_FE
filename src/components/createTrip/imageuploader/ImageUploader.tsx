'use client';

import { useRef, useEffect, useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import ImagePreview from './ImagePreview';

interface Props {
  size?: 'default' | 'small';
  image: File | null;
  onChange: (file: File | null) => void;
}

const ImageUploader = ({ size, image, onChange }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const handleImageChange = (selectedFile: File) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    objectUrlRef.current = objectUrl;
    setImageUrl(objectUrl); // 새로운 URL 설정
    onChange(selectedFile); // 부모 상태 업데이트
  };

  const handleRemoveImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setImageUrl(null);
    onChange(null);
  };

  useEffect(() => {
    if (image) {
      // 이미지가 있는 경우 새로운 URL 생성
      const objectUrl = URL.createObjectURL(image);
      objectUrlRef.current = objectUrl;
      setImageUrl(objectUrl);
    } else {
      setImageUrl(null);
    }

    return () => {
      // 컴포넌트 언마운트 시 URL 해제
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [image]);

  const id = 'image';
  return (
    <div className="relative flex w-fit flex-col gap-1.5">
      <label
        htmlFor={id}
        className="w-fit cursor-pointer text-sm text-label-normal after:ml-0.5 after:text-status-infomative after:content-['*']"
      >
        사진 추가하기
      </label>
      {imageUrl ? (
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
          <ImagePreview src={imageUrl} size={size} />
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
