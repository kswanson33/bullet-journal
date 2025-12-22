import { Era } from "./types";

/**
 * Formats given date object as string, ignoring time of day
 * @param date date to format
 * @returns string in YYYY-MM-DD format
 */
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

/**
 * Compares two date objects ignoring time of day. Uses user's timezone.
 * Returns:
 *   - -1 if date1 is before than date2
 *   - 0 if they take place on the same day
 *   - 1 if date1 is after date2
 * @param date1
 * @param date2
 * @returns -1, 0, or 1
 */
export const compareDates = (date1: Date, date2: Date): -1 | 0 | 1 => {
  if (date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()) {
    return 0;
  } else if (date1 < date2) {
    return -1;
  } else {
    return 1;
  }
}

/**
 * Formats given date object as string, including time
 * @param date The date to format
 * @returns String in `YYYY-MM-DD HH:mm:ss` format
 */
export const formatTimestamp = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

/**
 * Given a day, gets the day prior, ignoring time of day. Uses user's timezone.
 * @param date
 * @returns Date object the previous day, with time 00:00:00
 */
export const getDayBefore = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
}

/**
 * Given a day, gets the day after, ignoring time of day. Uses user's timezone.
 * @param date
 * @returns Date object the next day, with time 00:00:00
 */
export const getDayAfter = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

/**
 * Given a string in YYYY-MM-DD format, returns a date object with time 00:00:00.
 * @param date Date string
 * @returns Date object
 */
export const dateStringToDate = (date: string) => {
  // Expect YYYY-MM-DD
  const ymd = date.split('-').map(Number);
  return new Date(ymd[0], ymd[1] - 1, ymd[2]);
}

/**
 * Given a date object, returns whether it is 'past', 'present', or 'future' compared to the current time.
 * @param someday Date object
 */
export const getEra = (someday: Date): Era => {
  const now = new Date();
  const eras: Era[] = ['past', 'present', 'future']
  return eras[compareDates(someday, now) + 1];
}

/**
 * Logic for date bullet format. If useArrow is false, default/user's preferred style (unimplemented) will be used.
 * If useArrow is true, the date bullet will use the Arrow svg.
 * Essentially, useArrow indicates a todo has "rolled over" to the next day. It's true if:
 *   - the todo is displayed on a Day on or after its "begin" date AND
 *   - the todo is incomplete OR was completed on a day after (not on) the display Day
 * @param parentDate Date the todo is being displayed on
 * @param currentDate Now
 * @param dateComplete Date the todo was completed, or null
 * @returns
 */
export const useArrow = (parentDate: Date, currentDate: Date, dateComplete: Date | null): boolean => {
  // Use arrow if todo is incomplete and began in the past, or if complete date is later than display date
  if ((!dateComplete && compareDates(parentDate, currentDate) === -1) ||
    (dateComplete && compareDates(parentDate, dateComplete) === -1)) {
    return true;
  }
  return false;
}

export const ensureValue = <T>(value: T | null | undefined): T => {
  if (value === null || value === undefined) {
    throw new Error("Null or undefined value")
  }
  return value
}
