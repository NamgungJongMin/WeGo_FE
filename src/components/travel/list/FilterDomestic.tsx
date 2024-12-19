import ArrowIcon from '@/assets/arrow_down.svg';
import { useTravelListStore } from '@/store/useTravelListStore';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

const FilterDomestic = () => {
  const domestic = useTravelListStore((state) => state.filters).isDomestic;
  const setFilters = useTravelListStore((state) => state.setFilters);
  let display;

  const handleDomestic = (value: boolean | null) => {
    setFilters({ isDomestic: value });
  };

  if (domestic === true) display = '해외';
  else if (domestic === false) display = '국내';
  else display = '지역전체';

  return (
    <Listbox value={domestic} onChange={handleDomestic}>
      <ListboxButton
        className="flex w-[69px] items-center justify-between gap-1"
        aria-label="국내, 해외 선택 버튼"
      >
        <span className="w-[49px]">{display}</span>
        <ArrowIcon className="" aria-hidden="true" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className="body-2-m z-20 flex w-[90px] flex-col items-center justify-center rounded border-line-normal bg-white text-label-alternative shadow-custom transition duration-100 ease-in [--anchor-gap:4px] [--anchor-padding:20px]"
      >
        <ListboxOption
          value={null}
          className={`cursor-pointer py-2.5 ${domestic === null && 'text-label-normal'}`}
        >
          지역전체
        </ListboxOption>
        <ListboxOption
          value={false}
          className={`w-full cursor-pointer border-y border-line-normal py-2.5 text-center ${domestic === false && 'text-label-normal'}`}
        >
          국내
        </ListboxOption>
        <ListboxOption
          value
          className={`cursor-pointer py-2.5 ${domestic && 'text-label-normal'}`}
        >
          해외
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  );
};

export default FilterDomestic;
