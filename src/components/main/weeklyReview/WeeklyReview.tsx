'use client';

import Link from 'next/link';
import AddCircle from '@/assets/add.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ReviewCard from '@/components/card/ReviewCard';
import 'swiper/css';
import 'swiper/css/pagination';
import { fetchPopularReview } from '@/api/reviewApi';
import { useQuery } from '@tanstack/react-query';

const WeeklyReview = () => {
  const {
    data: reviewList,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['review', 'popular'],
    queryFn: fetchPopularReview,
  });
  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-start gap-5 bg-black py-10 pl-5">
      <header>
        <h2 className="pb-[6px] text-2xl font-extrabold text-white">
          여행리뷰 모아보기
        </h2>
        <p className="text-label-alternative">
          다양한 여행모임 후기들을 한눈에 확인해요!
        </p>
      </header>
      <main className="flex overflow-hidden">
        {isLoading && <div>로딩중 WeeklyReview</div>}
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor
          modules={[Pagination]}
          style={{ width: '375px' }}
        >
          {reviewList &&
            reviewList.map((review) => (
              <SwiperSlide key={review.reviewId} style={{ width: '180px' }}>
                <ReviewCard
                  reviewId={review.reviewId}
                  nickname={review.nickname}
                  reviewImage={review.reviewImage}
                />
              </SwiperSlide>
            ))}
          <SwiperSlide style={{ width: '120px' }}>
            <Link
              href="/"
              aria-label="더 많은 리뷰 보기"
              className="flex h-full items-center p-5"
            >
              <AddCircle
                width={36}
                height={36}
                aria-hidden="true"
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
