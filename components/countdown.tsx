"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { wedding } from "@/lib/wedding";

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

function getTimeRemaining(targetDate: string): TimeRemaining {
  const targetTime = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (isNaN(targetTime) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isPast: false,
  };
}

interface CountdownProps {
  targetDate?: string;
  className?: string;
}

export function Countdown({
  targetDate = wedding.date.targetDate,
  className = "",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => getTimeRemaining(targetDate));

  useEffect(() => {
    setTimeLeft(getTimeRemaining(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Pernikahan ${wedding.couple.shortName}`
  )}&dates=20261226T020000Z/20261226T100000Z&details=${encodeURIComponent(
    `Pernikahan ${wedding.couple.groomName} & ${wedding.couple.brideName}\n${wedding.date.weekday}, ${wedding.date.display}`
  )}&location=${encodeURIComponent(
    `${wedding.location.venueName}, ${wedding.location.venueAddress}`
  )}`;

  return (
    <div className={`mx-auto w-full max-w-xl text-center ${className}`}>
      <div className="relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-white/90 p-5 shadow-lg shadow-primary/5 backdrop-blur-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary sm:text-sm">
          {wedding.date.countdownTitle ?? "Menuju Hari Bahagia"}
        </p>

        <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-low/70 px-2 py-3 shadow-inner sm:px-4 sm:py-4"
            >
              <span
                suppressHydrationWarning
                className="font-serif text-2xl font-bold tracking-tight text-primary tabular-nums sm:text-4xl"
              >
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {timeLeft.isPast ? (
          <p className="mt-5 text-sm font-medium text-primary">
            Hari bahagia telah tiba! Terima kasih atas doa dan kehadirannya.
          </p>
        ) : (
          <div className="mt-5 flex justify-center">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="group motion-press inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface-white px-5 py-2 text-xs font-semibold text-primary shadow-sm transition hover:border-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
            >
              <Calendar size={15} className="text-primary transition-transform group-hover:scale-110" />
              <span>Simpan ke Kalender</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
