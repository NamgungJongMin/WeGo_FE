import { http, HttpResponse } from 'msw';
import travel from '@/mocks/data/travel/travelDetail.json';

const travelDetail = [
  http.get('/api/travels/1', async () => {
    return HttpResponse.json(travel);
  }),
];

export default travelDetail;
