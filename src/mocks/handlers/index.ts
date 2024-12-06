import login from './login';
import signup from './signup';
import popularTravel from './travel/popularTravel';
import popularReview from './review/popularReview';
import popularUser from './user/popularUser';

export const handlers = [
  login,
  ...signup,
  ...popularTravel,
  ...popularReview,
  ...popularUser,
];
