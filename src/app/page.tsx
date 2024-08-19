import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LoginPage } from "./login/[[...login]]/login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <UserButton />
        Main page
        <a href="/daily-todos" className="p-4 bg-black rounded-xl text-white">See daily todos</a>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </main>
  );
}

// TODO: If logged in, redirect to daily todos
