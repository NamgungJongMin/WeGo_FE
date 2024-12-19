import SearchIcon from '@/assets/search.svg';
import { useTravelListStore } from '@/store/useTravelListStore';
import { useState, useTransition } from 'react';

const FilterSearch = () => {
  const [localSearchText, setLocalSearchText] = useState<string>('');
  const setFilters = useTravelListStore((state) => state.setFilters);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    const encodedSearchText = encodeURIComponent(localSearchText);
    startTransition(() => {
      setFilters({
        searchText: encodedSearchText,
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between rounded bg-gray-100 px-4 py-[7px]">
      <input
        value={localSearchText}
        onChange={(e) => setLocalSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="숙소/여행지/맛집 등을 입력해 주세요."
        aria-label="숙소/여행지/맛집 등 검색"
        className={`peer w-full bg-transparent text-label-normal focus:outline-none ${
          isPending ? 'opacity-50' : ''
        }`}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="ml-1 text-label-alternative peer-focus:text-label-normal"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default FilterSearch;
