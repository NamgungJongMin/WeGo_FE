import Textarea from '@/components/common/textarea/Textarea';

interface Props {
  label: string | React.ReactNode;
  srOnly?: boolean;
  name: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  size?: 'default' | 'small';
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaWithLabel = ({
  label,
  srOnly,
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
    <div className="flex w-fit flex-col gap-1.5">
      <label
        htmlFor={name}
        className={`${srOnly && 'sr-only'} w-fit cursor-pointer text-sm text-label-normal`}
      >
        {label}
      </label>
      <Textarea
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        size={size}
        className={className}
        classNameCondition={classNameCondition}
        onChange={onChange}
      />
    </div>
  );
};

export default TextareaWithLabel;
