'use client';

import cn from '@/utils/cn';
import {
  AUTH_LABEL,
  AUTH_ERROR_MESSAGE,
  AUTH_PLACEHOLDER,
  AUTH_SUCCESS_MESSAGE,
} from '@/constants/auth';
import TextInput from '@/components/common/input/TextInput';
import type { TextInput as TextInputType } from '@/@types/auth';
import { memo } from 'react';

interface Props {
  type: 'text' | 'email' | 'tel' | 'number';
  name: keyof TextInputType;
  value: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'default' | 'withButton';
  className?: string;
  classNameCondition?: Record<string, boolean>;
  children?: React.ReactNode;
}

const AuthText = memo(
  ({
    type,
    name,
    value,
    isValid,
    size = 'default',
    className,
    classNameCondition,
    children,
    onChange,
  }: Props) => {
    return (
      <div className="relative">
        <label
          htmlFor={name}
          className={`text-sm ${name === 'emailCode' && 'sr-only'}`}
        >
          {AUTH_LABEL[name]}
        </label>

        <div className="flex justify-between">
          <TextInput
            type={type}
            name={name}
            maxLength={name === 'emailCode' || name === 'birthDate' ? 6 : 25}
            placeholder={AUTH_PLACEHOLDER[name]}
            value={value}
            size={size}
            className={className}
            classNameCondition={{
              ...classNameCondition,
              'border-[#222]': isValid,
              'border-red-500 focus:border-red-500': Boolean(value) && !isValid,
              'mx-0': Boolean(children),
            }}
            onChange={onChange}
          />
          {children && children}
        </div>

        <p
          className={cn('absolute bottom-0 text-xs', {
            'text-red-500': value && !isValid,
            'text-blue-500': name === 'emailCode' && isValid,
          })}
        >
          {value && !isValid
            ? AUTH_ERROR_MESSAGE[name]
            : name === 'emailCode' && isValid && AUTH_SUCCESS_MESSAGE[name]}
        </p>
      </div>
    );
  },
);

AuthText.displayName = 'AuthText';

export default AuthText;
