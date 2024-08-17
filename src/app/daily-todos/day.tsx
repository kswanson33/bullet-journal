'use client';

import { TodoItem } from "./todoItem";
import { Todo } from "../../types";
import { DateContext } from "./contexts";
import { CreateInput } from "./createInput";
import { stylesByEra } from "./cosmetic";
import { getEra } from "../../utils";

export function Day(
  {date, todos}:
  {date: Date, todos: Todo[]}
) {
  // Style day based on "era"
  const era = getEra(date);
  const styles = stylesByEra(era);

  const todoHtml = todos.map((todo) => {
    return <TodoItem
      id={todo.id}
      text={todo.task}
      date_complete={todo.date_complete}
      bulletStyle={todo.bullet_style}
      key={todo.id}
      styles={styles}
    />
  });
  const noTodosMessage = <i className={`${styles.text_color} opacity-50`}>You have nothing to do today.</i>

  return (
    <main>
      <div className={`p-4 ${styles.header_color} rounded-t ${styles.text_color}`}>
        <div className="text-sm text-right">'{date.getFullYear().toString().slice(-2)}</div>
        <div className="text-center">
          {date.toLocaleString('default', { month: 'long' })}
          <br />
          <span className="text-2xl">{date.getDate()}</span>
          <br />
          <span className="text-sm">{date.toLocaleString('default', { weekday: 'long' })}</span>
        </div>
      </div>
      <div className={`p-4 ${styles.body_color} rounded-b`}>
        <DateContext.Provider value={date}>
          <div className={`${styles.text_color}`}>{todoHtml.length === 0 ? noTodosMessage : todoHtml}</div>
          <div className="h-4" />
          <CreateInput />
        </DateContext.Provider>
      </div>
    </main>
  );
}
