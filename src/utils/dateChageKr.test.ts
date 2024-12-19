import {
  formatDateToShortWithDay,
  checkTomorrow,
  getWeekNumber,
} from './dateChageKr';

describe('checkTomorrow', () => {
  it('지정일이 내일이면 "내일"을 반환해야 합니다.', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    expect(checkTomorrow(tomorrowString)).toBe('내일');
  });

  it('지정일이 내일이 아니면 지정된 날짜를 반환해야 합니다.', () => {
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const dayAfterTomorrowDate = `${dayAfterTomorrow.getFullYear() + 1}.${dayAfterTomorrow.getMonth() + 1}.${dayAfterTomorrow.getDate()}`;

    expect(checkTomorrow(dayAfterTomorrowDate)).toBe(dayAfterTomorrowDate);
  });
});

describe('getWeekNumber', () => {
  it('오늘이 첫 번째 주인 경우 1을 반환해야 합니다.', () => {
    const today = new Date();
    today.setDate(1);
    expect(getWeekNumber(today)).toBe(1);
  });

  it('오늘이 두 번째 주인 경우 2를 반환해야 합니다.', () => {
    const today = new Date();
    today.setDate(8);
    expect(getWeekNumber(today)).toBe(2);
  });

  it('월초와 월말 케이스를 처리해야 합니다.', () => {
    const today = new Date(2024, 11, 31);
    expect(getWeekNumber(today)).toBe(5);

    const startOfMonth = new Date(2024, 11, 1);
    startOfMonth.setDate(1);
    expect(getWeekNumber(startOfMonth)).toBe(1);
  });
});

describe('formatDateToShortWithDay', () => {
  it('2024.12.03를 12.03(화)로 변환합니다', () => {
    const dateString = '2024.12.03';
    expect(formatDateToShortWithDay(dateString)).toBe('12.03(화)');
  });

  it('2024.12.03에 offsetDays(3)를 더하면 12.06(금)으로 변환합니다', () => {
    const dateString = '2024.12.03';
    const offsetDays = 3;
    expect(formatDateToShortWithDay(dateString, offsetDays)).toBe('12.06(금)');
  });
});
