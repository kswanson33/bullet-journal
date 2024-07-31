import { Day } from "./day";
import * as data from "../db/data";

export default async function Page() {
  // days
  const today = new Date();
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
  // console.log(`today = ${formatDate(today)}, yesterday=${formatDate(yesterday)}, tomorrow=${formatDate(tomorrow)}`);

  // todos
  const yesterdayTodos = await data.fetchTodosForDate(yesterday);
  const todayTodos = await data.fetchTodosForDate(today);
  const tomorrowTodos = await data.fetchTodosForDate(tomorrow);

  return (
    <div className="p-32 grid grid-cols-3 gap-4 mx-auto">
      <Day date={yesterday} todos={yesterdayTodos} era='past' />
      <Day date={today} todos={todayTodos} era='present' />
      <Day date={tomorrow} todos={tomorrowTodos} era='future' />
    </div>
  );
}
