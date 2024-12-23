import Image from 'next/image';
import IconCamera from '@/assets/icon/icon_camera.svg';

interface Props {
  previewImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ previewImage, handleImageChange }: Props) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative mb-4 mt-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200">
        {previewImage ? (
          <Image
            src={previewImage}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
        ) : (
          <IconCamera />
        )}

        <label
          htmlFor="profile-image"
          className="absolute top-0 h-full w-full cursor-pointer"
        >
          <span className="sr-only">이미지 업로드</span>
        </label>
        <input
          id="profile-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
