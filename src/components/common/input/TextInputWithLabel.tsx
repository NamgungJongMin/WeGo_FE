import React from 'react';
import TextInput from '@/components/common/input/TextInput';

interface Props {
  label: string | React.ReactNode;
  srOnly?: boolean;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  size?: 'default' | 'withButton';
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const TextInputWithLabel = ({
  label,
  srOnly,
  name,
  type,
  value,
  placeholder,
  maxLength,
  size,
  className,
  classNameCondition,
  onChange,
  children,
}: Props) => {
  return (
    <div className="flex w-fit flex-col gap-1.5">
      <label
        htmlFor={name}
        className={`${srOnly && 'sr-only'} w-fit cursor-pointer text-sm text-label-normal`}
      >
        {label}
      </label>
      <div className="relative">
        <TextInput
          type={type}
          name={name}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          size={size}
          className={`${className} border-label-normal placeholder-shown:border-line-normal`}
          classNameCondition={{
            ...classNameCondition,
            'peer pl-[38px]': !!children,
          }}
          onChange={onChange}
        />
        <div className="absolute bottom-3.5 left-4 h-[18px] w-[18px] peer-placeholder-shown:text-label-alternative peer-focus:text-label-normal">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TextInputWithLabel;
