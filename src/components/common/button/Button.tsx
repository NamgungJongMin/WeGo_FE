import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const ButtonVariants = cva('rounded', {
  variants: {
    fill: {
      default: 'bg-[#222222] text-white',
      white: 'bg-white border border-[#222222]',
    },
    size: {
      default: 'w-[335px] h-[52px]',
      addon: 'w-[101px] h-[46px]',
      modal_sm: 'w-[90px] h-[38px]',
      modal_md: 'w-[202px] h-[38px]',
    },
  },
  defaultVariants: {
    fill: 'default',
    size: 'default',
  },
});

interface Props extends VariantProps<typeof ButtonVariants> {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  handler?: () => void;
  disabled?: boolean;
}

const Button = ({
  fill,
  size,
  label,
  disabled,
  children,
  className,
  classNameCondition,
  handler,
}: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(ButtonVariants({ fill, size }), className, {
        classNameCondition,
      })}
      onClick={handler}
    >
      {label && label}
      {children && children}
    </button>
  );
};

export { Button, ButtonVariants };
