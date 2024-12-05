interface TextInput {
  email: string;
  emailCode: number;
  name: string;
  nickname: string;
  birthDate: number;
  contact: string;
}

interface PasswordInput {
  password: string;
  passwordConfirm: string;
}

interface ValidateOptions {
  name: keyof TextInput | keyof PasswordInput;
  value: string;
  password?: string;
}

export type { TextInput, PasswordInput, ValidateOptions };
