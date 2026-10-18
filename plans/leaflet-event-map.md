# Leaflet Event Map Plan

## Goal

Replace the static map illustration in the event section with an interactive Leaflet map centered on the existing Google Maps location pin. Keep the existing Google Maps links as a reliable way to open directions externally.

## Current state

- `components/invitation-shell.tsx` renders `wedding.images.map` (`/images/wedding/map.svg`) in a fixed-height map placeholder.
- Both event cards link to the same Google Maps place and pin.
- The pin coordinates are **latitude 2.8983231, longitude 98.8876945** (Simalungun, Indonesia).
- `lib/wedding.ts` contains event data and `mapUrl`; there are currently no Leaflet dependencies.

## Implementation plan

1. **Add Leaflet packages.** Install `leaflet` and `react-leaflet`, and add the matching Leaflet type package if needed by the installed package versions and TypeScript setup. Commit the lockfile update with the dependency changes.
2. **Make the map location explicit in wedding data.** Add a typed coordinate pair for the venue in `lib/wedding.ts`, using `[2.8983231, 98.8876945]` in Leaflet's required `[latitude, longitude]` order. Keep the existing event `mapUrl` values for external navigation. Avoid parsing coordinates from the long Google URL at runtime.
3. **Create a client-side map component.** Add a focused component such as `components/event-map.tsx` marked as a client component. Render a `MapContainer`, OpenStreetMap tile layer with visible attribution, and a marker centered on the configured venue coordinates. Give the map a descriptive accessible label and marker popup/label using the venue name/address.
4. **Load it safely in the invitation page.** Leaflet depends on browser APIs and its default marker assets may not resolve automatically in the Next.js bundle. Dynamically load the map component from `components/invitation-shell.tsx` with server rendering disabled, or use the equivalent supported client-only boundary for this project's Next.js version. Explicitly import Leaflet's CSS in the appropriate client/global stylesheet and account for the project's CSS setup.
5. **Replace the static placeholder.** Swap the `Image` map block in the event section for the map component, preserving its existing responsive width, rounded corners, and 16rem height. Add Leaflet-specific CSS to ensure the map fills the container and layers/controls render above the page decoration.
6. **Keep the external map action.** Leave each “Lihat Peta” anchor connected to the existing Google Maps URL so visitors can open navigation in Google Maps. The map itself should focus on the same pin as those links.
7. **Handle loading and failures gracefully.** Reserve the map's full dimensions before hydration to prevent layout shift. Provide a simple fallback with the venue name and Google Maps link if the interactive map cannot load. Respect reduced motion if any map animation or fly-to behavior is added; avoid unnecessary auto-zoom animation.

## Verification

- Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- Confirm the map renders at the location corresponding to the existing Google Maps pin, with the marker in the expected position and tile attribution visible.
- Check mobile and desktop layouts, map controls/panning, and that the fixed-height container clips no Leaflet controls.
- Verify the map works on direct load and navigation to `/undangan`, with no server-side `window`/`document` errors or marker asset 404s.
- Confirm both event-card Google Maps links remain functional and the fallback remains readable if map tiles are unavailable.
