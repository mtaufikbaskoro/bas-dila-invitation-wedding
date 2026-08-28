"use client";

import { FormEvent, useState } from "react";
import { wedding } from "@/lib/wedding";

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="rounded-2xl border border-primary/20 bg-surface-white p-8 text-center shadow-lg shadow-primary/10">
        <h2 className="font-serif text-3xl font-semibold text-primary">{wedding.rsvpForm.successTitle}</h2>
        <p className="mt-3 text-muted">{wedding.rsvpForm.successText}</p>
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
      <button type="submit" className="rounded-full bg-primary py-3 font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-[#79164b] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        {wedding.rsvpForm.submitLabel}
      </button>
    </form>
  );
}
