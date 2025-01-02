import Textarea from '@/components/common/textarea/Textarea';
import cn from '@/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { LabelVariants } from '@/components/inputwithlabel/TextInputWithLabel';

interface Props extends VariantProps<typeof LabelVariants> {
  label: string;
  state?: 'default' | 'srOnly' | 'required';
  name: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  size?: 'default' | 'small';
  className?: string;
  classNameCondition?: Record<string, boolean>;
  textareaClassName?: string;
  textareaClassNameCondition?: Record<string, boolean>;
  extraClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaWithLabel = ({
  label,
  state,
  name,
  value,
  placeholder,
  maxLength = 100,
  size,
  className,
  classNameCondition,
  textareaClassName,
  textareaClassNameCondition,
  extraClassName,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <label
        htmlFor={name}
        className={cn(LabelVariants({ state, className }), classNameCondition)}
      >
        {label}
      </label>
      <Textarea
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        size={size}
        className={textareaClassName}
        classNameCondition={textareaClassNameCondition}
        extraClassName={extraClassName}
        onChange={onChange}
      />
    </div>
  );
};

export default TextareaWithLabel;
