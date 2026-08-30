"use client";

import Image from "next/image";
import { ArrowRight, Clock3, Gift, Heart, MapPin, Mosque, PartyPopper, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { FloralDecoration } from "@/components/floral-decoration";
import { GalleryGrid } from "@/components/gallery-grid";
import { OpenInvitation } from "@/components/open-invitation";
import { PageFrame } from "@/components/page-frame";
import { Reveal } from "@/components/reveal";
import { RsvpForm } from "@/components/rsvp-form";
import { wedding } from "@/lib/wedding";

const eventPresentation = [
  { icon: Mosque, accent: "bg-primary-container" },
  { icon: PartyPopper, accent: "bg-secondary-container" },
] as const;

function Profile({
  profile,
  reverse,
  eager = false,
}: {
  profile: (typeof wedding.couple.profiles)[number];
  reverse: boolean;
  eager?: boolean;
}) {
  return (
    <article className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:text-right" : ""}`}>
      <div className="relative mx-auto h-[390px] w-full max-w-[300px] isolate sm:h-[450px] sm:max-w-[340px]">
        <div aria-hidden="true" className="absolute inset-2 translate-x-3 translate-y-3 arch-image border-2 border-outline-variant/60" />
        <div className="relative z-10 h-full overflow-hidden arch-image bg-surface-high shadow-xl shadow-primary/20">
          <Image
            src={profile.image}
            alt={`Foto ${profile.role.toLowerCase()} ${profile.name}`}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 768px) 340px, 80vw"
            className="object-cover"
            style={{ objectPosition: profile.imagePosition }}
          />
        </div>
      </div>
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">{profile.role}</p>
        <h2 className="mt-3 font-serif text-4xl font-semibold text-primary sm:text-5xl">{profile.name}</h2>
        <div className="mt-5 space-y-1 text-base leading-relaxed text-muted">
          <p>{profile.parentsLabel}</p>
          <p className="font-semibold text-foreground">{profile.parents}</p>
        </div>
      </div>
    </article>
  );
}

export function InvitationShell({ gallery }: { gallery: Array<{ fileName: string; url: string }> }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const isOpened = window.sessionStorage.getItem("invitation-opened") === "true";
    setOpened(isOpened);

    if (isOpened) {
      requestAnimationFrame(() => {
        const target = document.getElementById("mempelai");
        if (target) {
          target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
        }
      });
    }
  }, []);

  return (
    <PageFrame pattern>
      <main className="relative mx-auto w-full max-w-6xl overflow-x-hidden">
        {!opened && (
          <section id="home" className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-6 py-10 sm:px-10">
            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
              <p className="animate-fade-in-up mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">{wedding.home.eyebrow}</p>
              <h1 className="animate-fade-in-up mb-8 font-serif text-5xl font-bold leading-[1.05] text-primary [animation-delay:120ms] sm:text-7xl">
                {wedding.couple.groomName} <span className="font-light italic text-secondary">&amp;</span> {wedding.couple.brideName}
              </h1>
              <div className="animate-hero-image relative mb-8 h-[380px] w-[280px] isolate sm:h-[460px] sm:w-[340px]">
                <FloralDecoration asset="bouquet" loading="eager" className="-bottom-8 -left-12 h-48 w-44 opacity-65 sm:-bottom-10 sm:-left-16 sm:h-64 sm:w-56" />
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full rounded-b-2xl bg-primary-container/40 blur-sm" />
                <Image src={wedding.images.hero} alt={wedding.home.heroAlt} fill priority sizes="(max-width: 640px) 280px, 340px" className="relative z-10 arch-image border-4 border-surface object-cover shadow-xl shadow-primary/20" />
              </div>
              <div className="animate-hero-card relative w-full max-w-sm rounded-2xl border border-outline-variant/50 bg-surface-white p-6 shadow-lg shadow-primary/10">
                <Heart aria-hidden="true" className="animate-heart-beat absolute -left-3 -top-3 fill-primary-soft text-primary-soft" size={30} />
                <p className="font-serif text-2xl font-semibold text-foreground">{wedding.date.display}</p>
                <div className="mt-3 flex items-center justify-center gap-2 text-sm uppercase tracking-wider text-muted">
                  <MapPin size={15} />
                  <span>
                    {wedding.location.city}, {wedding.location.country}
                  </span>
                </div>
                <OpenInvitation label={wedding.home.openLabel} />
              </div>
            </div>
          </section>
        )}

        <section id="mempelai" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-16 sm:px-10 sm:py-20">
          <header className="relative z-10 mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-5xl font-bold leading-tight text-primary sm:text-6xl">{wedding.couplePage.title}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{wedding.couplePage.intro}</p>
          </header>

          <div aria-label={wedding.couplePage.profilesLabel} className="relative z-10 mx-auto mt-20 max-w-5xl space-y-20 sm:mt-28 sm:space-y-28">
            <Reveal>
              <Profile profile={wedding.couple.profiles[0]} reverse={false} eager />
            </Reveal>
            <div className="flex items-center justify-center gap-5" aria-hidden="true">
              <span className="h-px w-20 bg-outline-variant sm:w-28" />
              <Heart className="motion-sway fill-primary text-primary" size={20} />
              <span className="h-px w-20 bg-outline-variant sm:w-28" />
            </div>
            <Reveal delay={120}>
              <Profile profile={wedding.couple.profiles[1]} reverse />
            </Reveal>
          </div>
        </section>

        <section id="cerita" className="relative mx-auto max-w-5xl overflow-hidden px-6 py-16 sm:px-10">
          <header className="relative z-10 mx-auto mb-20 max-w-xl text-center">
            <h1 className="font-serif text-5xl font-bold text-primary">{wedding.storyPage.title}</h1>
            <p className="mt-4 text-lg italic leading-relaxed text-muted">{wedding.storyPage.intro}</p>
          </header>

          <div className="relative z-10">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-outline-variant/60 md:left-1/2" />
            {wedding.images.story.map((chapter, index) => (
              <Reveal key={chapter.title} delay={index * 90}>
                <article className="relative mb-20 grid gap-8 pl-12 md:grid-cols-2 md:pl-0">
                  <span className="absolute left-2 top-2 h-5 w-5 rounded-full border-4 border-surface bg-primary md:left-1/2 md:-translate-x-1/2" />
                  <div className={index % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"}>
                    <span className="inline-block rounded-full bg-secondary-container/70 px-3 py-1 text-xs font-semibold text-secondary">{chapter.date}</span>
                    <h2 className="mt-3 font-serif text-3xl font-semibold text-primary">{chapter.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted">{chapter.text}</p>
                  </div>
                  <div className={`${index % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-2"} relative mx-0 max-w-md md:mx-auto ${chapter.shape}`}>
                    {index === 0 ? <FloralDecoration asset="rose-flower" className="-right-8 -top-8 h-28 w-36 opacity-75 sm:-right-12 sm:-top-10 sm:h-36 sm:w-44" /> : null}
                    <div className="relative h-64 w-full overflow-hidden shadow-md shadow-primary/15 sm:h-80">
                      <Image src={chapter.image} alt={chapter.title} width={800} height={600} sizes="(max-width: 768px) calc(100vw - 96px), 448px" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <section className="relative z-10 rounded-2xl bg-surface-low px-6 py-12 text-center">
            <FloralDecoration asset="bouquet" className="-bottom-12 -left-20 h-36 w-56 opacity-30" />
            <h2 className="font-serif text-2xl font-semibold text-primary">{wedding.storyPage.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">{wedding.storyPage.ctaText}</p>
            <a href="#rsvp" className="group motion-press mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {wedding.storyPage.ctaLabel}
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
            </a>
          </section>
        </section>

        <section id="acara" className="relative mx-auto max-w-4xl overflow-hidden px-6 py-12 sm:px-10">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative h-72 w-full max-w-sm isolate rounded-t-[100px] rounded-b-2xl">
              <FloralDecoration asset="orange-sprig" className="-left-8 -top-4 h-28 w-32 opacity-75 sm:-left-12 sm:-top-6 sm:h-36 sm:w-40" />
              <div className="relative z-10 h-full overflow-hidden rounded-t-[100px] rounded-b-2xl shadow-lg shadow-primary/15">
                <Image src={wedding.images.hero} alt={wedding.eventPage.heroAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), 384px" className="object-cover" />
              </div>
            </div>
            <h1 className="-mt-5 z-10 rounded-full border border-outline-variant bg-surface-white px-10 py-3 font-serif text-2xl font-semibold text-primary shadow-md">{wedding.eventPage.title}</h1>
          </div>

          <div className="relative z-10 mt-20 grid gap-6 md:grid-cols-2">
            {wedding.events.map((event, index) => {
              const { icon: Icon, accent } = eventPresentation[index];

              return (
                <Reveal key={event.title} delay={index * 100}>
                  <article className="relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-white p-6 shadow-md shadow-primary/10">
                    <Icon aria-hidden="true" className="absolute -right-2 top-5 size-28 text-primary opacity-10" />
                    <div className="relative flex items-center gap-3">
                      <div className={`flex size-12 items-center justify-center rounded-full ${accent} text-primary`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl font-semibold">{event.title}</h2>
                        <p className="text-xs text-muted">{event.subtitle}</p>
                      </div>
                    </div>
                    <div className="relative mt-6 space-y-4 text-sm">
                      <p className="flex gap-3">
                        <Clock3 className="shrink-0 text-primary" size={20} />
                        <span>
                          {wedding.date.weekday}, {wedding.date.display}
                          <br />
                          <span className="text-muted">{event.time}</span>
                        </span>
                      </p>
                      <p className="flex gap-3">
                        <MapPin className="shrink-0 text-primary" size={20} />
                        <span className="font-semibold">
                          {event.place}
                          <br />
                          <span className="font-normal text-muted">{event.address}</span>
                        </span>
                      </p>
                    </div>
                    <a href={event.mapUrl} target="_blank" rel="noreferrer" className="motion-press mt-6 block rounded-full border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      {wedding.eventPage.mapLabel}
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <section className="relative z-10 mt-20 text-center">
              <FloralDecoration asset="yellow-flower" className="-right-8 top-10 h-20 w-20 opacity-55 sm:right-0 sm:h-24 sm:w-24" />
              <h2 className="font-serif text-2xl font-semibold text-primary">{wedding.eventPage.mapTitle}</h2>
              <div className="relative mt-6 h-64 overflow-hidden rounded-2xl">
                <Image src={wedding.images.map} alt={wedding.eventPage.mapAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), 896px" className="object-cover" />
              </div>
              <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted">{wedding.eventPage.parkingNote}</p>
            </section>
          </Reveal>
        </section>

        <section id="galeri" className="relative mx-auto max-w-4xl overflow-hidden px-6 py-16 sm:px-10">
          <FloralDecoration asset="green-white-leaves" className="-left-12 top-6 h-36 w-24 opacity-45 sm:left-0 sm:h-44 sm:w-28" />
          <FloralDecoration asset="brown-white-leaves" className="-right-12 top-6 h-36 w-24 opacity-45 sm:right-0 sm:h-44 sm:w-28" />
          <header className="relative z-10 mx-auto mb-16 max-w-xl text-center">
            <h1 className="font-serif text-5xl font-bold text-primary">{wedding.galleryPage.title}</h1>
            <p className="mt-4 text-lg text-muted">{wedding.galleryPage.description}</p>
            <div className="mx-auto mt-8 h-px w-16 bg-primary-container" />
          </header>
          <div className="relative z-10">
            <GalleryGrid gallery={gallery} />
          </div>
        </section>

        <section id="rsvp" className="relative mx-auto flex max-w-3xl flex-col gap-12 overflow-hidden px-6 py-10 sm:px-10">
          <div className="relative z-10 text-center">
            <div className="relative h-56 isolate rounded-t-[50%] rounded-b-2xl">
              <FloralDecoration asset="rose-flower" className="-right-4 top-5 h-20 w-20 opacity-65 sm:-right-12 sm:-top-6 sm:h-24 sm:w-24" />
              <div className="relative z-10 h-full overflow-hidden rounded-t-[50%] rounded-b-2xl shadow-lg shadow-primary/15">
                <Image src={wedding.images.rsvp} alt={wedding.rsvpPage.imageAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), 768px" className="object-cover" />
              </div>
            </div>
            <h1 className="mt-5 font-serif text-5xl font-bold text-primary">{wedding.rsvpPage.title}</h1>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{wedding.rsvpPage.intro}</p>
          </div>

          <div className="relative z-10">
            <RsvpForm />
          </div>

          <section className="relative z-10 border-t border-outline-variant/50 pt-10 text-center">
            <FloralDecoration asset="bouquet" className="-bottom-16 -left-24 h-40 w-40 opacity-45 sm:-left-32 sm:h-48 sm:w-48" />
            <h2 className="font-serif text-3xl font-semibold text-primary">{wedding.rsvpPage.giftsTitle}</h2>
            <p className="mt-3 text-muted">{wedding.rsvpPage.giftsIntro}</p>
            <div className="mt-6 grid gap-4">
              {wedding.rsvpPage.gifts.map((gift) => {
                const GiftIcon = gift.kind === "bank" ? Gift : Store;
                const iconClass = gift.kind === "bank" ? "bg-primary-soft text-primary" : "bg-secondary-container text-secondary";

                return (
                  <a key={gift.title} href={gift.href} className="flex items-center justify-between rounded-2xl bg-surface-white p-5 text-left shadow-md shadow-primary/10">
                    <span className="flex items-center gap-4">
                      <span className={`flex size-12 items-center justify-center rounded-full ${iconClass}`}><GiftIcon /></span>
                      <span>
                        <strong className="font-serif text-lg">{gift.title}</strong>
                        <small className="block text-muted">{gift.description}</small>
                      </span>
                    </span>
                    <span className="text-2xl text-outline">›</span>
                  </a>
                );
              })}
            </div>
          </section>
        </section>
      </main>
    </PageFrame>
  );
}
