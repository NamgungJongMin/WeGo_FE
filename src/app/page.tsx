import HeroBackgroundImage from '@/components/main/HeroBackgroundImage';
import HeroSection from '@/components/main/HeroSection';
import WeeklyPopular from '@/components/main/WeeklyPopular';
import travelList from '@/mocks/travel/travelList.json';

export default function Home() {
  return (
    <div className="">
      <HeroBackgroundImage />
      <HeroSection />
      <WeeklyPopular travelList={travelList} />
    </div>
  );
}
