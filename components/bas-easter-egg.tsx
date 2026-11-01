"use client";

import { Heart, Lightbulb, MessageCircle, Shuffle, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { BasNote } from "@/lib/about-bas";

type Filter = "all" | "roasts" | "love";

export function BasEasterEgg({ notes }: { notes: BasNote[] }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tapTimes = useRef<number[]>([]);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.altKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setOpen(true);
      }
      if (open && event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
      return () => { document.body.style.overflow = previousOverflow; };
    }
    openerRef.current?.focus();
  }, [open]);

  const available = notes.filter((note) => filter === "all" || (filter === "roasts" ? note.roast : note.appreciation));
  const current = available.length ? available[index % available.length] : undefined;

  function changeFilter(next: Filter) {
    setFilter(next);
    setIndex(0);
    setExpanded(false);
  }

  function discover(): boolean {
    const now = Date.now();
    tapTimes.current = [...tapTimes.current.filter((time) => now - time < 1800), now];
    if (tapTimes.current.length >= 3) {
      tapTimes.current = [];
      return true;
    }
    return false;
  }

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => { if (discover()) setOpen(true); }}
        aria-label="Temukan cerita rahasia tentang Bas"
        className="absolute -left-3 -top-3 z-10 flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary shadow-sm transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Heart aria-hidden="true" className="fill-current" size={17} />
      </button>

      {mounted && open && createPortal(
        <div className="bas-egg-backdrop fixed inset-0 z-[100] flex items-end justify-center bg-[#21151acc] p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="bas-egg-title" aria-describedby="bas-egg-description" onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }} className="bas-egg-panel relative w-full max-w-3xl overflow-hidden rounded-t-[2rem] border border-outline-variant/70 bg-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 shadow-2xl sm:rounded-[2rem] sm:px-9 sm:pb-8 sm:pt-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-secondary-container/40 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-secondary"><Sparkles size={14} /> A little Bas lore</p>
                <h2 id="bas-egg-title" className="mt-2 font-serif text-3xl font-bold text-primary sm:text-4xl">The Bas Field Guide</h2>
                <p id="bas-egg-description" className="mt-2 text-sm text-muted">Cerita, roast, dan alasan Dila beruntung — langsung dari teman-temannya.</p>
              </div>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Tutup Bas Field Guide" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-white text-primary hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><X size={19} /></button>
            </div>

            <div className="relative mt-6 flex flex-wrap gap-2" aria-label="Filter cerita">
              {([ ["all", "Semua cerita"], ["roasts", "Roast Bas"], ["love", "Kenapa Dila beruntung"] ] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => changeFilter(value)} aria-pressed={filter === value} className={`rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${filter === value ? "border-primary bg-primary text-white" : "border-outline-variant bg-white text-primary hover:bg-primary-soft"}`}>{label}</button>
              ))}
            </div>

            {current ? <article aria-live="polite" className="relative mt-4 rounded-2xl border border-outline-variant/70 bg-white p-5 shadow-md shadow-primary/10 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary-container/55 px-3 py-1.5 text-xs font-bold text-secondary"><MessageCircle size={14} /> Bas calls them “{current.calledByBas || "???"}”</span>
                <span className="text-xs text-muted">{index % available.length + 1} / {available.length}</span>
              </div>
              {current.knownFor && <p className="mt-4 text-xs text-muted">Sudah kenal Bas: <strong className="font-semibold text-foreground">{current.knownFor}</strong></p>}
              {(filter !== "love" && current.roast) && <div className="mt-5 rounded-xl bg-primary-soft/45 p-4"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><Lightbulb size={14} /> The roast</p><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">{current.roast}</p></div>}
              {(filter !== "roasts" && current.appreciation) && <div className="mt-3 rounded-xl bg-secondary-container/30 p-4"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary"><Heart size={14} /> Why Dila’s lucky</p><p className={`mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground ${!expanded ? "line-clamp-5" : ""}`}>{current.appreciation}</p>{current.appreciation.length > 260 && <button type="button" onClick={() => setExpanded(!expanded)} className="mt-2 text-xs font-bold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{expanded ? "Show less" : "Read the full note"}</button>}</div>}
            </article> : <p className="relative mt-6 rounded-2xl bg-white p-6 text-center text-sm text-muted">Belum ada cerita di bagian ini.</p>}

            <div className="relative mt-4 flex flex-wrap justify-between gap-3">
              <button type="button" onClick={() => { setIndex(Math.floor(Math.random() * Math.max(available.length, 1))); setExpanded(false); }} disabled={available.length < 2} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-outline-variant px-4 text-sm font-semibold text-primary hover:bg-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><Shuffle size={16} /> Surprise me</button>
              <button type="button" onClick={() => { setIndex((value) => (value + 1) % Math.max(available.length, 1)); setExpanded(false); }} disabled={available.length < 2} className="motion-press min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-md shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Next note <span aria-hidden="true">→</span></button>
            </div>
            <p className="relative mt-5 text-center font-serif text-sm italic text-secondary">A collection of love (and a little bit of bullying) for Bas &amp; Dila ♡</p>
          </section>
        </div>, document.body,
      )}
    </>
  );
}
