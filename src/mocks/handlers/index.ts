import login from './auth/login';
import signup from './auth/signup';
import popularTravel from './travel/popularTravel';
import popularReview from './review/popularReview';
import popularUser from './user/popularUser';
import resetPassword from './auth/resetPassword';
import findPassword from './auth/findPassword';
import deleteAccount from './auth/deleteAccount';
import editProfile from './user/editProfile';
import travelDetail from './travel/travelDetail';
import travelDetailReview from './review/travelDetailReview';

export const handlers = [
  // auth
  login,
  ...signup,
  // 메인
  ...popularTravel,
  ...popularReview,
  ...popularUser,
  // 회원 정보 수정
  ...resetPassword,
  findPassword,
  ...deleteAccount,
  editProfile,
  // 여행[id]
  ...travelDetail,
  ...travelDetailReview,
];
