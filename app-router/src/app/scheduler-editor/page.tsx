"use client";
import { NylasSchedulerEditor } from "@nylas/react";
import { useState, useEffect } from "react";

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
  console.log(process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT);
  const clientId = process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID || "Your Client ID"; 
  const identitySettings = {
    clientId,
    redirectUri: `${origin}/scheduler-editor`,
    domain: process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT || "https://api.us.nylas.com/v3", // or 'https://api.eu.nylas.com/v3' for EU data center
    hosted: true,
    accessType: "offline",
  };

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
    <NylasSchedulerEditor
      schedulerPreviewLink={`${origin}?slug={slug}`}
      nylasSessionsConfig={identitySettings}
      defaultSchedulerConfigState={{
        selectedConfiguration: {
          requires_session_auth: false, // Creates a public configuration which doesn't require a session
        },
      }}
    />
  </div>
  );
}