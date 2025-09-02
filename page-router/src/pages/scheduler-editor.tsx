import { NylasSchedulerEditor } from "@nylas/react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Scheduler Editor</h1>
            <nav className="flex gap-4 text-sm">
              <Link href="/">Home</Link>
            </nav>
          </header>
          <style jsx global>{`
            nylas-scheduler-editor { display: block; width: 100%; max-width: 100%; }
          `}</style>
          <div className="border rounded-lg overflow-hidden">
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
                  requires_session_auth: false,
                  scheduler: {
                    rescheduling_url: `${origin}/booking-ref/:booking_ref/reschedule`,
                    cancellation_url: `${origin}/booking-ref/:booking_ref/cancel`,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
