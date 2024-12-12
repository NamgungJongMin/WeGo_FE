'use client';

import BlankIcon from '@/assets/blank.svg';

const PreviewSelectTravelReview = () => {
  return (
    <div className="heading-1-sb flex h-64 flex-col items-center justify-center gap-4 text-label-alternative">
      <BlankIcon />
      <div>아직 작성된 리뷰가 없어요!</div>
    </div>
  );
};

export default PreviewSelectTravelReview;
