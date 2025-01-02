import type { ValidateOptions } from '@/@types/auth';
import { REGEX } from '@/constants/auth';

const validate = ({ name, value, password }: ValidateOptions): boolean => {
  switch (name) {
    case 'email':
      return REGEX.email.test(value);
    case 'password':
      return REGEX.password.test(value);
    case 'passwordConfirm':
      return password ? value === password : false;
    case 'currentPassword':
      return REGEX.currentPassword.test(value);
    case 'newPassword':
      return REGEX.newPassword.test(value);
    case 'name':
      return REGEX.name.test(value);
    case 'nickname':
      return REGEX.nickname.test(value);
    case 'contact':
      return REGEX.contact.test(value);
    case 'birthDate':
      return REGEX.birthDate.test(value);
    case 'verifyNumber':
      return REGEX.verifyNumber.test(value);
    default:
      return false;
  }
};

export default validate;
