'use server';

import { revalidatePath } from "next/cache";
import { query } from "."

export const setCompleteOn = async (id: string, date: string) => {
  const sql = `
    UPDATE todos
    SET date_complete = '${date}'
    WHERE id = '${id}';
  `
  console.log(sql);
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