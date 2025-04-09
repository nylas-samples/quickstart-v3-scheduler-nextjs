"use client";
import { NylasScheduling } from "@nylas/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SchedulingPage() {
  const [origin, setOrigin] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    // Set the origin once we're on the client
    setOrigin(window.location.origin);
  }, []);

  // While origin is not yet available, show a loading state
  if (!origin) {
    return <div>Loading...</div>;
  }

  // Use environment variable with fallback
  const clientId = process.env.NEXT_PUBLIC_NYLAS_CLIENT_ID || "Your Client ID"; 
  const schedulerApiUrl = (process.env.NEXT_PUBLIC_NYLAS_API_ENDPOINT || "https://api.us.nylas.com/v3").replace("/v3", "");
  
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <NylasScheduling 
        slug={slug || "test"} // Use the slug from URL or fallback to default
        clientId={clientId}
        schedulerApiUrl={schedulerApiUrl}
        mode="app"
      />
  </div>
  );
}