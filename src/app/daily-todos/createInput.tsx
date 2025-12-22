'use client';

import { useRef } from "react";
import * as actions from "../../db/actions";
import { useFormStatus } from "react-dom";
import { FaArrowRight } from "react-icons/fa6";

/**
 * Function to run on submit for Create Todo form.
 */
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

/**
 * Form for creating a new Todo. Found at the bottom of any Day.
 * Will create a todo that begins on that day; past, present, or future.
 * The date_created will be the current time.
 * @param date Corresponds to the Day the form is embedded in.
 */
export function CreateInput({ date }: { date: Date }) {
  const formRef = useRef(null); // TODO: fix null error
  const onSubmit = (formData: FormData) => {
    formRef.current.reset();
    actions.createTodoBeginningOn(date, formData);
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
