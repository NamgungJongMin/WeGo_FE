import CheckMark from '@/assets/icon/checkMark.svg';
import cn from '@/utils/cn';

interface Props {
  isChecked?: boolean;
  animate?: boolean;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  locatedRight?: boolean;
}

const CheckMarkButton = ({
  isChecked,
  animate,
  handler,
  locatedRight,
}: Props) => {
  return (
    <button
      type="button"
      onClick={handler}
      className={`absolute top-0 z-10 m-2 flex h-9 w-9 items-center justify-center rounded bg-black bg-opacity-30 p-2 ${locatedRight ? 'right-0' : 'left-0'}`}
    >
      <CheckMark
        data-testid="check-mark"
        className={cn('forwards transition-all duration-100', {
          'animate-check-shake': animate && isChecked,
          'animate-check-shake-reverse': animate && !isChecked,
        })}
        fill={isChecked ? '#fff' : 'transparent'}
        stroke={isChecked ? 'transparent' : '#fff'}
      />
    </button>
  );
};

export default CheckMarkButton;
