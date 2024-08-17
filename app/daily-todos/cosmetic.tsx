import { Era, BulletStyle } from "../types";
import { FaCircle, FaArrowRight } from "react-icons/fa"; // https://react-icons.github.io/react-icons/icons/fa6/

export const stylesByEra = (era: Era) => {
  const pastStyles = {
    header_color: 'bg-gray-100',
    body_color:   'text-gray-400',
    text_color:   'text-gray-400',
    hover_color:  'bg-gray-200',
    icon_color:   'text-gray-400',
  }
  const presentStyles = {
    header_color: 'bg-blue-200',
    body_color:   'bg-blue-100',
    text_color:   'black',
    hover_color:  'bg-blue-200',
    icon_color:   'black',
  }
  const futureStyles = {
    header_color: 'bg-slate-200',
    body_color:   'bg-slate-100',
    text_color:   'text-slate-500',
    hover_color:  'bg-red-500', // TODO: broken
    icon_color:   'text-slate-500',
  }
  if (era === 'past') {
    return pastStyles;
  } else if (era === 'present') {
    return presentStyles;
  } else {
    return futureStyles;
  }
}

export const bulletIcon = (bulletStyle: BulletStyle) => {
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
