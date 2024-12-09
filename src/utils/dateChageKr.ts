// 현재 날짜를 기준으로 '내일'을 계산
export const formatStartDate = (startDate: string): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [month, day] = startDate.split('/');
  const startDateObj = new Date(
    today.getFullYear(),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );

  if (
    startDateObj.getDate() === tomorrow.getDate() &&
    startDateObj.getMonth() === tomorrow.getMonth() &&
    startDateObj.getFullYear() === tomorrow.getFullYear()
  ) {
    return '내일';
  }
  return startDate;
};

// 현재 날짜를 기준으로 'n주차' 계산
export const getWeekNumber = (dateFrom = new Date()) => {
  const currentDate = dateFrom.getDate();
  const startofMonth = new Date(dateFrom);
  startofMonth.setDate(1);
  const weekDay = startofMonth.getDay();
  const offset = weekDay === 0 ? 0 : 7 - weekDay;
  return Math.floor((offset + currentDate) / 7) + 1;
};

// 2024.12.03 -> 12.03(화) 변환
export const formatDateToShortWithDay = (
  dateString: string,
  offsetDays?: number,
): string => {
  const date = new Date(dateString);
  if (offsetDays) {
    date.setDate(date.getDate() + offsetDays);
  }
  const option: Intl.DateTimeFormatOptions = { weekday: 'short' };
  const dayName = new Intl.DateTimeFormat('ko-KR', option).format(date);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}.${day}(${dayName})`;
};
