import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { wedding } from "@/lib/wedding";

export default function CeritaPage() {
  return (
    <PageFrame>
      <main className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <header className="mx-auto mb-20 max-w-xl text-center">
          <h1 className="font-serif text-5xl font-bold text-primary">{wedding.storyPage.title}</h1>
          <p className="mt-4 text-lg italic leading-relaxed text-muted">{wedding.storyPage.intro}</p>
        </header>
        <section className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-outline-variant/60 md:left-1/2" />
          {wedding.images.story.map((chapter, index) => (
            <article key={chapter.title} className="relative mb-20 grid gap-8 pl-12 md:grid-cols-2 md:pl-0">
              <span className="absolute left-2 top-2 h-5 w-5 rounded-full border-4 border-surface bg-primary md:left-1/2 md:-translate-x-1/2" />
              <div className={index % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"}>
                <span className="inline-block rounded-full bg-secondary-container/70 px-3 py-1 text-xs font-semibold text-secondary">{chapter.date}</span>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-primary">{chapter.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{chapter.text}</p>
              </div>
              <div className={`${index % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-2"} relative mx-0 aspect-[4/3] max-w-md overflow-hidden shadow-md shadow-primary/15 md:mx-auto ${chapter.shape}`}>
                <Image src={chapter.image} alt={chapter.title} fill sizes="(max-width: 768px) calc(100vw - 96px), 448px" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            </article>
          ))}
        </section>
        <section className="rounded-2xl bg-surface-low px-6 py-12 text-center">
          <h2 className="font-serif text-2xl font-semibold text-primary">{wedding.storyPage.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">{wedding.storyPage.ctaText}</p>
          <Link href="/rsvp" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20">{wedding.storyPage.ctaLabel} <ArrowRight size={16} /></Link>
        </section>
      </main>
    </PageFrame>
  );
}