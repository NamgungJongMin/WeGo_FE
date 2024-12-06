import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const TextInputVariants = cva(
  'mt-[6px] rounded-md border border-line-normal p-2 mx-auto outline-none h-[46px] text-xs focus:border-line-strong disabled:border-line-normal disabled:bg-interaction-disable p-4',
  {
    variants: {
      size: {
        default: 'w-[335px]',
        withButton: 'w-[218px]',
        halfButton: 'w-[164px]',
      },
    },
  },
);

interface Props extends VariantProps<typeof TextInputVariants> {
  type: string;
  name: string;
  value: string;
  disabled?: boolean;
  maxLength?: number;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  type,
  name,
  value,
  disabled,
  maxLength,
  readOnly,
  placeholder,
  size,
  className,
  classNameCondition,
  onChange,
  onKeyDown,
  onClick,
}: Props) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      spellCheck="false"
      maxLength={maxLength}
      readOnly={readOnly}
      placeholder={placeholder}
      autoComplete="off"
      className={cn(TextInputVariants({ size, className }), classNameCondition)}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={onClick}
    />
  );
};

export default TextInput;
