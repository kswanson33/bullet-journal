import { Day } from "./day";
import * as data from "../../db/data";
import { getDayAfter, getDayBefore } from "../../utils";

/**
 * Given a Date, finds the day before and the day after.
 * @param middle
 * @return An array containing 3 dates in a row, with the given date in the middle.
 */
const getDisplayDates = (middle: Date) => {
  const first = getDayBefore(middle);
  const third = getDayAfter(middle);

  return [first, middle, third];
}

/**
 * A grid of 3 Days. Always consecutive, centered around the given date.
 * @param date The center Day on the grid
 */
export const DateGrid = async ({ date }: { date: Date }) => {
  const [first, second, third] = getDisplayDates(date);

  // Get todos for dates displayed
  const firstTodos = await data.fetchTodosForDate(first);
  const secondTodos = await data.fetchTodosForDate(second);
  const thirdTodos = await data.fetchTodosForDate(third);

  return (
    <div className="grid grid-cols-3 gap-4 mx-auto">
      <Day date={first} todos={firstTodos} />
      <Day date={second} todos={secondTodos} />
      <Day date={third} todos={thirdTodos} />
    </div>
  );
}
