import { useTravelIdStore } from '@/store/useTravelIdStore';
import SelectTravelReview from './category/SelectTravelReview';

const SelectTravelReviewContainer = () => {
  const { id } = useTravelIdStore();
  if (!id) return null;
  return <SelectTravelReview id={id} />;
};

export default SelectTravelReviewContainer;
