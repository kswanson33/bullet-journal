'use client';

import { Day } from "./day";
import * as data from "../dexie/data";
import { getDayAfter, getDayBefore } from "../utils";
import { useLiveQuery } from "dexie-react-hooks";

const getDisplayDates = (middle: Date) => {
  const first = getDayBefore(middle);
  const third = getDayAfter(middle);

  return [first, middle, third];
}

export const DateGrid = ({date}: {date: Date}) => {
  const [first, second, third] = getDisplayDates(date);

  // Get todos for dates displayed
  const firstTodos = useLiveQuery(() => data.fetchTodosForDate(first));
  const secondTodos =  useLiveQuery(() => data.fetchTodosForDate(second));
  const thirdTodos = useLiveQuery(() => data.fetchTodosForDate(third));

  return (
    <div className="grid grid-cols-3 gap-4 mx-auto">
      <Day date={first} todos={firstTodos} />
      <Day date={second} todos={secondTodos} />
      <Day date={third} todos={thirdTodos} />
    </div>
  );
}
