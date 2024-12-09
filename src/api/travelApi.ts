import { Travel, TravelDetail } from '@/@types/travel';

export const fetchPopularTravel = async (): Promise<Travel[]> => {
  const response = await fetch('/api/travels/popular');
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getTravelDetail = async ({
  id,
}: {
  id: string;
}): Promise<TravelDetail> => {
  const response = await fetch(`/api/travels/${id}`);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
