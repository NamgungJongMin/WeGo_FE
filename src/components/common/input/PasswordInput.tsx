import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import PwOpen from '@/assets/pw_open.svg';
import PwClose from '@/assets/pw_close.svg';
import { useState } from 'react';

const PasswordInputVariants = cva(
  'mt-[6px] rounded-md border border-[#e0e0e2] p-2 mx-auto outline-none h-11 text-xs focus:border-[#222] p-4',
  {
    variants: {
      size: {
        default: 'w-[335px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface Props extends VariantProps<typeof PasswordInputVariants> {
  name: string;
  value: string;
  placeholder?: string;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  name,
  value,
  placeholder,
  size,
  className,
  classNameCondition,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <input
        type={isOpen ? 'text' : 'password'}
        name={name}
        value={value}
        spellCheck="false"
        maxLength={15}
        placeholder={placeholder}
        className={cn(
          PasswordInputVariants({ size, className }),
          classNameCondition,
        )}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute right-[13px] top-[19px]"
        onClick={clickButton}
      >
        {isOpen ? (
          <PwClose width={20} height={20} />
        ) : (
          <PwOpen width={20} height={20} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
