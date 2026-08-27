import Image from "next/image";
import { Heart } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { coupleProfiles } from "@/lib/wedding";

function Profile({
  profile,
  reverse,
}: {
  profile: (typeof coupleProfiles)[number];
  reverse: boolean;
}) {
  return (
    <article className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:text-right" : ""}`}>
      <div className="relative mx-auto h-[390px] w-full max-w-[300px] sm:h-[450px] sm:max-w-[340px]">
        <div aria-hidden="true" className="absolute inset-2 translate-x-3 translate-y-3 arch-image border-2 border-outline-variant/60" />
        <div className="relative h-full overflow-hidden arch-image bg-surface-high shadow-xl shadow-primary/20">
          <Image
            src={profile.image}
            alt={`Foto ${profile.role.toLowerCase()} ${profile.name}`}
            fill
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

export default function MempelaiPage() {
  return (
    <PageFrame>
      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-5xl font-bold leading-tight text-primary sm:text-6xl">Sang Mempelai</h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Dengan penuh rasa syukur dan memohon ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.
          </p>
        </header>

        <section aria-label="Profil mempelai" className="mx-auto mt-20 max-w-5xl space-y-20 sm:mt-28 sm:space-y-28">
          <Profile profile={coupleProfiles[0]} reverse={false} />
          <div className="flex items-center justify-center gap-5" aria-hidden="true">
            <span className="h-px w-20 bg-outline-variant sm:w-28" />
            <Heart className="fill-primary text-primary" size={20} />
            <span className="h-px w-20 bg-outline-variant sm:w-28" />
          </div>
          <Profile profile={coupleProfiles[1]} reverse />
        </section>
      </main>
    </PageFrame>
  );
}