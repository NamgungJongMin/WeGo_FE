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
