import TextInput from '@/components/common/input/TextInput';
import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const LabelVariants = cva('text-label-normal w-fit cursor-pointer text-sm', {
  variants: {
    state: {
      default: '',
      srOnly: 'sr-only',
      required: "after:text-status-infomative after:ml-0.5 after:content-['*']",
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
interface Props extends VariantProps<typeof LabelVariants> {
  label: string;
  state?: 'default' | 'srOnly' | 'required';
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  size?: 'default' | 'withButton';
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const TextInputWithLabel = ({
  label,
  state,
  name,
  type,
  value,
  placeholder,
  maxLength,
  size,
  className,
  classNameCondition,
  onChange,
  onKeyDown,
  children,
}: Props) => {
  return (
    <div className="flex w-fit flex-col gap-1.5">
      <label
        htmlFor={name}
        className={cn(LabelVariants({ state, className }), classNameCondition)}
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
          onKeyDown={onKeyDown}
        />
        <div className="absolute bottom-3.5 left-4 h-[18px] w-[18px] peer-placeholder-shown:text-label-alternative peer-focus:text-label-normal">
          {children}
        </div>
      </div>
    </div>
  );
};

export { TextInputWithLabel, LabelVariants };
