'use client';

import cn from '@/utils/cn';
import {
  AUTH_LABEL,
  AUTH_ERROR_MESSAGE,
  AUTH_PLACEHOLDER,
} from '@/constants/auth';
import type { PasswordInput as PasswordInputType } from '@/@types/auth';
import PasswordInput from '@/components/common/input/PasswordInput';
import { memo } from 'react';

interface Props {
  name: keyof PasswordInputType;
  value: string;
  isValid: boolean | null;
  important?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthPassword = memo(
  ({ name, value, isValid, important, onChange }: Props) => {
    return (
      <div className="relative mb-6">
        <label htmlFor={name}>
          {AUTH_LABEL[name]}
          {important && (
            <span className="ml-[2px] text-status-infomative">*</span>
          )}
        </label>

        <PasswordInput
          name={name}
          value={value}
          placeholder={AUTH_PLACEHOLDER[name]}
          onChange={onChange}
          classNameCondition={{
            'border-label-normal': isValid === true,
            'border-status-error focus:border-status-error':
              Boolean(value) && isValid === false,
          }}
        />

        <p
          className={cn('mt-1 text-xs', {
            'text-red-500': value && isValid === false,
          })}
        >
          {value && isValid === false ? AUTH_ERROR_MESSAGE[name] : ''}
        </p>
      </div>
    );
  },
);

AuthPassword.displayName = 'AuthPassword';

export default AuthPassword;
