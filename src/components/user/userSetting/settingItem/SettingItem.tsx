import Link from 'next/link';
import Right from '@/assets/icon/right_20px.svg';

interface Props {
  destination: string;
  title: string;
  description: string;
}

const SettingItem = ({ destination, title, description }: Props) => {
  return (
    <Link
      href={destination}
      className="mx-auto flex max-w-[335px] justify-between py-4"
    >
      <div className="flex flex-col">
        <div className="heading-1-sb text-label-normal">{title}</div>
        <div className="body-2-r text-label-alternative">{description}</div>
      </div>

      <button type="button" className="text-sm text-gray-500">
        <Right />
      </button>
    </Link>
  );
};

export default SettingItem;
