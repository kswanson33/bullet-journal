'use client';

import { TodoItem } from "./todoItem";
import { Todo } from "../types";
import { formatDate } from "../utils";
import { DateContext } from "./contexts";

export function Day({date, todos, era}: {date: Date, todos: Todo[], era: 'past' | 'present' | 'future'}) {
  let [ header_color, body_color ] = [ '', '' ]
  switch (era) {
  case 'past':
    header_color = 'bg-gray-200';
    body_color = 'bg-gray-100';
    break;
  case 'present':
    header_color = 'bg-blue-200';
    body_color = 'bg-blue-100';
    break;
  case 'future':
    header_color = 'bg-gray-100';
    body_color = 'bg-gray-50';
    break;
  }

  const todoHtml = todos.map((todo) => { 
    return <TodoItem 
      id={todo.id}
      text={todo.task} 
      date_complete={todo.date_complete} 
      bulletStyle={todo.bullet_style}
      key={todo.id}
    /> 
  });

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
          {todoHtml}
        </DateContext.Provider>
      </div>
    </main>
  );
}
