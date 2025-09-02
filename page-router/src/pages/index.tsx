import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Nylas Scheduler quickstart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Nylas Scheduler</h1>
            <nav className="flex gap-4 text-sm">
              <Link href="/">Home</Link>
              <Link href="/scheduler-editor">Scheduler Editor</Link>
            </nav>
          </header>
          <main className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visit <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">/your-scheduler-slug</code> to open the booking page,
              or go to the Scheduler Editor to create or edit a configuration.
            </p>
            <div>
              <Link className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm" href="/scheduler-editor">
                Open Scheduler Editor
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
