import { TodoItem } from "./todoItem";
import { Todo } from "../types";
import { formatDate } from "../utils";
// import styles from './day.css';

// Use regular bullet style unless todo has been forwarded
const getBulletStyle = (todo: Todo, era: 'past' | 'present' | 'future') => {
  if (todo.date_complete || era != 'past' ) { 
    return 'point';
  } else {
    return 'arrow';
  }
}

export function Day({date, todos, era}: {date: Date, todos: Todo[], era: 'past' | 'present' | 'future'}) {
  let [ header_color, body_color ] = [ '', '' ]
  switch (era) {
  case 'past':
    header_color = 'bg-gray-100';
    body_color = 'bg-gray-200';
    break;
  case 'present':
    header_color = 'bg-blue-100';
    body_color = 'bg-blue-200';
    break;
  case 'future':
    header_color = 'bg-gray-50';
    body_color = 'bg-gray-100';
    break;
  }

  const todoHtml = todos.map((todo) => { 
    return <TodoItem 
      text={todo.task} 
      complete={todo.date_complete ? true : false} 
      bulletStyle={getBulletStyle(todo, era)}
    /> 
  });
  return (
    <main className="break-inside-avoid-column">
      <div className={`p-4 text-center ${header_color}`}>{formatDate(date)}</div>
      <div className={`p-4 ${body_color}`}>
        {todoHtml}
      </div>
    </main>
  );
}
