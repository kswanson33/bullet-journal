'use server';

import { revalidatePath } from "next/cache";
import { query } from "."
import { formatDate, formatTimestamp } from "../utils";
import { randomUUID } from "crypto";
import { z } from 'zod';

const TodoFormSchema = z.object({
  id: z.string(),
  task: z.string(),
  bullet_style: z.enum(['point', 'box', 'star'])
});

const CreateTodo = TodoFormSchema.omit({ id: true, bullet_style: true }); // TODO: get bullet style from form

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

export const setCompleteOn = async (id: string, date: string) => {
  const sql = `
    UPDATE todos
    SET date_complete = '${date}'
    WHERE id = '${id}';
  `
  // console.log(sql);
  await query(sql)

  revalidatePath('/daily-todos');
}

export const setIncomplete = async (id: string) => {
  await query(`
    UPDATE todos
    SET date_complete = NULL
    WHERE id = '${id}';
  `)

  revalidatePath('/daily-todos');
}

export const createTodoBeginningOn = async (date: Date, formData: FormData) => {
  const { task } = CreateTodo.parse({
    task: formData.get('task')
  });

  if (task.length === 0) {
    return;
  }

  const taskSingleQuotes = task.split('\'').join('\'\'');

  console.log(date);
  console.log(formData);
  const sql = `
    INSERT INTO todos
    VALUES ('${randomUUID()}', '${taskSingleQuotes}', 'box', '${formatTimestamp(new Date())}', '${formatDate(date)}', NULL);
  `
  console.log(sql);
  await query(sql);
  revalidatePath('/daily-todos');
}

export const deleteTodo = async (id: string) => {
  const sql = `
    DELETE FROM todos WHERE id='${id}';
  `
  console.log(sql);
  await query(sql);

  revalidatePath('/daily-todos');
}
