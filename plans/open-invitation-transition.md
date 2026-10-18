# Open Invitation Transition Plan

## Goal

Update `components/open-invitation.tsx` so opening the invitation feels like a complete, continuous transition: the initial screen fully closes, the invitation card is revealed, and the scene flows directly into the `/undangan` page.

## Current behavior

- Clicking the primary button shows a fixed portal overlay with a backdrop, opening-gate artwork, and a card.
- CSS keyframes run for 6.6 seconds. The backdrop fades in and eventually fades out; the card scales and fades away.
- Navigation is timer-based (`setTimeout(..., 6600)`), with a separate “Lanjutkan” button and Escape key both able to navigate immediately.
- The reduced-motion path navigates immediately, skipping the visual sequence.

## Proposed experience

1. **Close the entry screen completely.** On activation, cover the viewport with an opaque transition layer and animate the entry content out so the underlying screen is no longer visible during the sequence.
2. **Reveal the invitation card.** Once the close phase completes, bring the card forward as the visual focus. Keep the gate-opening motion behind it and give the card a deliberate, readable pause.
3. **Flow into the invitation page.** Transition the card/scene into the `/undangan` hero rather than fading to an empty backdrop. Coordinate navigation with the animation boundary and use a matching entrance treatment on the destination so the handoff reads as one motion.

## Implementation steps

1. **Define explicit animation phases** in `components/open-invitation.tsx` (for example: `closing`, `revealing`, `transitioning`) instead of relying on one long fixed animation duration. Preserve the one-time navigation guard and timer cleanup.
2. **Implement full-screen close styling** in `app/globals.css`: ensure the overlay is viewport-fixed, opaque enough to hide the initial page, and animates the entry view out before card reveal begins.
3. **Sequence the card and gates** with phase-specific classes/keyframes. Confirm the card remains legible for a short beat before it moves toward the destination transition.
4. **Coordinate the `/undangan` handoff.** Trigger `router.push` at the transition point and add/adjust destination entrance styling if needed to continue the card motion without a perceptible blank frame.
5. **Handle controls accessibly.** Keep keyboard focus within the active dialog, support Escape consistently with the sequence, expose an appropriate busy state, and retain a reduced-motion path that reaches `/undangan` promptly without trapping the visitor.
6. **Remove obsolete behavior.** Reassess the “Lanjutkan” shortcut and old 6.6-second keyframes; keep a skip action only if it can complete the transition cleanly.

## Verification

- Test the full sequence on desktop and narrow/mobile viewports; verify the original page is fully covered before card reveal.
- Confirm the card is visible long enough to read, then navigation lands on `/undangan` without a blank or flashing frame.
- Test reduced-motion preferences, Escape, repeated activation, and the skip/continue action if retained.
- Run the project’s lint/build checks after implementation.
