'use client';

import { useReviewStore } from '@/store/useReviewStore';
import cn from '@/utils/cn';

const ReviewFilter = () => {
  const sortOrder = useReviewStore((state) => state.filters.sortOrder);
  const setFilters = useReviewStore((state) => state.setFilters);

  const handleSortOrder = (value: 'createdAt' | 'popular') => {
    setFilters({ sortOrder: value });
  };

  return (
    <nav>
      <ul className="flex items-center justify-start divide-x divide-line-normal">
        <li
          className={cn('body-2-r pr-2 text-label-alternative', {
            'body-2-sb text-label-normal': sortOrder === 'createdAt',
          })}
        >
          <button
            type="button"
            disabled={sortOrder === 'createdAt'}
            onClick={() => handleSortOrder('createdAt')}
          >
            최근
          </button>
        </li>
        <li
          className={cn('body-2-r pl-2 text-label-alternative', {
            'body-2-sb text-label-normal': sortOrder === 'popular',
          })}
        >
          <button
            type="button"
            disabled={sortOrder === 'popular'}
            onClick={() => handleSortOrder('popular')}
          >
            인기
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ReviewFilter;
