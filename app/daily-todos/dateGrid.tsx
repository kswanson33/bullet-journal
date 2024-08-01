import { Day } from "./day";
import * as data from "../db/data";
import { compareDates, getDayAfter, getDayBefore } from "../utils";

const getDisplayDates = (middle: Date) => {
  const first = getDayBefore(middle);
  const third = getDayAfter(middle);

  return [first, middle, third];
}

const getEra = (someday: Date): 'past' | 'present' | 'future' => {
  const now = new Date();
  const eras = ['past', 'present', 'future'];
  return eras[compareDates(now, someday) + 1]; // TODO: fix type error
}

export const DateGrid = async ({date}: {date: Date}) => {
  const [first, second, third] = getDisplayDates(date);

  // Get todos for dates displayed
  const firstTodos = await data.fetchTodosForDate(first);
  const secondTodos = await data.fetchTodosForDate(second);
  const thirdTodos = await data.fetchTodosForDate(third);

  return (
    <div className="grid grid-cols-3 gap-4 mx-auto">
      <Day date={first} todos={firstTodos} era={getEra(first)} />
      <Day date={second} todos={secondTodos} era={getEra(second)} />
      <Day date={third} todos={thirdTodos} era={getEra(third)} />
    </div>
  );
}
