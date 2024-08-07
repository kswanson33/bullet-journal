'use client';
import { useRouter } from "next/navigation";

export const TodayButton = () => {
  const router = useRouter();
  const navigate = () => {
    router.push('/daily-todos/')
  }
  return (
    <div 
      className="border-gray-700/3 border-2 rounded hover:bg-slate-100 text-gray-700 text-center px-4 py-2 w-fit h-fit"
      onClick={navigate}
    >Today</div>
  );
}