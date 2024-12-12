import TextInput from '@/components/common/input/TextInput';
import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const LabelVariants = cva('text-label-normal w-fit cursor-pointer body-2-m', {
  variants: {
    state: {
      default: '',
      srOnly: 'sr-only',
      required: "after:text-status-infomative after:ml-0.5 after:content-['*']",
      optional:
        "after:text-label-alternative after:body-2-m after:ml-0.5 after:content-['(선택)']",
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
interface Props extends VariantProps<typeof LabelVariants> {
  label: string;
  state?: 'default' | 'srOnly' | 'required' | 'optional';
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  size?: 'default' | 'withButton' | 'halfButton';
  inputClassName?: string;
  inputClassNameCondition?: Record<string, boolean>;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
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
  readOnly,
  size,
  inputClassName,
  inputClassNameCondition,
  className,
  classNameCondition,
  onChange,
  onKeyDown,
  onClick,
  children,
}: Props) => {
  return (
    <div className="flex w-fit flex-col">
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
          readOnly={readOnly}
          size={size}
          className={`${inputClassName} border-label-normal placeholder-shown:border-line-normal`}
          classNameCondition={{
            ...inputClassNameCondition,
            'peer pl-[38px]': !!children,
          }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClick={onClick}
        />
        <div className="absolute bottom-3.5 left-4 h-[18px] w-[18px] peer-placeholder-shown:text-label-alternative peer-focus:text-label-normal">
          {children}
        </div>
      </div>
    </div>
  );
};

export { TextInputWithLabel, LabelVariants };
