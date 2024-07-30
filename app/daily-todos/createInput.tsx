import { useContext, useRef } from "react";
import { createTodoOn } from "../db/actions";
import { DateContext } from "./contexts";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${pending ? "bg-blue-400" : "bg-blue-500"} text-white rounded-md p-2 min-w-8`}>{pending ? '...' : '->'}</button>
  )
}

export function CreateInput() {
  let date = useContext(DateContext);
  const formRef = useRef(0);
  const onSubmit = (formData) => {
    formRef.current.reset();
    createTodoOn(date, formData);
  }

  return (
    <form ref={formRef} action={onSubmit}>
      <div className="flex">
        <textarea 
          placeholder="..."
          className="w-full p-1 mr-1 rounded-md"
          id="task"
          name="task"
        />
        <Submit />
      </div>
    </form>
  )
}
