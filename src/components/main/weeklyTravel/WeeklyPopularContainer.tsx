import { fetchPopularTravel } from '@/api/travelApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyPopular from './WeeklyPopular';

const WeeklyPopularContainer = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['travels', 'popular'],
    queryFn: fetchPopularTravel,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyPopular />
    </HydrationBoundary>
  );
};
export default WeeklyPopularContainer;
