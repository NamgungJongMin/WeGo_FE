'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import Link from 'next/link';

const slideData = ['/hero1.png', '/hero2.png', '/hero3.png'];
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <section className="relative flex h-[440px] w-full items-center justify-center pt-20">
      <div className="absolute inset-0 z-0 h-[484px] w-full overflow-hidden">
        <Image
          src={slideData[currentSlide] || '/hero1.png'}
          alt="배경효과 이미지"
          width={1000}
          height={1000}
          className="h-full w-full scale-110 object-cover blur-lg"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white via-90% to-white" />
      </div>
      <Swiper
        spaceBetween={10}
        centeredSlides
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        grabCursor
        onSlideChange={handleSlideChange}
        style={{ width: '350px' }}
      >
        {slideData.map((src) => (
          <SwiperSlide key={src}>
            <div className="relative z-10 flex items-center justify-center">
              <Link href="/">
                <Image
                  src={src}
                  alt="여행 모임 홍보 이미지"
                  width={335}
                  height={360}
                  className="rounded-lg"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default HeroSection;
