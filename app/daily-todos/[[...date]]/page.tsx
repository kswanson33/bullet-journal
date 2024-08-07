import { DateGrid } from "../dateGrid";
import { PaginationButton } from "../paginationButton";
import { dateStringToDate } from "@/app/utils";
import { TodayButton } from "../todayButton";

export default async function Page({params}: {params: {date: string}}) {
  // On initial page load, display the current date
  const day: Date = params.date !== undefined ? dateStringToDate(params.date[0]) : new Date();

  return (
    <div className="p-32">
      <div className="flex mb-4">
        <TodayButton />
        <div className="w-2" />
        <PaginationButton direction={"prev"} />
        <div className="w-2" />
        <PaginationButton direction={"next"} />
      </div>
      <DateGrid date={day} />
    </div>
  );
}
