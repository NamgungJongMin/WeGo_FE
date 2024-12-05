import { useState, useCallback, useEffect, useMemo } from 'react';
import validate from '@/utils/validateAuthInput';
import { debounce } from 'lodash';
import { PasswordInput, TextInput } from '@/@types/auth';

interface Props {
  name: keyof TextInput | keyof PasswordInput;
  password?: string;
}

const useAuthInput = ({ name, password }: Props) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const debouncedValidate = useMemo(
    () =>
      debounce((newValue: string) => {
        if (!newValue) {
          setIsValid(null);
          return;
        }

        const validationResult = validate({ name, value: newValue, password });

        setIsValid(validationResult);
      }, 250),
    [name, password],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      setValue(newValue);
      debouncedValidate(newValue);
    },
    [debouncedValidate],
  );

  useEffect(() => {
    return () => {
      debouncedValidate.cancel();
    };
  }, [debouncedValidate]);

  return {
    value,
    isValid,
    setValue,
    setIsValid,
    handleChange,
  };
};

export default useAuthInput;
