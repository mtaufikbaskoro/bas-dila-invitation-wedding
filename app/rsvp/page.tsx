import Image from "next/image";
import { Gift, Store } from "lucide-react";
import { FloralDecoration } from "@/components/floral-decoration";
import { PageFrame } from "@/components/page-frame";
import { RsvpForm } from "@/components/rsvp-form";
import { wedding } from "@/lib/wedding";

export default function RsvpPage() {
  return (
    <PageFrame>
      <main className="relative mx-auto flex max-w-3xl flex-col gap-12 overflow-hidden px-6 py-10 sm:px-10">
        <section className="relative z-10 text-center">
          <div className="relative h-56 isolate rounded-t-[50%] rounded-b-2xl">
            <FloralDecoration asset="rose-flower" className="-right-4 top-5 h-20 w-20 opacity-65 sm:-right-12 sm:-top-6 sm:h-24 sm:w-24" />
            <div className="relative z-10 h-full overflow-hidden rounded-t-[50%] rounded-b-2xl shadow-lg shadow-primary/15">
              <Image src={wedding.images.rsvp} alt={wedding.rsvpPage.imageAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), 768px" className="object-cover" />
            </div>
          </div>
          <h1 className="mt-5 font-serif text-5xl font-bold text-primary">{wedding.rsvpPage.title}</h1>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{wedding.rsvpPage.intro}</p>
        </section>
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
                    <span><strong className="font-serif text-lg">{gift.title}</strong><small className="block text-muted">{gift.description}</small></span>
                  </span>
                  <span className="text-2xl text-outline">›</span>
                </a>
              );
            })}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
