'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/common/button/Button';
import { useRouter } from 'next/navigation';
import useEditProfile from '@/queries/user/useEditProfile';
import Nickname from './input/Nickname';
import ProfileImage from './input/ProfileImage';
import IntroductionInput from './input/Introduction';

interface ProfileFormData {
  image: File | null;
  nickname: string;
  introduction: string;
}

const EditForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileFormData>({
    image: null,
    nickname: '',
    introduction: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  const { mutate: editProfile } = useEditProfile();

  const isValid = () => {
    return !formData.image && !formData.nickname && !formData.introduction;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleNicknameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, nickname: value }));
  };

  const handleIntroductionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, introduction: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    if (formData.nickname) {
      formDataToSend.append('nickname', formData.nickname);
    }
    if (formData.introduction) {
      formDataToSend.append('introduction', formData.introduction);
    }

    editProfile(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5" aria-label="프로필 수정 폼">
      <ProfileImage
        previewImage={previewImage}
        handleImageChange={handleImageChange}
      />

      <Nickname
        value={formData.nickname}
        onChange={(e) => {
          handleNicknameChange(e.target.value);
        }}
      />

      <IntroductionInput
        value={formData.introduction}
        onChange={(e) => {
          handleIntroductionChange(e.target.value);
        }}
      />

      <div className="flex justify-center gap-4">
        <Button size="half" fill="white" handler={() => router.back()}>
          취소
        </Button>
        <Button type="submit" size="half" disabled={isValid()}>
          저장
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
