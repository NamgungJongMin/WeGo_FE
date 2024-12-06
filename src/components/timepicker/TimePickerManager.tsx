import TimePickerInput from './TimePickerInput';

interface DateRange {
  startDate?: string;
  endDate?: string;
}
interface Props {
  dateRange?: DateRange;
}

const TimePickerManager = ({ dateRange }: Props) => {
  return (
    <div className="flex flex-col items-start gap-1.5">
      {dateRange && (
        <label
          htmlFor="startDate"
          className="w-fit cursor-pointer text-sm text-label-normal after:ml-0.5 after:text-status-infomative after:content-['*']"
        >
          진행시간
        </label>
      )}
      <div className="flex items-end gap-[7px]">
        <TimePickerInput
          date={dateRange?.startDate}
          placeholder="시작시간"
          id="startDate"
        />
        <TimePickerInput
          date={dateRange?.endDate}
          placeholder="종료시간"
          labelHidden
          id="endDate"
        />
      </div>
    </div>
  );
};

export default TimePickerManager;
