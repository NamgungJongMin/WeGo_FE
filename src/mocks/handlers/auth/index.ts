import { login } from './login';
import { signup } from './signup';
import { resetPassword } from './resetPassword';
import { deleteAccount } from './deleteAccount';
import { findPassword } from './findPassword';
import { verifyToken } from './verifyToken';

export const auth = [
  verifyToken,
  login,
  findPassword,
  ...resetPassword,
  ...signup,
  ...deleteAccount,
];
