import { Day } from '@/@types/date';

export const getDaysInMonth = (year: number, month: number) => {
  let days: Day[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = firstDayOfMonth;
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthDaysCount = new Date(prevYear, prevMonth + 1, 0).getDate();

  for (let i = prevMonthDays; i > 0; i--) {
    const date = new Date(prevYear, prevMonth, prevMonthDaysCount - i + 1);
    days = [
      ...days,
      {
        date,
        currentMonth: false,
        isBeforeToday: date < today,
      },
    ];
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days = [
      ...days,
      {
        date,
        currentMonth: true,
        isBeforeToday: date < today,
      },
    ];
  }

  const totalCells = 42;
  const nextMonthDays = totalCells - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(nextYear, nextMonth, i);
    days = [
      ...days,
      {
        date,
        currentMonth: false,
        isBeforeToday: false,
      },
    ];
  }

  return days;
};

export const formatDate = (date: Date): string => {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = dayNames[date.getDay()];

  return `${year}.${month}.${day}(${dayOfWeek})`;
};
