'use client';

import { TodoItem } from "./todoItem";
import { Todo } from "../types";
import { DateContext } from "./contexts";
import { CreateInput } from "./createInput";
import { compareDates } from "../utils";

const getEra = (someday: Date): 'past' | 'present' | 'future' => {
  const now = new Date();
  const eras = ['past', 'present', 'future'];
  return eras[compareDates(now, someday) + 1]; // TODO: fix type error
}

export function Day({date, todos}: {date: Date, todos: Todo[] | undefined}) {
  let [ header_color, body_color, body_text_color ] = [ '', '', '' ]
  // Style day based on "era"
  const era = getEra(date);
  switch (era) {
  case 'past':
    header_color = 'bg-gray-200';
    body_color = 'bg-gray-100';
    body_text_color = 'text-gray-500';
    break;
  case 'present':
    header_color = 'bg-blue-200';
    body_color = 'bg-blue-100';
    break;
  case 'future':
    header_color = 'bg-gray-100';
    body_color = 'bg-gray-50';
    body_text_color = "text-gray-500";
    break;
  }

  let todoHtml = null;
  if (todos !== undefined) {
    todoHtml = todos.map((todo) => {
      return <TodoItem
        id={todo.id}
        text={todo.task}
        date_complete={todo.date_complete}
        bulletStyle={todo.bullet_style}
        key={todo.id}
      />
    });
  }
  const noTodosMessage = <i className="text-gray-400">You have nothing to do today.</i>

  return (
    <main>
      <div className={`p-4 ${header_color} rounded-t`}>
        <div className="text-sm text-right">'{date.getFullYear().toString().slice(-2)}</div>
        <div className="text-center">
          {date.toLocaleString('default', { month: 'long' })}
          <br />
          <span className="text-2xl">{date.getDate()}</span>
          <br />
          <span className="text-sm">{date.toLocaleString('default', { weekday: 'long' })}</span>
        </div>
      </div>
      <div className={`p-4 ${body_color} rounded-b`}>
        <DateContext.Provider value={date}>
          <div className={`${body_text_color}`}>{todoHtml === null || todoHtml.length === 0 ? noTodosMessage : todoHtml}</div>
          <div className="h-4" />
          <CreateInput />
        </DateContext.Provider>
      </div>
    </main>
  );
}
