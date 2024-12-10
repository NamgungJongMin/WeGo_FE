// 'use client';

import BookMarkIcon from '@/assets/bookmark.svg';
import { Participant } from '@/@types/travel';
import { useState } from 'react';
import Link from 'next/link';
import ButtonRounded from '../../common/button/ButtonRounded';
import TravelTag from '../../common/tag/TravelTag';
import UserIcon from '../../common/user/UserIcon';

const SelectTravelDetail = ({
  participant,
  organizer,
  hashTags,
  description,
}: {
  participant: boolean;
  organizer?: Participant;
  hashTags: string;
  description: string;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(participant);

  const onClickBookMark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const hashTagList = hashTags
    .split('#')
    .filter((tag) => tag !== '')
    .map((tag) => tag.trim());

  const userId = 4;

  return (
    <section className="pb-6">
      <div className="flex items-center justify-between pb-[18px]">
        <div className="flex gap-[7px]">
          <UserIcon size="sm" />
          <div>
            <div className="body-2-sb">{organizer && organizer.nickname}</div>
            <div className="body-3-r">2시간 전 업로드</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {organizer?.id !== userId && (
            <button onClick={onClickBookMark} type="button" aria-label="북마크">
              <BookMarkIcon fill={isBookmarked ? '#F87171' : 'white'} />
            </button>
          )}

          <Link href="/">
            <ButtonRounded label="채팅방" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 rounded border px-4 py-5 shadow-custom">
        <article className="body-1-r">{description}</article>
        <div className="flex gap-1.5">
          {hashTagList.map((tag) => (
            <TravelTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectTravelDetail;
