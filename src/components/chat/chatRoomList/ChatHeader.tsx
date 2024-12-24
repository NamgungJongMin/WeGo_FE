'use client';

import { useState, useRef, useEffect } from 'react';
import Filter from '@/assets/filter.svg';
import cn from '@/utils/cn';

type SortType = '최근순' | '안읽은순';

interface Props {
  onSortChange: (sort: SortType) => void;
}

const sortOptions: SortType[] = ['최근순', '안읽은순'];

const ChatHeader = ({ onSortChange }: Props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const currentSortRef = useRef('최근순');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-gray-300 px-5 pb-[13px] pt-3.5">
      <h1 className="title-3-b">채팅</h1>
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          type="button"
          className="text-gray-600 hover:text-black"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
        >
          <Filter />
        </button>
        {isDropdownOpen && (
          <ul className="absolute right-0 top-[38px] z-50 mt-1.5 rounded bg-primary-white shadow-custom">
            {sortOptions.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={cn(
                    'body-2-m flex w-[90px] cursor-pointer items-center justify-center border-b border-line-normal py-[9px] text-label-alternative transition-all duration-300 last:border-0 hover:bg-gray-100',
                    {
                      'body-2-sb text-label-normal':
                        currentSortRef.current === option,
                    },
                  )}
                  onClick={() => {
                    onSortChange(option);
                    setDropdownOpen(false);
                    currentSortRef.current = option;
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};
export default ChatHeader;
