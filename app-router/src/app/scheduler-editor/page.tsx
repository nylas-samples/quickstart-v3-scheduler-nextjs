"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SchedulerEditor() {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    // Set the origin once we're on the client
    setOrigin(window.location.origin);
  }, []);

  // While origin is not yet available, show a loading state
  if (!origin) {
    return <div>Loading...</div>;
  }
  const clientId = process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID || "Your Client ID"; 
  const identitySettings = {
    clientId,
    redirectUri: `${origin}/scheduler-editor`,
    domain: process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT || "https://api.us.nylas.com/v3", // or 'https://api.eu.nylas.com/v3' for EU data center
    hosted: true,
    accessType: "offline",
  };

  return (
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
            nylasSessionsConfig={identitySettings}
            requiresSlug={true}
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
  );
}

const DynamicNylasSchedulerEditor = dynamic(
  () => import("@nylas/react").then((m) => m.NylasSchedulerEditor),
  { ssr: false }
);