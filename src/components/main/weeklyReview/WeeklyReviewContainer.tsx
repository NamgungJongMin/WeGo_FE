import { fetchPopularReview } from '@/api/reviewApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyReview from './WeeklyReview';

const WeeklyReviewContainer = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['travels', 'popular'],
    queryFn: fetchPopularReview,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyReview />
    </HydrationBoundary>
  );
};

export default WeeklyReviewContainer;
