'use client';

import { useState } from "react";
import { FaCircle, FaArrowRight, FaTrash } from "react-icons/fa" // https://react-icons.github.io/react-icons/icons/fa6/
import * as actions from "../db/actions";
import { DateContext, TodayContext } from "./contexts";
import { useContext } from "react";
import { compareDates, formatDate } from "../utils";
import { BulletStyle } from "../types";
import './todoItem.css';

export function TodoItem({id, text, date_complete, bulletStyle}: {id: string, text: string, date_complete: string, bulletStyle: BulletStyle}) {
  let complete = date_complete ? true : false;
  let date = useContext(DateContext);
  let today = useContext(TodayContext);

  if (useArrow(date, today, complete ? new Date(date_complete) : null)) {
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
    <div className="todo-parent flex hover:bg-gray-200">
      { icon }
      <div className="min-w-2" />
      <div className={`${complete_state ? 'line-through' : ''}`} onClick={updateCompleteness}>
        { text }
      </div>
      <div className="trash-icon ml-auto mr-1 mt-1 h-4 w-4 min-w-4 text-gray-600 hover:text-blue-600 opacity-0" onClick={removeTodo}>
        <FaTrash />
      </div>
    </div>
  )
}

// Helper fns

const bulletIcon = (bulletStyle: BulletStyle) => {
  const icon_styles = "mt-2 ml-1 h-2 w-2 min-w-2"
  let icon = <FaCircle className={`${icon_styles}`}/>
  switch (bulletStyle) {
    case 'point':
      icon = <FaCircle className={`${icon_styles}`}/>;
      break;
    case 'arrow':
      icon = <FaArrowRight className={`${icon_styles}`} />;
      break;
    default:
      icon = <FaCircle className={`${icon_styles}`}/>;
      break;
  }
  return icon;
  // TODO: support other icons
}

// Use arrow if todo is incomplete and in the past, or if complete date is later than display date
const useArrow = (parentDate: Date, currentDate: Date, dateComplete: Date | null): boolean => {
  if ((!dateComplete && compareDates(parentDate, currentDate) === -1) || 
      ( dateComplete && compareDates(parentDate, dateComplete) === -1)) {
    return true;
  }
  return false;
}
