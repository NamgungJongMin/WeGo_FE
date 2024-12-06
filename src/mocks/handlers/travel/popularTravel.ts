import { http, HttpResponse } from 'msw';
import travelList from '@/mocks/data/travel/travelList.json';

const popularTravel = [
  http.get('/api/travels/popular', async () => {
    return HttpResponse.json(travelList);
  }),
];

export default popularTravel;
