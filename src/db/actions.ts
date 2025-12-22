'use server';

import { revalidatePath } from "next/cache";
import { query } from "."
import { formatDate, formatTimestamp } from "../utils";
import { randomUUID } from "crypto";
import { z } from 'zod';

/**
 * Schema for Create Todo form
 */
const TodoFormSchema = z.object({
  id: z.string(),
  task: z.string(),
  bullet_style: z.enum(['point', 'box', 'star']) // currently not set in form
});

const CreateTodo = TodoFormSchema.omit({ id: true, bullet_style: true });

/**
 * Runs on startup. Instantiates todos table if it doesn't already exist.
 */
export const instantiateTodosTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      task TEXT NOT NULL,
      bullet_style TEXT,
      date_created TIMESTAMP NOT NULL,
      date_begin TIMESTAMP,
      date_complete TIMESTAMP
    );
  `
  await query(sql);
  revalidatePath('/daily-todos');
}

/**
 * Updates a todo in the table to completed on the given date
 * @param id Todo ID
 * @param date Date completed
 */
export const setCompleteOn = async (id: string, date: string) => {
  const sql = `
    UPDATE todos
    SET date_complete = '${date}'
    WHERE id = '${id}';
  `
  await query(sql)

  revalidatePath('/daily-todos');
}

/**
 * Updates a todo in the table to incomplete
 * @param id Todo ID
 */
export const setIncomplete = async (id: string) => {
  await query(`
    UPDATE todos
    SET date_complete = NULL
    WHERE id = '${id}';
  `)

  revalidatePath('/daily-todos');
}

/**
 * Creates a new todo beginning on the given date
 * @param date Date to begin
 * @param formData Information from Create form, following TodoFormSchema
 * @returns
 */
export const createTodoBeginningOn = async (date: Date, formData: FormData) => {
  const { task } = CreateTodo.parse({
    task: formData.get('task')
  });

  if (task.length === 0) {
    return;
  }

  const taskSingleQuotes = task.split('\'').join('\'\'');

  // Currently bulletStyle value is hardcoded because it will be inferred later
  const sql = `
    INSERT INTO todos
    VALUES ('${randomUUID()}', '${taskSingleQuotes}', 'box', '${formatTimestamp(new Date())}', '${formatDate(date)}', NULL);
  `
  await query(sql);
  revalidatePath('/daily-todos');
}

/**
 * Delets the given todo.
 * @param id Todo ID
 */
export const deleteTodo = async (id: string) => {
  const sql = `
    DELETE FROM todos WHERE id='${id}';
  `
  await query(sql);

  revalidatePath('/daily-todos');
}
