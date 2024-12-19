import { getTravels } from '@/api/travelApi';
import { useTravelListStore } from '@/store/useTravelListStore';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetTravelsList = () => {
  const filters = useTravelListStore((state) => state.filters);

  return useInfiniteQuery({
    queryKey: ['travels', filters],
    queryFn: ({ pageParam }) => getTravels({ pageParam, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNext ? pages.length + 1 : undefined;
    },
  });
};

export default useGetTravelsList;
