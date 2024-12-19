import { Filters } from '@/@types/travel';

const buildTravelUrl = ({
  startAt,
  endAt,
  isDomestic,
  sortOrder,
  searchText,
}: Filters): string => {
  const params = new URLSearchParams();

  if (startAt) params.append('startAt', startAt);
  if (endAt) params.append('endAt', endAt);
  if (isDomestic !== null) params.append('isDomestic', String(isDomestic));
  if (sortOrder !== null) params.append('sortOrder', String(sortOrder));
  if (searchText) params.append('query', searchText);

  return `${process.env.NEXT_PUBLIC_BASE_URL}/travels${params.toString() ? `?${params.toString()}` : ''}`;
};

export default buildTravelUrl;
