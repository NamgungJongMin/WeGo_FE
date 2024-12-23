'use client';

import Image from 'next/image';
import DefaultProfile from '@/assets/icon/default_profile.svg';
import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';
import useGetUser from '@/queries/user/useGetUser';

const ProfileSection = () => {
  const { data: user } = useGetUser();

  return (
    <section className="relative mx-auto h-[280px] max-w-[335px]">
      <Link href="/editProfile" className="absolute top-3">
        <ButtonRounded label="프로필 수정" type="profileEdit" />
      </Link>

      <div className="flex flex-col items-center justify-center">
        <div className="mt-9 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200">
          {user?.profileImage ? (
            <Image
              src={user.profileImage}
              alt="프로필 이미지"
              className="object-cover"
              width={80}
              height={80}
            />
          ) : (
            <DefaultProfile aria-label="기본 프로필 이미지" />
          )}
        </div>

        <p className="title-5-b mt-4">{user?.nickname}</p>
        <p className="body-3-r text-label-alternative">{user?.email}</p>
        <p className="body-2-sb mt-6 flex h-[46px] w-[335px] items-center justify-center rounded-[44px] bg-label-normal text-primary-white">
          {user?.description}
        </p>
      </div>
    </section>
  );
};

export default ProfileSection;
