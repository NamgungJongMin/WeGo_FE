import RegulateIcon from '@/assets/regulate.svg';
import { useTravelListStore } from '@/store/useTravelListStore';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

const FilterSort = () => {
  const sort = useTravelListStore((state) => state.filters).sortOrder;
  const setFilters = useTravelListStore((state) => state.setFilters);
  const handleSort = (value: 'popular' | 'registrationEnd' | null) => {
    setFilters({ sortOrder: value });
  };

  return (
    <Listbox onChange={handleSort}>
      <ListboxButton
        aria-label="여행 리스트 정렬 버튼"
        className="flex w-[69px] justify-end gap-1"
      >
        <RegulateIcon />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className="body-2-m z-20 flex w-[90px] flex-col items-center justify-center rounded border-line-normal bg-white text-label-alternative shadow-custom transition duration-100 ease-in [--anchor-gap:4px] [--anchor-padding:20px]"
      >
        <ListboxOption
          value={null}
          className={`cursor-pointer py-2.5 ${!sort && 'text-label-normal'}`}
        >
          최신순
        </ListboxOption>
        <ListboxOption
          value="popular"
          className={`w-full cursor-pointer border-y border-line-normal py-2.5 text-center ${sort === 'popular' && 'text-label-normal'}`}
        >
          인기순
        </ListboxOption>
        <ListboxOption
          value="registrationEnd"
          className={`cursor-pointer py-2.5 ${sort === 'registrationEnd' && 'text-label-normal'}`}
        >
          마감임박
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  );
};

export default FilterSort;
