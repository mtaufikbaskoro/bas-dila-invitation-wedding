"use client";

import { FormEvent, useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [challenge, setChallenge] = useState<{ question: string; token: string } | null>(null);
  const [error, setError] = useState("");
  const [loadingChallenge, setLoadingChallenge] = useState(true);

  async function loadChallenge() {
    setLoadingChallenge(true);
    setChallenge(null);
    try {
      const response = await fetch("/api/rsvp/challenge", { cache: "no-store" });
      if (!response.ok) throw new Error();
      setChallenge(await response.json());
      setError("");
    } catch {
      setError("Tantangan verifikasi belum tersedia. Silakan coba lagi.");
    } finally {
      setLoadingChallenge(false);
    }
  }

  useEffect(() => { void loadChallenge(); }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, challengeToken: challenge?.token || "" }) });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Konfirmasi belum dapat dikirim. Silakan coba lagi.");
        await loadChallenge();
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Konfirmasi belum dapat dikirim. Periksa koneksi Anda dan coba lagi.");
      await loadChallenge();
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <section className="rounded-2xl border border-primary/20 bg-surface-white p-8 text-center shadow-lg shadow-primary/10">
        <h2 className="font-serif text-3xl font-semibold text-primary">{wedding.rsvpForm.successTitle}</h2>
        <p className="mt-3 text-muted">Konfirmasi kehadiran Anda telah tersimpan.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-6 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary">
          {wedding.rsvpForm.resetLabel}
        </button>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl bg-surface-white p-6 shadow-lg shadow-primary/10 sm:p-8">
      <label className="text-sm font-semibold">
        {wedding.rsvpForm.nameLabel}
        <input required name="name" placeholder={wedding.rsvpForm.namePlaceholder} className="mt-2 w-full rounded-xl border border-outline-variant bg-surface-low p-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </label>
      <label className="text-sm font-semibold">
        {wedding.rsvpForm.emailLabel}
        <input required type="email" name="email" placeholder={wedding.rsvpForm.emailPlaceholder} className="mt-2 w-full rounded-xl border border-outline-variant bg-surface-low p-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </label>
      <fieldset>
        <legend className="text-sm font-semibold">{wedding.rsvpForm.attendanceLabel}</legend>
        <div className="mt-2 grid gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-outline-variant p-3 font-normal has-[:checked]:border-primary has-[:checked]:bg-primary-soft">
            <input required type="radio" name="attendance" value="attending" className="accent-primary" />
            {wedding.rsvpForm.attending}
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-outline-variant p-3 font-normal has-[:checked]:border-outline">
            <input type="radio" name="attendance" value="declining" className="accent-primary" />
            {wedding.rsvpForm.declining}
          </label>
        </div>
      </fieldset>
      <label className="text-sm font-semibold">
        {wedding.rsvpForm.notesLabel} <span className="font-normal text-muted">({wedding.rsvpForm.optionalLabel})</span>
        <textarea name="notes" rows={4} placeholder={wedding.rsvpForm.notesPlaceholder} className="mt-2 w-full resize-none rounded-xl border border-outline-variant bg-surface-low p-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </label>
      <fieldset disabled={!challenge || pending} className="flex flex-col gap-2">
        <legend className="text-sm font-semibold">Verifikasi</legend>
        <p id="captcha-help" className="text-sm text-muted">Jawab pertanyaan sederhana berikut untuk mengirim konfirmasi: {challenge?.question || (loadingChallenge ? "Memuat pertanyaan…" : "Pertanyaan belum tersedia.")}</p>
        {!challenge && !loadingChallenge ? <button type="button" onClick={() => void loadChallenge()} className="self-start text-sm font-semibold text-primary underline">Muat ulang pertanyaan</button> : null}
        <input required inputMode="numeric" pattern="[0-9]{1,2}" name="answer" aria-describedby="captcha-help" autoComplete="off" placeholder="Jawaban" className="w-full rounded-xl border border-outline-variant bg-surface-low p-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </fieldset>
      <p role="alert" aria-live="polite" className={error ? "text-sm text-red-700" : "sr-only"}>{error}</p>
      <button disabled={!challenge || pending} type="submit" className="rounded-full bg-primary py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-[#79164b] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Mengirim…" : wedding.rsvpForm.submitLabel}
      </button>
    </form>
  );
}
