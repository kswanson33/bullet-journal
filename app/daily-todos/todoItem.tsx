'use client';

import { useState } from "react";
import * as actions from "../db/actions";
import { DateContext, TodayContext } from "./contexts";
import { useContext } from "react";
import { useArrow, formatDate } from "../utils";
import { BulletStyle } from "../types";
import './todoItem.css';
import { FaTrash } from "react-icons/fa";
import { bulletIcon } from './cosmetic';

export function TodoItem(
  {id, text, date_complete, bulletStyle, styles}:
  {id: string, text: string, date_complete: string | null, bulletStyle: BulletStyle, styles: any}
) {
  let complete = date_complete ? true : false;
  let date = useContext(DateContext);
  let today = useContext(TodayContext);

  if (useArrow(date, today, date_complete ? new Date(date_complete) : null)) {
    bulletStyle = 'arrow';
  }
  let icon = bulletIcon(bulletStyle);

  // Display and update complete status
  const [complete_state, setComplete] = useState(complete);
  if (complete_state !== complete) {
    // if completed status is updated thru a different day's todo, this must keep parity
    setComplete(complete);
  }

  const updateCompleteness = () => {
    if (complete_state) {
      actions.setIncomplete(id);
    } else {
      actions.setCompleteOn(id, formatDate(date));
    }
    setComplete(!complete_state);
  }

  const removeTodo = () => {
    actions.deleteTodo(id);
  }

  return (
    <div className={`todo-parent flex hover:${styles.hover_color}`}>
      { icon }
      <div className="min-w-2" />
      <div className={`${complete_state ? 'line-through' : ''}`} onClick={updateCompleteness}>
        { text }
      </div>
      <div className={`trash-icon ml-auto mr-1 mt-1 h-4 w-4 min-w-4 ${styles.icon_color} hover:text-blue-600 opacity-0`} onClick={removeTodo}>
        <FaTrash />
      </div>
    </div>
  )
}
