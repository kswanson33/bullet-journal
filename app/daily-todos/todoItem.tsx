'use client';

import { useState } from "react";
import { FaCircle, FaArrowRight } from "react-icons/fa" // https://react-icons.github.io/react-icons/icons/fa6/
import { setCompleteOn, setIncomplete } from "../db/actions";
import { DateContext, TodayContext } from "./contexts";
import { useContext } from "react";
import { formatDate } from "../utils";
import { BulletStyle } from "../types";

export function TodoItem({id, text, date_complete, bulletStyle}: {id: string, text: string, date_complete: string, bulletStyle: BulletStyle}) {
  let complete = date_complete ? true : false;
  let date = useContext(DateContext);
  let today = useContext(TodayContext);

  // Use arrow if todo is incomplete and in the past, or if complete date is later than display date
  if ((date < today && !date_complete) || (date_complete && new Date(formatDate(date)) < new Date(date_complete))) {
    // console.log(`${new Date(formatDate(date))} < ${new Date(date_complete)} is ` + (new Date(formatDate(date)) < new Date(date_complete)));
    bulletStyle = 'arrow';
  }
  let icon = bulletIcon(bulletStyle);

  // Display and update complete status
  const [complete_state, setComplete] = useState(complete);
  if (complete_state !== complete) { 
    // if completed status is updated thru a different day's todo, this must keep parity
    setComplete(complete);
  }

  function handleClick() {
    if (complete_state) {
      setIncomplete(id);
    } else {
      setCompleteOn(id, formatDate(date));
    }
    setComplete(!complete_state);
  }
  
  return (
    <div className={`${complete_state ? 'line-through' : ''} text-black hover:text-gray-600 flex`} onClick={handleClick}>
      { icon }
      <div className="min-w-2" />
      { text }
    </div>
  )
}

const bulletIcon = (bulletStyle: BulletStyle) => {
  let icon = <FaCircle className="self-center h-2 w-2 min-w-2"/>
  switch (bulletStyle) {
    case 'point':
      icon = <FaCircle className="self-center h-2 w-2 min-w-2"/>;
      break;
    case 'arrow':
      icon = <FaArrowRight className="self-center h-2 w-2 min-w-2" />;
      break;
    default:
      icon = <FaCircle className="self-center h-2 w-2 min-w-2"/>;
      break;
  }
  return icon;
}

// TODO: support other icons
