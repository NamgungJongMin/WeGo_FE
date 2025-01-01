import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { Day, CalendarEvents } from '@/@types/date';

const DayVariants = cva(
  'heading-1-sb w-6 h-6 flex items-center justify-center z-[2px]',
  {
    variants: {
      state: {
        default: 'text-label-normal',
        selected: 'bg-primary-normal text-primary-white rounded-[20px]',
        range: 'bg-slate-100 text-primary-normal',
        sunday: 'text-red-500',
        today: ' text-primary-normal',
        otherMonth: 'text-label-assistive',
      },
    },
  },
);

type State =
  | 'default'
  | 'otherMonth'
  | 'selected'
  | 'range'
  | 'today'
  | 'sunday';

interface Props extends VariantProps<typeof DayVariants> {
  registrationEnd?: Date;
  days: Day[];
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  calendarEvents: CalendarEvents;
  isRangeSelectable: boolean; // 추가
}

const DatePickerDays = ({
  registrationEnd,
  days,
  selectedStartDate,
  selectedEndDate,
  calendarEvents,
  isRangeSelectable = true, // 기본값 추가
}: Props) => {
  const today = registrationEnd ? new Date(registrationEnd) : new Date();
  if (registrationEnd) {
    today.setDate(today.getDate() + 1); // registrationEnd의 하루 뒤로 설정
  }
  today.setHours(0, 0, 0, 0);

  return (
    <div
      className="mx-auto grid w-[335px] grid-cols-7 gap-x-7 gap-y-5 xl:w-[288px] xl:gap-x-5 xl:gap-y-4"
      role="grid"
      aria-label="캘린더"
      tabIndex={0}
      onMouseUp={() => isRangeSelectable && calendarEvents.endDrag()}
    >
      {days.map(({ date, currentMonth }) => {
        const isToday = date.getTime() === today.getTime();
        const isBeforeToday = date < today;
        const isSelected =
          currentMonth &&
          selectedStartDate &&
          selectedEndDate &&
          date >= selectedStartDate &&
          date <= selectedEndDate;

        const isStartDate =
          currentMonth &&
          selectedStartDate &&
          date.getTime() === selectedStartDate.getTime();

        const isEndDate =
          currentMonth &&
          selectedEndDate &&
          date.getTime() === selectedEndDate.getTime();

        let state: State = 'default';

        if (!currentMonth) {
          state = 'otherMonth';
        } else if (isStartDate || isEndDate) {
          state = 'selected';
        } else if (isSelected) {
          state = 'range';
        } else if (isToday) {
          state = 'today';
        } else if (date.getDay() === 0) {
          state = 'sunday';
        }

        return (
          <div
            className={`relative w-fit ${isEndDate && 'bg-gradient-to-r from-slate-100 via-white to-white'} ${selectedEndDate && isStartDate && 'bg-gradient-to-l from-slate-100 via-white to-white'}`}
            key={date.getTime()}
            role="gridcell"
            aria-selected={isSelected ? true : undefined}
            aria-disabled={isBeforeToday}
          >
            <button
              type="button"
              onMouseDown={() =>
                isRangeSelectable && calendarEvents.startDrag(date)
              }
              onMouseEnter={() =>
                isRangeSelectable && calendarEvents.extendSelection(date)
              }
              onClick={() => calendarEvents.selectDate(date)}
              className={cn(DayVariants({ state }), {
                'before:absolute before:inset-0 before:left-[-27.6px] before:z-[-10px] before:w-[27.6px] before:bg-slate-100 xl:before:left-[-20px] xl:before:w-[20px]':
                  (state === 'selected' || state === 'range') &&
                  date.getDay() !== 0 &&
                  !isStartDate &&
                  date.getDate() !== 1,
                'cursor-not-allowed text-label-assistive': isBeforeToday,
              })}
              disabled={isBeforeToday}
            >
              {date.getDate()}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DatePickerDays;
