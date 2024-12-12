import { Button } from '@/components/common/button/Button';
import DatePicker from '@/components/createTrip/datepicker/DatePicker';
import TimePickerInput from '@/components/createTrip/timepicker/TimePickerInput';
import { formatDate } from '@/utils/calendarHelper';
import { DateRange, FormTravelProps } from '@/@types/travelForm';

const DateStep = ({
  data,
  onChange,
  onNext,
  onTempSave,
  isValid,
}: FormTravelProps) => {
  const { startAt, endAt, startTime, endTime } = data;

  const handleDatePickerChange = ({ startDate, endDate }: DateRange) => {
    onChange('startAt', startDate);
    onChange('endAt', endDate);
    if (startDate) {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const differenceInMilliseconds = endDate
        ? endDate.getTime() - startDate.getTime()
        : startDate.getTime() - startDate.getTime();
      const differenceInDays = Math.ceil(
        differenceInMilliseconds / oneDayInMilliseconds,
      );

      const newSchedules = Array.from(
        { length: differenceInDays + 1 },
        (_, day) => ({
          tripOrderNumber: 1,
          destination: '',
          description: '',
          tripDay: day + 1,
          destinationImage: null,
        }),
      );

      onChange('detailTravel', newSchedules);
    }
  };

  const isValidTimeRange = (() => {
    if (!startTime.hour || !endTime.hour || !startAt) return true;

    const start = new Date(startAt);
    start.setHours(
      parseInt(startTime.hour, 10),
      parseInt(startTime.minute, 10),
    );

    const end = endAt ? new Date(endAt) : new Date(startAt);
    end.setHours(parseInt(endTime.hour, 10), parseInt(endTime.minute, 10));

    return start <= end;
  })();

  return (
    <div className="mb-10 flex max-h-[632px] flex-1 flex-col gap-6">
      <DatePicker
        label="일정"
        value={{
          startDate: startAt,
          endDate: endAt,
        }}
        onChange={handleDatePickerChange}
        isRangeSelectable
      />
      <div className="flex flex-col items-start gap-1.5">
        {endAt && (
          <label
            htmlFor="startDate"
            className="body-2-m w-fit text-label-normal after:ml-0.5 after:text-status-infomative after:content-['*']"
          >
            진행시간
          </label>
        )}
        <div className="flex items-end gap-[7px]">
          <TimePickerInput
            date={endAt && startAt ? formatDate(startAt) : undefined}
            placeholder="시작시간"
            id="startTime"
            selectedHour={startTime.hour}
            selectedMinute={startTime.minute}
            onSelect={(firstTime: string, sencondTime: string) => {
              onChange('startTime', { hour: firstTime, minute: sencondTime });
            }}
            inputClassNameCondition={{
              'border-status-error focus:border-status-error':
                !isValidTimeRange,
            }}
          />
          <TimePickerInput
            date={endAt ? formatDate(endAt) : undefined}
            placeholder="종료시간"
            id="endTime"
            labelHidden
            selectedHour={endTime.hour}
            selectedMinute={endTime.minute}
            onSelect={(firstTime: string, sencondTime: string) => {
              onChange('endTime', { hour: firstTime, minute: sencondTime });
            }}
            inputClassNameCondition={{
              'border-status-error focus:border-status-error':
                !isValidTimeRange,
            }}
          />
        </div>
        {!isValidTimeRange && (
          <span className="body-3-r mt-1 text-status-error">
            시작시간과 종료시간을 한번 더 확인 해 주세요.
          </span>
        )}
      </div>
      <div className="mt-auto flex justify-between">
        <Button
          handler={onTempSave}
          className="mt-auto"
          size="half"
          fill="white"
        >
          임시저장
        </Button>
        <Button
          disabled={!isValid}
          handler={onNext}
          className="mt-auto"
          size="half"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default DateStep;
