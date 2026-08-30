"use client";

import Link from "next/link";
import { CalendarDays, HeartHandshake, Images, Mail, NotebookTabs } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/wedding";

const icons = { couple: HeartHandshake, story: NotebookTabs, event: CalendarDays, gallery: Images, mail: Mail };

export function BottomNav() {
  const [activeId, setActiveId] = useState("mempelai");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
      setActiveId(targetId);
    }
  }

  return (
    <nav aria-label="Navigasi utama" className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-between rounded-full border border-outline-variant/40 bg-surface/90 px-5 py-3 shadow-xl shadow-primary/10 backdrop-blur-lg sm:bottom-6 sm:w-[calc(100%-48px)]">
      {navItems.map((item) => {
        const Icon = icons[item.icon];
        const active = activeId === item.href.replace("#", "");

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(event) => handleClick(event, item.href)}
            aria-current={active ? "page" : undefined}
            className={`motion-press flex min-w-10 flex-col items-center gap-1 rounded-xl px-1 py-1 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${active ? "text-primary" : "text-muted hover:text-primary"}`}
          >
            <Icon aria-hidden="true" size={21} strokeWidth={active ? 2.4 : 1.8} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
