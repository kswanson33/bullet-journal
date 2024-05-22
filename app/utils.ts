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