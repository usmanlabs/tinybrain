import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="flex w-full max-w-lg flex-col items-center gap-6 text-center">
        <p className="font-mono text-sm tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Page not found
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          This page does not exist. If you opened a short link, that slug is
          unknown.
        </p>
        <Link
          href="/"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Go home
        </Link>
      </main>
    </div>
  );
}
