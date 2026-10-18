# RSVP Doa Wall Plan

## Goal

Add a section immediately after the RSVP form that shares guests' names, attendance responses, and submitted doa (prayers/messages). Keep it completely absent when there are no doa to display.

## Current state

- The RSVP page is rendered in both `components/invitation-shell.tsx` and `app/undangan/page.tsx`; both currently place `RsvpForm` before the gifts section.
- `prisma/schema.prisma` stores `name`, `attendance`, and `notes` on each `Rsvp`. The form labels `notes` as “Pesan & Doa”; it is optional and may be an empty string.
- `app/api/rsvp/route.ts` upserts by normalized email, so subsequent responses replace the name, attendance, and notes for that guest.
- `lib/prisma.ts` provides the shared Prisma client.

## Implementation plan

1. **Define the public display rules.** Only include records whose trimmed `notes` value is non-empty. Show the guest name, a readable Indonesian attendance label derived from `attendance` (`attending` / `declining`), and the doa text. Do not expose email, IDs, or timestamps.
2. **Load public records on the server.** Query the required RSVP fields through Prisma in the server-rendered RSVP page path. Keep database access out of client components and return only the safe fields needed for display. Order records consistently (for example, newest updated first) and decide whether the RSVP section should show every matching record or use pagination if the list grows large.
3. **Build a focused display component.** Add a reusable section/component for the doa wall with an Indonesian heading, responsive cards, readable wrapping for long messages, and semantic markup. Preserve the invitation's existing colors, typography, spacing, and floral visual style.
4. **Place it after the form in both entry points.** Render the section directly after `RsvpForm` in `components/invitation-shell.tsx` and `app/undangan/page.tsx`, before the gifts section, using the same queried data and component so the experiences stay aligned.
5. **Omit empty states entirely.** When the filtered result list is empty, render no section, heading, placeholder, or reserved spacing. A record with blank or whitespace-only notes must not make the section appear.
6. **Handle data loading failures.** Follow the project's server-rendering and error-handling conventions. A failed query should not expose internal errors or RSVP data; choose a graceful behavior that leaves the rest of the invitation usable.

## Verification

- Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- With no RSVP records containing doa, verify the section and its spacing are absent.
- Verify an RSVP with whitespace-only notes is omitted, while a non-empty doa displays the name, correct attendance label, and full text.
- Verify a declining response is labeled correctly and no email or other private fields appear in the rendered page or client payload.
- Confirm submissions/updates are reflected on both RSVP entry points and the section is responsive on mobile and desktop.
