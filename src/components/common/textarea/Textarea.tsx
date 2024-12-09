import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const TextareaVariants = cva(
  'rounded border py-3 px-4 outline-none text-sm resize-none ',
  {
    variants: {
      size: {
        default:
          'w-[335px] h-[160px] border-line-strong placeholder-shown:border-line-normal focus:border-line-strong',
        small:
          'w-[295px] h-[90px] border-label-assistive placeholder-shown:border-background-alternative focus:border-label-neutral',
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
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  name,
  value,
  placeholder,
  maxLength = 100,
  size,
  className,
  classNameCondition,
  onChange,
}: Props) => {
  return (
    <div
      className={`relative inline-block ${size === 'default' ? 'h-[160px]' : 'h-[90px]'}`}
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
        onChange={onChange}
        aria-label={`최대 ${maxLength}자 입력 가능 textarea`}
      />
      <span className="absolute bottom-5 right-4 text-xs text-[#989BA1]">
        {value.length}/{maxLength}
      </span>
    </div>
  );
};

export default Textarea;
