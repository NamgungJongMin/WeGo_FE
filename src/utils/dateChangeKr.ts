import dayjs from 'dayjs';

// 현재 날짜를 기준으로 '내일'을 계산
export const checkTomorrow = (checkDate: string): string => {
  const inputDate = dayjs(checkDate).startOf('day');
  const tomorrow = dayjs().add(1, 'day').startOf('day');

  if (inputDate.isSame(tomorrow, 'day')) {
    return '내일';
  }

  return checkDate;
};

// 현재 날짜를 기준으로 'n주차' 계산
export const getWeekNumber = (dateFrom = dayjs()) => {
  const currentDate = dateFrom.date();
  const startOfMonth = dateFrom.startOf('month');
  const weekDay = startOfMonth.day();
  const offset = weekDay === 0 ? 0 : 7 - weekDay;
  return Math.floor((offset + currentDate) / 7) + 1;
};

/**
 * @param dateString 변환하려는 날짜(2024.12.03)
 * @param offsetDays dateString을 기준으로 더하고 싶은 숫자
 * @param includeYear 연도 포함 여부
 * @return 2024.12.03(화) 혹은 12.03(화)
 */
export const formatDateToShortWithDay = (
  dateString: string,
  offsetDays?: number,
  includeYear?: boolean,
): string => {
  const date = new Date(dateString);
  if (offsetDays) {
    date.setDate(date.getDate() + offsetDays);
  }
  const option: Intl.DateTimeFormatOptions = { weekday: 'short' };
  const dayName = new Intl.DateTimeFormat('ko-KR', option).format(date);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return includeYear
    ? `${year}.${month}.${day}(${dayName})`
    : `${month}.${day}(${dayName})`;
};