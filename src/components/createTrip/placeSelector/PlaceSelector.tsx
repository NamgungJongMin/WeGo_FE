import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const placeSelectorVariants = cva(
  'body-2-m flex h-[46px] w-[160px] cursor-pointer items-center justify-center rounded border',
  {
    variants: {
      isSelected: {
        true: 'bg-label-normal text-primary-white border-line-normal',
        false: 'text-interaction-inactive border-line-normal',
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

interface Props extends VariantProps<typeof placeSelectorVariants> {
  selected: boolean;
  onChange: (value: boolean) => void;
}

const PlaceSelector = ({ selected, onChange }: Props) => {
  const options = [
    { label: '국내', value: true },
    { label: '국외', value: false },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="place-selector"
        className="body-2-m text-label-normal after:ml-0.5 after:text-status-infomative after:content-['*']"
      >
        국내외 장소 선택
      </label>

      <div id="place-selector" className="flex justify-between">
        {options.map(({ label, value }) => (
          <label
            htmlFor={label}
            key={label}
            className={cn(
              placeSelectorVariants({ isSelected: selected === value }),
            )}
          >
            <input
              id={label}
              type="radio"
              name="place"
              value={String(value)}
              checked={selected === value}
              onChange={() => onChange(value)}
              className="hidden"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PlaceSelector;
