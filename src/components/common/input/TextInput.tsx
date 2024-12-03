import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const TextInputVariants = cva(
  'mt-[6px] rounded-md border border-[#e0e0e2] p-2 mx-auto outline-none h-[46px] text-xs focus:border-[#222] disabled:border-[#e0e0e2] disabled:bg-[#f7f7f8] p-4',
  {
    variants: {
      size: {
        default: 'w-[335px]',
        withButton: 'w-[218px]',
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
  placeholder?: string;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  type,
  name,
  value,
  disabled,
  maxLength,
  placeholder,
  size,
  className,
  classNameCondition,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      spellCheck="false"
      maxLength={maxLength}
      placeholder={placeholder}
      autoComplete="off"
      className={cn(TextInputVariants({ size, className }), classNameCondition)}
      onChange={onChange}
    />
  );
};

export default TextInput;