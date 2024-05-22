import { FaCircle, FaArrowRight } from "react-icons/fa" // https://react-icons.github.io/react-icons/icons/fa6/

export function TodoItem({text, complete, bulletStyle}: {text: string, complete: boolean, bulletStyle: 'point' | 'arrow'}) {
  let bulletIcon = <FaCircle className="self-center h-2 w-2"/>
  switch (bulletStyle) {
    case 'point':
      bulletIcon = <FaCircle className="self-center h-2 w-2"/>;
      break;
    case 'arrow':
      bulletIcon = <FaArrowRight className="self-center h-2 w-2" />;
      break;
  }
  return (
    <div className={`${complete ? 'line-through' : ''} text-black hover:text-gray-600 flex`}>
      { bulletIcon }
      <div className="min-w-2" />
      { text }
    </div>
  )
}
// TODO: on click, toggle completed
// TODO: support other icons
