/* eslint-disable react/no-array-index-key */

'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { cva } from 'class-variance-authority';

const slideClasses = cva(
  'title-5-sb z-10 flex h-full items-center justify-center text-label-normal transition-all',
  {
    variants: {
      state: {
        active: 'opacity-100',
        near: 'opacity-50',
        far: 'opacity-25',
      },
    },
    defaultVariants: {
      state: 'active',
    },
  },
);

interface Props {
  timeList: string[];
  isLoop?: boolean;
  onSlide: (time: string) => void;
  selectedIndex: number;
}

const TimePickerSlider = ({
  onSlide,
  timeList,
  isLoop = true,
  selectedIndex,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const handleSlideChange = (swiper: SwiperClass) => {
    onSlide(timeList[swiper.realIndex]);
    setActiveIndex(swiper.realIndex);
  };

  const getSlideState = (index: number): 'active' | 'near' | 'far' => {
    if (activeIndex === index) return 'active';
    if (Math.abs(activeIndex - index) === 1) return 'near';
    return 'far';
  };

  return (
    <div
      className="relative h-[162px] w-[159.5px] overflow-hidden bg-background-normal"
      role="listbox"
      aria-label="시간 선택 슬라이더"
    >
      <div className="z-1 absolute left-0 top-1/2 h-[32px] w-full -translate-y-1/2 rounded-lg bg-slate-100" />
      <Swiper
        effect="coverflow"
        onSlideChange={handleSlideChange}
        direction="vertical"
        slidesPerView={5}
        initialSlide={selectedIndex}
        loop={isLoop}
        centeredSlides
        grabCursor
        coverflowEffect={{
          depth: 150,
          rotate: 0,
          scale: 0.85,
          modifier: 1.5,
          slideShadows: false,
          stretch: -10,
        }}
        modules={[EffectCoverflow]}
        className="h-full w-full text-center"
      >
        {timeList.map((time, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={slideClasses({
                  state: getSlideState(index),
                })}
                role="option"
                aria-selected={activeIndex === index}
              >
                {time}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TimePickerSlider;
