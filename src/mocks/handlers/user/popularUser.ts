import { http, HttpResponse } from 'msw';
import userList from '@/mocks/data/user/userList.json';

const popularUser = [
  http.get('/api/users/popular', async () => {
    return HttpResponse.json(userList);
  }),
];

export default popularUser;
