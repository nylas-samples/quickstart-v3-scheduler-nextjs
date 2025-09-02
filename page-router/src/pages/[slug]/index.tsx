import { NylasScheduling } from "@nylas/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const NYLAS_CLIENT_ID = String(process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID);
const NYLAS_API_ENDPOINT = String(process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT);

/**
 * Dynamically import the Nylas Scheduling component,
 * as it currently doesn't support SSR.
 */
const DynamicNylasScheduling = dynamic(() => Promise.resolve(NylasScheduling), {
  ssr: false,
});

export default function NylasSchedulingPage() {
  const router = useRouter();
  const slug = router.query.slug as string;
  return (
    <>
      <Head>
        <title>Book a meeting</title>
        <meta
          name="description"
          content="A Next.js template with Nylas Scheduler Editor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Nylas Scheduler</h1>
            <nav className="flex gap-4 text-sm">
              <Link href="/">Home</Link>
              <Link href="/scheduler-editor">Scheduler Editor</Link>
            </nav>
          </header>
          <div className="border rounded-lg p-4">
            {!router.query.slug && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add a <code>slug</code> to the URL to see the Nylas Scheduler in action.
              </p>
            )}
            {router.query.slug && (
              <DynamicNylasScheduling
                clientId={NYLAS_CLIENT_ID}
                slug={slug}
                schedulerApiUrl={NYLAS_API_ENDPOINT}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
