import Dexie, { EntityTable } from "dexie";
import { Todo } from "../types";

const db = new Dexie('todos') as Dexie & { todos: EntityTable<Todo> };

db.version(1).stores({
  todos: '++id, task, bullet_style, date_created, date_begin, date_complete'
});

export { db };
