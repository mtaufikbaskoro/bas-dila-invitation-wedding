# Bas Easter Egg Plan

## Goal

Turn `data/about-bas.csv` into a playful, interactive hidden feature in the wedding invitation. Guests should discover the surprise by exploring or interacting with the page, then enjoy friends' nicknames, funny complaints, and heartfelt reasons Dila is lucky to have Bas. Keep the main invitation elegant and the hidden feature warm, funny, and easy to use on mobile.

## Source content

- `data/about-bas.csv` contains 18 responses with a timestamp, each respondent's answer to “Apa panggilan dari bas untukmu?” (the name/nickname Bas uses for that person), length of acquaintance, what is annoying about Bas, and why Dila is lucky to have him.
- Responses are primarily Indonesian with occasional English, informal spelling, emojis, and very long messages. Preserve each response verbatim; do not “correct” friends' voices.
- The CSV has quoted commas and at least one response containing a line break. Parse it with a real CSV parser or a small robust parser rather than splitting on commas/lines.
- Timestamps and the acquaintance-duration field can be used as supplemental details, but do not make them the focus of the display.

## Proposed experience

1. **Hide the entrance in plain sight.** Make a small heart, flower, or decorative detail on the invitation hero a keyboard- and touch-accessible trigger. For example, tapping/clicking the tiny heart beside the date three times reveals a subtle “you found Bas's secret” hint, followed by a button to open the collection. Add a secondary keyboard shortcut or a discreet footer hint so discovery does not depend on precise tapping. The feature must not block normal invitation navigation or accidentally activate from unrelated clicks.
2. **Reveal a charming mini-world.** Open the collection in an accessible dialog/drawer or dedicated overlay that feels like a playful scrapbook / “Bas field guide,” using the invitation’s existing floral palette and typography with brighter accent stickers, playful stamps, and light motion. Include a clear close control, escape-key behavior, and focus management.
3. **Make responses fun to explore.** Display each response as a card with the name/nickname Bas calls that respondent, a short “Bas lore” label, and the full complaint and appreciation text. Make the label clear so it cannot be mistaken for a nickname people use for Bas. Add simple filters or tabs (e.g. “All”, “Roasts”, “Why Dila’s lucky”), a shuffle/random-card action, and a “next note” interaction. Ensure users can still reach every response without needing to interact with animation.
4. **Give long messages a good reading experience.** Make long text wrap naturally and avoid putting very long responses into tiny cards. A card may preview a long message with an explicit expand action, or use a focused detail view; never truncate the only copy. Keep the all-responses view scrollable on small screens.
5. **Close with a heartfelt moment.** End the collection with a short celebratory note for Bas and Dila, visually distinct from the joke cards, plus a clear way to return to the invitation.

## Implementation plan

1. **Inspect the invitation entry points and conventions.** Review `app/page.tsx`, `components/open-invitation.tsx`, `app/globals.css`, and any relevant client/server component boundaries before choosing the trigger location. Follow this repository's installed Next.js 16 guidance for APIs and conventions if changing application code.
2. **Parse the CSV safely.** Add a server-side data module (or build-time data module if appropriate) that reads `data/about-bas.csv` and handles quoted delimiters, embedded newlines, and UTF-8 text correctly. Normalize records into stable fields and IDs without exposing timestamps unless they are intentionally shown. Keep raw CSV parsing out of the interactive client component where practical.
3. **Build the interactive experience.** Add a focused client component for trigger state and the collection UI. Keep the trigger dormant until deliberately activated; provide keyboard and touch access, reduced-motion handling, semantic controls, visible focus, and an accessible dialog name/description.
4. **Style to match the wedding site.** Reuse existing color tokens, floral decoration, and type treatments, with a more casual scrapbook/card language inside the Easter egg. Add responsive layouts and restrained transitions that remain usable when motion is reduced.
5. **Wire the feature into the invitation.** Place the trigger near a suitable decorative hero detail on the relevant invitation entry point(s), without changing the main invitation flow. Ensure repeated opening/closing works and page navigation remains unaffected.
6. **Handle missing or malformed content gracefully.** If the CSV cannot be parsed or has no valid records, do not crash the invitation. Avoid exposing filesystem paths or internal parsing errors in the UI.

## Verification

- Verify the CSV parser returns all 18 records, including the long multi-line response, and preserves commas, quotes, emojis, and Indonesian text.
- Verify the trigger is discoverable and works with mouse, touch, keyboard, and screen-reader-accessible controls; ordinary page use does not open it accidentally.
- Verify the dialog can be opened repeatedly, closed by its control and Escape, and has sensible focus behavior.
- Verify filters, shuffle/next interactions, and full long-message reading work on mobile and desktop.
- Check reduced-motion behavior and ensure the feature does not obscure or break the invitation's normal interactions.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` after implementation.
