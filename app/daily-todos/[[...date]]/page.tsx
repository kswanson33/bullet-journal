import { DateGrid } from "../dateGrid";
import { PaginationButton } from "../paginationButton";
import { dateStringToDate } from "@/app/utils";

export default async function Page({params}: {params: {date: string}}) {
  // On initial page load, display the current date
  const day: Date = params.date !== undefined ? dateStringToDate(params.date[0]) : new Date();

  return (
    <div className="p-32 flex">
      <div><PaginationButton direction={"prev"} /></div>
      <DateGrid date={day} />
      <div>
        <PaginationButton direction={"next"} />
      </div>
    </div>
  );
}
