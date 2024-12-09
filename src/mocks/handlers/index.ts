import login from './auth/login';
import signup from './auth/signup';
import popularTravel from './travel/popularTravel';
import popularReview from './review/popularReview';
import popularUser from './user/popularUser';
import resetPassword from './auth/resetPassword';
import findPassword from './auth/findPassword';
import deleteAccount from './auth/deleteAccount';

export const handlers = [
  login,
  ...signup,
  ...popularTravel,
  ...popularReview,
  ...popularUser,
  ...resetPassword,
  findPassword,
  ...deleteAccount,
];
