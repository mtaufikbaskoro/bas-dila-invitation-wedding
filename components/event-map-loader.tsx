"use client";

import dynamic from "next/dynamic";
import { wedding } from "@/lib/wedding";

const EventMap = dynamic(() => import("@/components/event-map").then((module) => module.EventMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-surface-low px-6 text-center text-sm text-muted">
      <span>{wedding.location.venueName} · {wedding.location.venueAddress}</span>
      <a className="font-semibold text-primary underline" href={wedding.location.mapUrl} target="_blank" rel="noreferrer">
        Buka lokasi di Google Maps
      </a>
    </div>
  ),
});

export function EventMapLoader() {
  return <EventMap />;
}
