"use client";
import dynamic from "next/dynamic";

const DynamicNylasScheduling = dynamic(
  () => import("@nylas/react").then((m) => m.NylasScheduling),
  { ssr: false }
);

export default function ClientCancelScheduling({
  bookingRef,
  clientId,
  schedulerApiUrl,
}: {
  bookingRef: string;
  clientId: string;
  schedulerApiUrl: string;
}) {
  return (
    <DynamicNylasScheduling clientId={clientId} schedulerApiUrl={schedulerApiUrl} cancelBookingRef={bookingRef} />
  );
}


