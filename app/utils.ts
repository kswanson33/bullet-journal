export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

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

export const formatTimestamp = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const getDayBefore = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
}

export const getDayAfter = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
}

export const dateStringToDate = (date: string) => {
  // Expect YYYY-MM-DD
  const ymd = date.split('-').map(Number);
  return new Date(ymd[0], ymd[1]-1, ymd[2]);
}
