import { useCallback, useState } from 'react';
import type { TextInput, PasswordInput } from '@/@types/auth';
import validate from '@/utils/validateAuthInput';

interface Props {
  name: keyof TextInput | keyof PasswordInput;
  password?: string;
}

export const useAuthInput = ({ name, password }: Props) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      setValue(newValue);
      setIsValid(validate({ name, value: newValue, password }));
    },
    [name, password],
  );

  return {
    value,
    isValid,
    handleChange,
  };
};
