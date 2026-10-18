import type { RsvpDoaEntry } from "@/lib/rsvp-doa";

export function RsvpDoaWall({ entries }: { entries: RsvpDoaEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section aria-labelledby="doa-wall-title" className="relative z-10">
      <header className="mb-6 text-center">
        <h2 id="doa-wall-title" className="font-serif text-3xl font-semibold text-primary">Doa &amp; Ucapan</h2>
        <p className="mt-2 text-sm text-muted">Doa dan pesan hangat dari keluarga serta sahabat.</p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        {entries.map((entry, index) => (
          <li key={`${entry.name}-${index}`}>
            <article className="h-full rounded-2xl border border-outline-variant/50 bg-surface-white p-5 shadow-md shadow-primary/10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-serif text-xl font-semibold text-primary">{entry.name}</h3>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${entry.attendance === "attending" ? "bg-primary-soft text-primary" : "bg-secondary-container text-secondary"}`}>
                  {entry.attendance === "attending" ? "Hadir" : "Tidak hadir"}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed text-muted">{entry.notes}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
