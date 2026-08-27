import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, MapPin } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { weddingImages } from "@/lib/wedding";

export default function Home() {
  return (
    <PageFrame pattern showBottomNav={false}>
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-10 sm:px-10">
        <section className="flex w-full max-w-2xl flex-col items-center text-center">
          <p className="animate-fade-in-up mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Pernikahan Dari</p>
          <h1 className="animate-fade-in-up mb-8 font-serif text-5xl font-bold leading-[1.05] text-primary [animation-delay:120ms] sm:text-7xl">Eleanor <span className="font-light italic text-secondary">&amp;</span> James</h1>
          <div className="animate-zoom-in relative mb-8 h-[380px] w-[280px] [animation-delay:240ms] sm:h-[460px] sm:w-[340px]"><div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full rounded-b-2xl bg-primary-container/40 blur-sm" /><Image src={weddingImages.hero} alt="Ilustrasi foto Eleanor dan James" fill priority className="arch-image border-4 border-surface object-cover shadow-xl shadow-primary/20" /></div>
          <div className="animate-fade-in-up relative w-full max-w-sm rounded-2xl border border-outline-variant/50 bg-surface-white p-6 shadow-lg shadow-primary/10 [animation-delay:420ms]"><Heart aria-hidden="true" className="absolute -left-3 -top-3 fill-primary-soft text-primary-soft" size={30} /><p className="font-serif text-2xl font-semibold text-foreground">25 Oktober 2024</p><div className="mt-3 flex items-center justify-center gap-2 text-sm uppercase tracking-wider text-muted"><MapPin size={15} /><span>Jakarta, Indonesia</span></div><Link href="/mempelai" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-[#79164b] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Buka Undangan <ChevronRight size={17} /></Link></div>
        </section>
      </main>
    </PageFrame>
  );
}
