"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMusic } from "@/components/background-music";

export function OpenInvitation({ label }: { label: string }) {
  const { startMusic } = useMusic();

  function handleClick() {
    startMusic();
    window.sessionStorage.setItem("invitation-opened", "true");
  }

  return (
    <Link
      href="/undangan"
      onClick={handleClick}
      className="motion-press mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-[#79164b] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {label} <ChevronRight size={17} />
    </Link>
  );
}