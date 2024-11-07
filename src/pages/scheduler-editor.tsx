import { NylasSchedulerEditor } from "@nylas/react";
import Image from "next/image";
import localFont from "next/font/local";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const NYLAS_CLIENT_ID = String(process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID);
const NYLAS_API_ENDPOINT = String(process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["origin"] || req.headers["host"];
  const origin = `${protocol}://${host}`;

  return {
    props: {
      origin,
    },
  };
};
/**
 * Dynamically import the Nylas Scheduler Editor component,
 * as it currently doesn't support SSR.
 */
const DynamicNylasSchedulerEditor = dynamic(
  () => Promise.resolve(NylasSchedulerEditor),
  {
    ssr: false,
  }
);

export default function SchedulerEditorPage({
  origin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Scheduler Editor</title>
        <meta
          name="description"
          content="A Next.js template with Nylas Scheduler Editor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style global jsx>{`
        @media (prefers-color-scheme: dark) {
          nylas-scheduler-editor {
            color: black;
          }
          nylas-scheduler-editor::part(login-component) {
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
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <DynamicNylasSchedulerEditor
              schedulerPreviewLink={`${origin}/{slug}`}
              requiresSlug={true}
              nylasSessionsConfig={{
                clientId: NYLAS_CLIENT_ID,
                redirectUri: `${origin}/scheduler-editor`,
                domain: NYLAS_API_ENDPOINT,
                hosted: true,
                accessType: "offline",
              }}
              defaultSchedulerConfigState={{
                selectedConfiguration: {
                  requires_session_auth: false, // Creates a public configuration which doesn't require a session
                  scheduler: {
                    // The callback URLs to be set in email notifications
                    rescheduling_url: `${origin}/booking-ref/:booking_ref/reschedule`, // The URL of the email notification includes the booking reference
                    cancellation_url: `${origin}/booking-ref/:booking_ref/cancel`,
                  },
                },
              }}
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
