import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTravelDetail } from '@/api/travelApi';
import { QUERY_KEYS } from '@/constants/querykeys';
import TravelDetail from './TravelDetail';

const TravelDetailContainer = async ({ id }: { id: string }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_DELETE(id),
    queryFn: () => getTravelDetail({ id }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravelDetail id={id} />
    </HydrationBoundary>
  );
};

export default TravelDetailContainer;
