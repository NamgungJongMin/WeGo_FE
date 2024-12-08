'use client';

import cn from '@/utils/cn';
import {
  AUTH_LABEL,
  AUTH_ERROR_MESSAGE,
  AUTH_PLACEHOLDER,
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
  successMailSend?: boolean | null;
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
    successMailSend,
    className,
    classNameCondition,
    children,
    onChange,
  }: Props) => {
    return (
      <div
        className={cn('relative mb-6', {
          'mb-0': name === 'emailCode' || successMailSend !== undefined,
        })}
      >
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
                successMailSend === false ||
                (Boolean(value) && isValid !== null && isValid === false),
              'mx-0': Boolean(children),
            }}
            onChange={onChange}
          />
          {children && children}
        </div>

        <p
          className={cn('mt-1 text-xs', {
            'text-status-error': successMailSend === false || isValid === false,
          })}
        >
          {name !== 'emailCode' && isValid === false && value
            ? AUTH_ERROR_MESSAGE[name]
            : null}
        </p>
      </div>
    );
  },
);

AuthText.displayName = 'AuthText';

export default AuthText;
