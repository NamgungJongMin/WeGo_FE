import ArrowIcon from '@/assets/arrow_down.svg';
import DatePickerModal from '@/components/createTrip/datepicker/DatePickerModal';
import useDatePicker from '@/hooks/useDatePicker';
import { useTravelListStore } from '@/store/useTravelListStore';

const FilterDate = () => {
  const { startAt, endAt } = useTravelListStore((state) => state.filters);
  const setFilters = useTravelListStore((state) => state.setFilters);
  const dateRange = {
    startDate: startAt ? new Date(startAt) : null,
    endDate: endAt ? new Date(endAt) : null,
  };

  const calendar = useDatePicker(
    dateRange,
    (newDateRange) => {
      setFilters({
        startAt: newDateRange.startDate?.toISOString().split('T')[0] || '',
        endAt: newDateRange.endDate?.toISOString().split('T')[0] || '',
      });
    },
    true,
    true,
  );

  return (
    <div>
      <button
        type="button"
        onClick={calendar.openCalendar}
        className="flex items-center justify-between gap-1"
      >
        날짜전체
        <ArrowIcon />
      </button>
      <DatePickerModal calendarInfo={calendar} isInitBtn />
    </div>
  );
};

export default FilterDate;
