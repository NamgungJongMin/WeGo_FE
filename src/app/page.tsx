import HeroSection from '@/components/main/HeroSection';
import WeeklyPopular from '@/components/main/WeeklyPopular';
import travelList from '@/mocks/travel/travelList.json';
import ReviewListSection from '@/components/main/ReviewListSection';
import reviewList from '@/mocks/review/reviewList.json';
import userList from '@/mocks/user/popularUser.json';
import UserPopular from '@/components/main/Userpopular';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <WeeklyPopular travelList={travelList} />
      <ReviewListSection reviewList={reviewList} />
      <UserPopular userList={userList} />
    </main>
  );
};
export default Home;
