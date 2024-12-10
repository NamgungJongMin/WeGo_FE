import Link from 'next/link';
import Plus from '@/assets/plus.svg';

const MoreButton = ({ href, aria }: { href: string; aria: string }) => {
  return (
    <Link
      href={href}
      className="group flex h-5 items-center justify-center gap-0.5 text-label-normal hover:text-primary-normal"
      aria-label={aria}
    >
      <span className="text-xs font-semibold group-hover:text-primary-normal">
        MORE
      </span>
      <Plus
        width={14}
        height={14}
        className="h-3.5 w-3.5 group-hover:text-primary-normal"
      />
    </Link>
  );
};

export default MoreButton;
