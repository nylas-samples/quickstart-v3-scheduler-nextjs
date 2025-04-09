"use client";

import Image from "next/image";
import SchedulingPage from "./scheduling-page/page";
export default function Home() {
  // State to hold the window origin once available

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SchedulingPage />
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/scheduler-editor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to scheduler editor →
        </a>
      </main>
    </div>
  );
}