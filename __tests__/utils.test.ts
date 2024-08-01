import '@testing-library/jest-dom'
import * as utils from '../app/utils';

describe('formatDate', () => {
  it('turns a date object into a YYYY-MM-DD string', () => {
    const date = new Date('08-01-2024');
    expect(utils.formatDate(date)).toBe('2024-8-1');
  });
});

describe('compareDates', () => {
  it('says that same dates with different timestamp are equivalent', () => {
    const date1 = new Date(1722541262000);
    const date2 = new Date(1722541263000);
    expect(utils.compareDates(date1, date2)).toBe(0);
  });
  it('correctly compares different dates', () => {
    const first = new Date('07-31-2024');
    const second = new Date('08-01-2024');
    expect(utils.compareDates(first, second)).toBe(-1);
    expect(utils.compareDates(second, first)).toBe(1);
  });
});

describe('formatTimestamp', () => {
  it('formats timestamp as YYYY-MM-DD HH:MM:ss', () => {
    const date = new Date(1722541262000);
    expect(utils.formatTimestamp(date)).toBe('2024-8-1 15:41:2');
  });
});

describe('getDayBefore', () => {
  it('returns the day before the given date', () => {
    const date = new Date('08-01-2024');
    expect(
      utils.getDayBefore(date).toString()
    ).toBe("Wed Jul 31 2024 00:00:00 GMT-0400 (Eastern Daylight Time)");
  });
});

describe('getDayAfter', () => {
  it('returns the day after the given date', () => {
    const date = new Date('08-01-2024');
    expect(
      utils.getDayAfter(date).toString()
    ).toBe("Fri Aug 02 2024 00:00:00 GMT-0400 (Eastern Daylight Time)");
  });
});

describe('dateStringToDate', () => {
  it('turns YYYY-MM-DD string into Date object', () => {
    expect(
      utils.dateStringToDate('2024-08-01').toString()
    ).toBe("Thu Aug 01 2024 00:00:00 GMT-0400 (Eastern Daylight Time)");
  });
});
