
import { db } from "./index";
import { Todo } from "../types";
import { compareDates, formatDate } from "../utils";

export const fetchTodosForDate = async (date: Date): Promise<Todo[]> => {
  try {
    // Todos should display on a given day if:
    // For past and present days:
    // - they began on that day or earlier
    // - they are incomplete or were completed on that day
    // For future days:
    // - they begin on that day
    const now = new Date();
    const date_formatted = formatDate(date);
    let db_call = null;
    if (compareDates(date, now) < 1) {
      // Filter for past or present dates
      db_call = await db.todos.toCollection().filter(
        (todo) => {
          const filter = (todo.date_complete === null || compareDates(date, new Date(todo.date_complete)) < 1) &&
                         (compareDates(new Date(todo.date_begin), date) < 1);
          return filter;
        }
      );
    } else {
      // Filter for future dates
      db_call = await db.todos
        .where('date_begin').equals(date_formatted);
    }
    return db_call.toArray();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todo data.');
  }
}
