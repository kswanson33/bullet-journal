'use client';

import { db } from "./index";
import { formatDate, formatTimestamp } from "../utils";
import { z } from 'zod';

const TodoFormSchema = z.object({
  id: z.string(),
  task: z.string(),
  bullet_style: z.enum(['point', 'box', 'star'])
});

const CreateTodo = TodoFormSchema.omit({ id: true, bullet_style: true }); // TODO: get bullet style from form

export const setCompleteOn = async (id: string, date: string) => {
  await db.todos.where('id').equals(id).modify(
    {date_complete: date}
  );
}

export const setIncomplete = async (id: string) => {
  await db.todos.where('id').equals(id).modify(
    {date_complete: null}
  );
}

export const createTodoOn = async (date: Date, formData: FormData) => {
  const { task } = CreateTodo.parse({
    task: formData.get('task')
  });

  if (task.length === 0) {
    return;
  }

  const taskSingleQuotes = task.split('\'').join('\'\'');

  console.log(date);
  console.log(formData);
  await db.todos.add({
    id: `${Date.now()}`,
    task: taskSingleQuotes,
    bullet_style: 'box',
    date_created: formatTimestamp(new Date()),
    date_begin: formatDate(date),
    date_complete: null
  });
}

export const deleteTodo = async (id: string) => {
  await db.todos.where('id').equals(id).delete();
}
