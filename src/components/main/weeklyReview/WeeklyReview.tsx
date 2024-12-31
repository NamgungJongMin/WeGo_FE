'use client';

import Link from 'next/link';
import AddCircle from '@/assets/add.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MainReviewCard from '@/components/card/Review/MainReviewCard';
import 'swiper/css';
import 'swiper/css/pagination';
import { Review } from '@/@types/review';

const WeeklyReview = ({ reviewList }: { reviewList: Review[] }) => {
  return (
    <section className="flex flex-col justify-start gap-5 bg-black px-5 py-10 md:px-10">
      <header className="m-auto w-full max-w-[1400px] justify-start">
        <h2 className="title-3-eb pb-1.5 text-white">여행리뷰 모아보기</h2>
        <p className="body-2-m text-label-alternative">
          다양한 여행모임 후기들을 한눈에 확인해요!
        </p>
      </header>
      <main
        className="flex xl:max-w-[1400px] 2xl:m-auto"
        aria-label="이미지 가로 슬라이드"
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor
          modules={[Pagination]}
          style={{ width: '100%', height: 'auto' }}
          breakpoints={{
            768: {
              spaceBetween: 24,
            },
          }}
        >
          {reviewList &&
            reviewList.map((review) => (
              <SwiperSlide
                key={review.reviewId}
                style={{ width: 'auto', height: 'auto' }}
              >
                <MainReviewCard
                  reviewId={review.reviewId}
                  nickname={review.nickname}
                  reviewImage={review.reviewImage}
                />
              </SwiperSlide>
            ))}
          <SwiperSlide style={{ width: '120px' }}>
            <Link href="/review" className="flex h-full items-center p-5">
              <AddCircle
                width={36}
                height={36}
                aria-label="더 많은 리뷰 보기"
                className="text-primary-white"
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </main>
    </section>
  );
};

export default WeeklyReview;
