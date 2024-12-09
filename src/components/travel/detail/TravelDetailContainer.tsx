import travelDatail from '@/mocks/data/travel/travelDetail.json';
import { TravelDetail as TravelDetailType } from '@/@types/travel';

import TravelDetail from './TravelDetail';

const TravelDetailContainer = () => {
  const data: TravelDetailType = travelDatail;
  return <TravelDetail travelDetail={data} />;
};

export default TravelDetailContainer;
