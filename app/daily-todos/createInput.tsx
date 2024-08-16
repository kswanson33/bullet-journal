'use client';

import { useContext, useRef } from "react";
import * as actions from "../dexie/actions";
import { DateContext } from "./contexts";
import { useFormStatus } from "react-dom";
import { FaArrowRight } from "react-icons/fa6";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${pending ? "bg-blue-400" : "bg-blue-500"} text-white rounded-md p-2 min-w-12 flex items-center justify-center`}>
        {pending ? '...' : <FaArrowRight />}
    </button>
  )
}

export function CreateInput() {
  let date = useContext(DateContext);
  const formRef = useRef(null); // TODO: fix null error
  const onSubmit = (formData: FormData) => {
    formRef.current.reset();
    actions.createTodoOn(date, formData);
    location.reload();
  }

  return (
    <form ref={formRef} action={onSubmit}>
      <div className="flex">
        <input
          type="text"
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
