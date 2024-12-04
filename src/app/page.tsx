import HeroSection from '@/components/main/HeroSection';
import WeeklyPopular from '@/components/main/WeeklyPopular';
import travelList from '@/mocks/travel/travelList.json';
import ReviewListSection from '@/components/main/ReviewListSection';
import reviewList from '@/mocks/review/reviewList.json';

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <WeeklyPopular travelList={travelList} />
      <ReviewListSection reviewList={reviewList} />
    </div>
  );
}
