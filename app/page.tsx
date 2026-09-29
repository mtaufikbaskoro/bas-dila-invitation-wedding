import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { FloralDecoration } from "@/components/floral-decoration";
import { OpenInvitation } from "@/components/open-invitation";
import { PageFrame } from "@/components/page-frame";
import { wedding } from "@/lib/wedding";

export default function Home() {
  return (
    <PageFrame pattern>
      <main className="home-invitation-canvas relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
        <FloralDecoration asset="corner-floral" layer="background" priority className="-left-12 top-10 h-44 w-44 rotate-180 opacity-35 sm:left-0 sm:top-8 sm:h-60 sm:w-60" />
        <FloralDecoration asset="corner-floral" layer="background" priority className="-right-10 bottom-10 h-48 w-48 opacity-45 sm:right-0 sm:bottom-8 sm:h-64 sm:w-64" />
        <section className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
          <p className="animate-fade-in-up mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
            {wedding.home.eyebrow}
            <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
          </p>
          <h1 className="animate-fade-in-up mb-6 font-serif text-5xl font-bold leading-[1.05] text-primary [animation-delay:120ms] sm:mb-8 sm:text-7xl">
            {wedding.couple.groomName} <span className="font-light italic text-secondary">&amp;</span> {wedding.couple.brideName}
          </h1>
          <div className="home-portrait-frame animate-hero-image relative mb-7 h-[340px] w-[252px] isolate sm:mb-8 sm:h-[440px] sm:w-[328px]">
            <FloralDecoration asset="bouquet" loading="eager" className="-bottom-8 -left-12 h-48 w-44 opacity-65 sm:-bottom-10 sm:-left-16 sm:h-64 sm:w-56" />
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full rounded-b-2xl bg-primary-container/40 blur-sm" />
            <Image src={wedding.images.hero} alt={wedding.home.heroAlt} fill priority sizes="(max-width: 640px) 280px, 340px" className="relative z-10 arch-image border-4 border-surface object-cover shadow-xl shadow-primary/20" />
          </div>
          <div className="animate-hero-card relative w-full max-w-sm border-y border-outline-variant/65 bg-surface-white/85 px-6 py-5 shadow-lg shadow-primary/10 backdrop-blur-sm sm:px-8 sm:py-6">
            <Heart aria-hidden="true" className="animate-heart-beat absolute -left-3 -top-3 fill-primary-soft text-primary-soft" size={30} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">Save the date</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">{wedding.date.display}</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.14em] text-muted sm:text-sm">
              <MapPin aria-hidden="true" size={15} />
              <span>{wedding.location.city}, {wedding.location.country}</span>
            </div>
            <OpenInvitation label={wedding.home.openLabel} />
          </div>
          <div className="relative mt-4 h-10 w-64 sm:mt-5 sm:h-12 sm:w-80">
            <FloralDecoration asset="botanical-divider" layer="background" motion={false} className="inset-0 h-full w-full opacity-70" />
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
