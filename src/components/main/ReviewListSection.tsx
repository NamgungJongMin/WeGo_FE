'use client';

import Link from 'next/link';
import AddCircle from '@/assets/add.svg';
import { Review } from '@/@types/review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ReviewCard from '../card/ReviewCard';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  reviewList: Review[];
}

const ReviewListSection = ({ reviewList }: Props) => {
  return (
    <section className="flex flex-col justify-start gap-5 bg-black py-10 pl-5">
      <div>
        <div className="text-2xl font-extrabold text-white">
          여행리뷰 모아보기
        </div>
        <div className="text-[#878A92]">
          다양한 여행모임 후기들을 한눈에 확인해요!
        </div>
      </div>
      <div className="flex overflow-hidden">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor
          modules={[Pagination]}
          style={{ width: '375px' }}
        >
          {reviewList.map((review) => (
            <SwiperSlide key={review.reviewId} style={{ width: '180px' }}>
              <ReviewCard
                key={review.reviewId}
                reviewId={review.reviewId}
                nickname={review.nickname}
                reviewImage={review.reviewImage}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ width: '120px' }}>
            <Link href="/" className="flex h-full items-center p-5">
              <AddCircle width={36} height={36} className="text-[#ffffff]" />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewListSection;
