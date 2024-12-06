import HeroSection from '@/components/main/HeroSection';
import WeeklyPopularContainer from '@/components/main/weeklyTravel/WeeklyPopularContainer';
import WeeklyReviewContainer from '@/components/main/weeklyReview/WeeklyReviewContainer';
import WeeklyUserContainer from '@/components/main/weeklyUser/WeeklyUserContainer';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <WeeklyPopularContainer />
      <WeeklyReviewContainer />
      <WeeklyUserContainer />
    </main>
  );
};
export default Home;
