import { fetchPopularTravel } from '@/api/travelApi';
import WeeklyPopular from './WeeklyPopular';

const WeeklyPopularContainer = async () => {
  try {
    const travelList = await fetchPopularTravel();
    return <WeeklyPopular travelList={travelList} />;
  } catch (error) {
    console.error('Failed to fetch travel data:', error);
    return (
      <div>데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.</div>
    );
  }
};
export default WeeklyPopularContainer;
