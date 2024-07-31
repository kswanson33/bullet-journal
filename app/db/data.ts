import { query } from "./index";
import { Todo } from "../types";
import { compareDates, formatDate } from "../utils";

export const fetchTodosForDate = async (date: Date) => {
  try {
    // Todos should display on a given day if:
    // For past and present days:
    // - they began on that day or earlier
    // - they are incomplete or were completed on that day
    // For future days:
    // - they begin on that day
    const now = new Date();
    const date_formatted = formatDate(date);
    let sql = '';
    if (compareDates(date, now) < 1) { 
      // Query string for past or present dates
      sql = /* sql */`
        SELECT * FROM todos 
        WHERE date_begin <= '${date_formatted}'
        AND (date_complete IS NULL 
            OR '${date_formatted}' <= date_complete)
        ORDER BY date_complete, date_created;
      `
    } else {
      // Query string for future dates
      sql = /* sql */`
        SELECT * FROM todos
        WHERE date_begin = '${date_formatted}'
        ORDER BY date_complete, date_created;
      `
    }
    const data = await query<Todo>(sql);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todo data.');
  }
}
