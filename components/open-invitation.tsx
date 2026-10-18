"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMusic } from "@/components/background-music";
import { wedding } from "@/lib/wedding";

export function OpenInvitation({ label }: { label: string }) {
  const router = useRouter();
  const { startMusic } = useMusic();
  const [phase, setPhase] = useState<"idle" | "closing" | "revealing" | "transitioning">("idle");
  const openingRef = useRef(false);
  const navigatedRef = useRef(false);
  const timeoutRefs = useRef<number[]>([]);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const phaseRef = useRef(phase);

  function updatePhase(nextPhase: typeof phase) {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }

  useEffect(() => {
    if (phase !== "idle") {
      continueButtonRef.current?.focus();
    }
  }, [phase]);

  useEffect(() => () => {
    timeoutRefs.current.forEach(window.clearTimeout);
  }, []);

  function finishOpening() {
    if (navigatedRef.current) {
      return;
    }

    navigatedRef.current = true;
    timeoutRefs.current.forEach(window.clearTimeout);
    timeoutRefs.current = [];
    router.push("/undangan");
  }

  function beginTransition() {
    if (navigatedRef.current || phaseRef.current === "transitioning") return;
    timeoutRefs.current.forEach(window.clearTimeout);
    timeoutRefs.current = [];
    updatePhase("transitioning");
    timeoutRefs.current.push(window.setTimeout(finishOpening, 850));
  }

  function handleClick() {
    if (openingRef.current) {
      return;
    }

    openingRef.current = true;
    updatePhase("closing");
    startMusic();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishOpening();
      return;
    }

    timeoutRefs.current.push(window.setTimeout(() => updatePhase("revealing"), 850));
    timeoutRefs.current.push(window.setTimeout(beginTransition, 5200));
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={phase !== "idle"}
        aria-busy={phase !== "idle"}
        className="motion-press mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-md shadow-primary/25 transition hover:bg-[#79164b] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary disabled:cursor-wait"
      >
        <span>{label}</span>
        <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-white/15">
          <ArrowRight size={15} />
        </span>
      </button>

      {phase !== "idle" && createPortal(
        <div
          className={`invitation-opening-backdrop invitation-phase-${phase} fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6 py-10`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="opening-title"
          aria-busy={phase === "transitioning"}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              beginTransition();
            } else if (event.key === "Tab") {
              event.preventDefault();
              continueButtonRef.current?.focus();
            }
          }}
        >
          <div aria-hidden="true" className="opening-glow opening-glow-one" />
          <div aria-hidden="true" className="opening-glow opening-glow-two" />
            <div className="opening-scene">
              <div className="opening-copy">
                <p className="mx-auto mb-3 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary sm:text-xs">
              <Sparkles aria-hidden="true" size={14} />
              Sebuah undangan istimewa
              <Sparkles aria-hidden="true" size={14} />
                </p>
                <h2 id="opening-title" className="font-serif text-4xl font-semibold text-primary sm:text-6xl">Untuk Anda</h2>
              </div>

              <div className="opening-stage">
              <div className="opening-letter absolute z-[1] flex flex-col items-center justify-center border-0 bg-transparent px-4 text-center shadow-none">
                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-secondary">Undangan Pernikahan</span>
                <span className="mt-2 font-serif text-2xl font-semibold text-primary">{wedding.couple.groomName} <i className="font-light text-secondary">&amp;</i> {wedding.couple.brideName}</span>
                <span className="mt-1 text-[10px] text-muted">{wedding.date.display}</span>
                <span aria-hidden="true" className="mt-3 h-px w-12 bg-primary/35" />
                <Heart aria-hidden="true" className="mt-2 fill-primary-soft text-primary" size={16} />
              </div>
                  <div aria-hidden="true" className="opening-gate-layer">
                    <Image
                      src="/assets/decorations/opening-gates.svg"
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 640px) 94vw, 80vw"
                      className="opening-gates"
                    />
              </div>
              <Sparkles aria-hidden="true" className="opening-sparkle opening-sparkle-one absolute left-[12%] top-[32%] text-secondary" size={22} />
              <Sparkles aria-hidden="true" className="opening-sparkle opening-sparkle-two absolute right-[11%] top-[24%] text-primary-container" size={18} />
              <span aria-hidden="true" className="opening-confetti opening-confetti-one absolute left-[24%] top-[44%]" />
              <span aria-hidden="true" className="opening-confetti opening-confetti-two absolute right-[23%] top-[40%]" />
            </div>

            <div className="opening-action-dock">
              <button
                ref={continueButtonRef}
                type="button"
                onClick={beginTransition}
                className="hidden opening-continue motion-press min-h-11 items-center gap-2 rounded-full border border-outline-variant bg-surface-white/90 px-6 py-2 text-sm font-semibold text-primary shadow-md shadow-primary/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
                aria-label="Lanjutkan ke undangan"
              >
                {phase === "transitioning" ? "Membuka undangan" : "Lanjutkan"}
                <ArrowRight aria-hidden="true" size={15} />
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
