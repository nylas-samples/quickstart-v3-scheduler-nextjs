import Link from "next/link";
import ClientCancelScheduling from "./ClientCancelScheduling";

export default async function CancelBookingPage({
  params,
}: {
  params: Promise<{ bookingRef: string }>;
}) {
  const { bookingRef } = await params;
  const clientId = process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID || "Your Client ID";
  const schedulerApiUrl = (process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT || "https://api.us.nylas.com/v3").replace("/v3", "");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Cancel booking</h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/">Home</Link>
            <Link href="/scheduler-editor">Scheduler Editor</Link>
          </nav>
        </header>
        <div className="border rounded-lg p-4">
          <ClientCancelScheduling bookingRef={bookingRef} clientId={clientId} schedulerApiUrl={schedulerApiUrl} />
        </div>
      </div>
    </div>
  );
}


