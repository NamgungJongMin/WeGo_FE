const AUTH_LABEL = {
  email: '이메일(아이디)',
  password: '비밀번호',
  passwordConfirm: '비밀번호 확인',
  currentPassword: '현재 비밀번호',
  newPassword: '새로운 비밀번호',
  name: '이름',
  nickname: '닉네임',
  birthDate: '생년월일',
  contact: '전화번호',
  emailCode: '인증 번호',
} as const;

const AUTH_ERROR_MESSAGE = {
  email: '올바른 이메일 형식을 입력해주세요.',
  emailSend: '이미 가입된 이메일 입니다.',
  password: '영문, 숫자를 포함한 8-15자리를 입력해주세요',
  passwordConfirm: '비밀번호가 일치하지 않습니다',
  currentPassword: '현재 비밀번호를 정확히 입력해주세요.',
  newPassword: '영문, 숫자를 포함한 8-15자리를 입력해주세요',
  name: '이름을 올바르게 입력해주세요.',
  nickname: '2-10자 사이로 입력해주세요',
  birthDate: '올바른 생년월일을 입력해주세요',
  contact: '올바른 연락처 번호를 입력해주세요',
  emailCode: '이메일 인증이 실패 하였습니다.',
} as const;

const REGEX = {
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/,
  currentPassword: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/,
  newPassword: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/,
  name: /^[가-힣]{2,10}$/,
  nickname: /^[가-힣]{2,10}$/,
  birthDate: /^\d{6}$/,
  contact: /^\d{2,3}-\d{3,4}-\d{4}$/,
  emailCode: /^\d{6}$/,
} as const;

const AUTH_PLACEHOLDER = {
  email: '이메일을 입력해주세요.',
  password: '8-15자리의 비밀번호를 입력해주세요.',
  passwordConfirm: '비밀번호를 다시 한 번 입력해주세요.',
  currentPassword: '현재 비밀번호를 입력해주세요.',
  newPassword: '8-15자리의 비밀번호를 입력해주세요.',
  name: '이름을 입력해주세요.',
  nickname: '닉네임을 입력해주세요.',
  birthDate: '생년월일 6자리를 입력해주세요.',
  contact: '연락처를 입력해 주세요.',
  emailCode: '인증 번호를 입력해주세요.',
} as const;

const AUTH_SUCCESS_MESSAGE = {
  emailCode: '이메일 인증이 완료되었습니다.',
  signup: '회원가입이 완료되었습니다.',
} as const;

const NEED_LOGIN_PATH = {
  mypage: '/mypage',
  editProfile: '/editProfile',
  userSetting: '/userSetting',
  resetPassword: '/resetPassword/userPassword',
  deleteAccount: '/deleteAccount',
  travelNew: '/travel/new',
  reviewNew: '/review/new',
  chat: '/chat',
} as const;

const NEED_LOGOUT_PATH = {
  login: '/login',
  signup: '/signup',
  resetPassword: '/resetPassword/authPassword',
  findPassword: '/findPassword',
} as const;

export {
  AUTH_LABEL,
  AUTH_ERROR_MESSAGE,
  REGEX,
  AUTH_PLACEHOLDER,
  AUTH_SUCCESS_MESSAGE,
  NEED_LOGIN_PATH,
  NEED_LOGOUT_PATH,
};
