import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const TextareaContainerVariants = cva(
  'relative inline-block rounded border transition-colors ',
  {
    variants: {
      size: {
        default:
          'w-[335px] h-[160px] focus-within:border-line-strong border-line-normal',
        small:
          'w-[295px] h-[90px] focus-within:border-label-neutral border-background-alternative',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const TextareaVariants = cva(
  'rounded py-3 px-4 outline-none text-sm resize-none pb-0 placeholder-shown:border-none w-full',
  {
    variants: {
      size: {
        default: 'h-[130px]',
        small: 'h-[60px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface Props extends VariantProps<typeof TextareaVariants> {
  name: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  size?: 'default' | 'small';
  className?: string;
  extraClassName?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  name,
  value,
  placeholder,
  maxLength = 100,
  size = 'default',
  className,
  extraClassName,
  classNameCondition,
  onChange,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      onChange(e);
    }
  };
  return (
    <div
      className={cn(
        TextareaContainerVariants({ size }),
        {
          'border-line-strong': !!value,
        },
        extraClassName,
      )}
    >
      <textarea
        id={name}
        name={name}
        value={value}
        spellCheck="false"
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn(
          TextareaVariants({ size, className }),
          classNameCondition,
        )}
        onChange={handleChange}
        aria-label={`최대 ${maxLength}자 입력 가능 textarea`}
      />
      <span className="absolute bottom-3 right-4 text-xs text-[#989BA1]">
        {value.length}/{maxLength}
      </span>
    </div>
  );
};

export default Textarea;
