import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const TextInputVariants = cva(
  'mt-[6px] rounded-md border border-[#e0e0e2] p-2 mx-auto outline-none h-11 text-xs focus:border-[#222] p-4',
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
      spellCheck="false"
      maxLength={maxLength}
      placeholder={placeholder}
      className={cn(TextInputVariants({ size, className }), classNameCondition)}
      onChange={onChange}
    />
  );
};

export default TextInput;
