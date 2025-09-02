"use client";
import dynamic from "next/dynamic";

const DynamicNylasScheduling = dynamic(
  () => import("@nylas/react").then((m) => m.NylasScheduling),
  { ssr: false }
);

export default function ClientScheduling({
  slug,
  clientId,
  schedulerApiUrl,
}: {
  slug: string;
  clientId: string;
  schedulerApiUrl: string;
}) {
  return (
    <DynamicNylasScheduling clientId={clientId} schedulerApiUrl={schedulerApiUrl} slug={slug} />
  );
}


