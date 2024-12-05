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
  isValid: boolean | null;
  disabled?: boolean;
  size?: 'default' | 'withButton';
  important?: boolean;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthText = memo(
  ({
    type,
    name,
    value,
    isValid,
    disabled,
    size = 'default',
    important,
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
          {important && <span className="ml-[2px] text-[#4a8af8]">*</span>}
        </label>

        <div className="flex justify-between">
          <TextInput
            type={type}
            name={name}
            disabled={disabled}
            maxLength={name === 'emailCode' || name === 'birthDate' ? 6 : 25}
            placeholder={AUTH_PLACEHOLDER[name]}
            value={value}
            size={size}
            className={className}
            classNameCondition={{
              ...classNameCondition,
              'border-line-strong': isValid === true,
              'disabled:border-status-infomative':
                name === 'emailCode' && isValid === true,
              'border-status-error focus:border-status-error':
                name !== 'emailCode' && Boolean(value) && isValid === false,
              'mx-0': Boolean(children),
            }}
            onChange={onChange}
          />
          {children && children}
        </div>

        <p
          className={cn('absolute bottom-0 text-xs', {
            'text-status-error':
              name !== 'emailCode' && value && isValid === false,
          })}
        >
          {name !== 'emailCode' && value && isValid === false
            ? AUTH_ERROR_MESSAGE[name]
            : null}
          {name === 'emailCode' && isValid && AUTH_SUCCESS_MESSAGE[name]}
        </p>
      </div>
    );
  },
);

AuthText.displayName = 'AuthText';

export default AuthText;
