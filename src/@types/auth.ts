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

export type { TextInput, PasswordInput };
