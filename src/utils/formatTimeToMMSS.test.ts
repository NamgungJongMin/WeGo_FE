import formatTimeToMMSS from './formatTimeToMMSS';

describe('formatTimeToMMSS', () => {
  it('59초를 "00:59"로 변환해야 한다', () => {
    expect(formatTimeToMMSS(59)).toBe('00:59');
  });

  it('60초를 "01:00"으로 변환해야 한다', () => {
    expect(formatTimeToMMSS(60)).toBe('01:00');
  });

  it('3599초(59분 59초)를 "59:59"로 변환해야 한다', () => {
    expect(formatTimeToMMSS(3599)).toBe('59:59');
  });
});
