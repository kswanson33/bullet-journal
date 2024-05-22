import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Main page
      <a href="/daily-todos" className="p-4 bg-black rounded-xl text-white">See daily todos</a>
    </main>
  );
}
