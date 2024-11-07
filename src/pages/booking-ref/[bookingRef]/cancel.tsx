import { NylasScheduling } from "@nylas/react";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const NYLAS_CLIENT_ID = String(process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID);
const NYLAS_API_ENDPOINT = String(process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT);

/**
 * Dynamically import the Nylas Scheduling component,
 * as it currently doesn't support SSR.
 */
const DynamicNylasScheduling = dynamic(() => Promise.resolve(NylasScheduling), {
  ssr: false,
});

export default function NylasSchedulingCancelPage() {
  const router = useRouter();
  const bookingRef = router.query.bookingRef as string;
  return (
    <>
      <Head>
        <title>Cancel a meeting</title>
        <meta
          name="description"
          content="A Next.js template with Nylas Scheduler Editor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style global jsx>{`
        @media (prefers-color-scheme: dark) {
          nylas-scheduling {
            color: black;
          }
        }
      `}</style>
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/scheduler-editor"
          >
            Go to the Scheduler Editor
          </Link>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
              <DynamicNylasScheduling
                clientId={NYLAS_CLIENT_ID}
                schedulerApiUrl={NYLAS_API_ENDPOINT}
                cancelBookingRef={bookingRef}
              />
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://developer.nylas.com/docs/v3/scheduler/?utm_source=quickstart-v3-scheduler-nextjs&utm_medium=github-repo&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://developer.nylas.com/docs/v3/scheduler/getting-started/?utm_source=quickstart-v3-scheduler-nextjs&utm_medium=github-repo&utm_campaign=nylas-samples"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://developer.nylas.com?utm_source=quickstart-v3-scheduler-nextjs&utm_medium=github-repo&utm_campaign=nylas-samples"
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
            Go to developer.nylas.com →
          </a>
        </footer>
      </div>
    </>
  );
}
