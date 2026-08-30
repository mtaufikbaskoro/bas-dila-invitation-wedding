import Image from "next/image";
import { Clock3, MapPin, Mosque, PartyPopper } from "lucide-react";
import { FloralDecoration } from "@/components/floral-decoration";
import { PageFrame } from "@/components/page-frame";
import { Reveal } from "@/components/reveal";
import { wedding } from "@/lib/wedding";

const eventPresentation = [
    { icon: Mosque, accent: "bg-primary-container" },
    { icon: PartyPopper, accent: "bg-secondary-container" },
] as const;

export default function AcaraPage() {
    return (
        <PageFrame>
            <main className="relative mx-auto max-w-4xl overflow-hidden px-6 py-12 sm:px-10">
                <section className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative h-72 w-full max-w-sm isolate rounded-t-[100px] rounded-b-2xl">
                        <FloralDecoration asset="orange-sprig" className="-left-8 -top-4 h-28 w-32 opacity-75 sm:-left-12 sm:-top-6 sm:h-36 sm:w-40" />
                        <div className="relative z-10 h-full overflow-hidden rounded-t-[100px] rounded-b-2xl shadow-lg shadow-primary/15">
                            <Image src={wedding.images.hero} alt={wedding.eventPage.heroAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), 384px" className="object-cover" />
                        </div>
                    </div>
                    <h1 className="-mt-5 z-10 rounded-full border border-outline-variant bg-surface-white px-10 py-3 font-serif text-2xl font-semibold text-primary shadow-md">{wedding.eventPage.title}</h1>
                </section>
                <section className="relative z-10 mt-20 grid gap-6 md:grid-cols-2">
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
                                    <p className="flex gap-3"><Clock3 className="shrink-0 text-primary" size={20} /><span>{wedding.date.weekday}, {wedding.date.display}<br /><span className="text-muted">{event.time}</span></span></p>
                                    <p className="flex gap-3"><MapPin className="shrink-0 text-primary" size={20} /><span className="font-semibold">{event.place}<br /><span className="font-normal text-muted">{event.address}</span></span></p>
                                </div>
                                                                <a href={event.mapUrl} target="_blank" rel="noreferrer" className="motion-press mt-6 block rounded-full border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{wedding.eventPage.mapLabel}</a>
                                                            </article>
                                                        </Reveal>
                        );
                    })}
                </section>
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
            </main>
        </PageFrame>
    );
}