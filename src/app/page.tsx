import { Suspense } from 'react';
import HeroSection from '@/components/main/HeroSection';
import WeeklyPopularContainer from '@/components/main/weeklyTravel/WeeklyPopularContainer';
import WeeklyReviewContainer from '@/components/main/weeklyReview/WeeklyReviewContainer';
import WeeklyUserContainer from '@/components/main/weeklyUser/WeeklyUserContainer';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <Suspense fallback="로딩중">
        <WeeklyPopularContainer />
      </Suspense>
      <Suspense fallback="로딩중">
        <WeeklyReviewContainer />
      </Suspense>
      <Suspense fallback="로딩중">
        <WeeklyUserContainer />
      </Suspense>
    </main>
  );
};
export default Home;
