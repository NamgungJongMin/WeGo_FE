import { fetchPopularUser } from '@/api/userApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyUser from './WeeklyUser';

const WeeklyUserContainer = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', 'popular'],
    queryFn: fetchPopularUser,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyUser />
    </HydrationBoundary>
  );
};
export default WeeklyUserContainer;
