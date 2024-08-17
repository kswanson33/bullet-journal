'use client';

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { dateStringToDate, getDayAfter, getDayBefore, formatDate, compareDates } from "../../utils";

export const PaginationButton = ({direction}: { direction: 'next' | 'prev'}) => {
  const router = useRouter();
  const pathArray = usePathname().split('/');

  let date = new Date();
  if (pathArray.length > 2) {
    date = dateStringToDate(pathArray[2]);
  }
  const navigateTo = direction === 'next' ? getDayAfter(date) : getDayBefore(date);
  // If navigating to today's date, use the default page
  const urlString = compareDates(navigateTo, new Date()) === 0 ? '' : formatDate(navigateTo);
  const navigate = () => {
    router.push(`/daily-todos/${urlString}`);
  }

  const buttonCss = "p-3 bg-blue-600 rounded text-white flex items-center"
  const caret = direction === 'next' ? <FaCaretRight /> : <FaCaretLeft />;
  return (
    <div onClick={navigate} className={`${buttonCss}`}>{caret}</div>
  );
}
