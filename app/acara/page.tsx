import Image from "next/image";
import { Clock3, MapPin, Mosque, PartyPopper } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { wedding } from "@/lib/wedding";

const eventPresentation = [
    { icon: Mosque, accent: "bg-primary-container" },
    { icon: PartyPopper, accent: "bg-secondary-container" },
] as const;

export default function AcaraPage() {
    return (
        <PageFrame>
            <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
                <section className="flex flex-col items-center text-center">
                    <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-t-[100px] rounded-b-2xl shadow-lg shadow-primary/15">
                        <Image src={wedding.images.hero} alt={wedding.eventPage.heroAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), 384px" className="object-cover" />
                    </div>
                    <h1 className="-mt-5 z-10 rounded-full border border-outline-variant bg-surface-white px-10 py-3 font-serif text-2xl font-semibold text-primary shadow-md">{wedding.eventPage.title}</h1>
                </section>
                <section className="mt-20 grid gap-6 md:grid-cols-2">
                    {wedding.events.map((event, index) => {
                        const { icon: Icon, accent } = eventPresentation[index];

                        return (
                            <article key={event.title} className="relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-white p-6 shadow-md shadow-primary/10">
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
                                <a href={event.mapUrl} target="_blank" rel="noreferrer" className="mt-6 block rounded-full border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/5">{wedding.eventPage.mapLabel}</a>
                            </article>
                        );
                    })}
                </section>
                <section className="mt-20 text-center">
                    <h2 className="font-serif text-2xl font-semibold text-primary">{wedding.eventPage.mapTitle}</h2>
                    <div className="relative mt-6 h-64 overflow-hidden rounded-2xl">
                        <Image src={wedding.images.map} alt={wedding.eventPage.mapAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), 896px" className="object-cover" />
                    </div>
                    <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted">{wedding.eventPage.parkingNote}</p>
                </section>
            </main>
        </PageFrame>
    );
}