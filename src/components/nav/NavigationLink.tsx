import Link from 'next/link';
import React from 'react';

interface Props {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}
const linkCss = 'flex flex-col items-center text-[10px]';
const iconCss = 'flex h-9 w-9 items-center justify-center';

const NavLink = ({ href, icon, label, isActive }: Props) => (
  <Link href={href} className={linkCss} aria-label={label}>
    <div className={iconCss}>
      {React.cloneElement(icon as React.ReactElement, {
        fill: isActive ? 'white' : 'none',
      })}
    </div>
    {label}
  </Link>
);

export default NavLink;
