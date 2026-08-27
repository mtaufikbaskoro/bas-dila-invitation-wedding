This is a Next.js 16 App Router wedding invitation based on the Ethereal Celebration Stitch design.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000). The invitation is split into `/`, `/cerita`, `/acara`, `/galeri`, and `/rsvp`.

## Local wedding images

Replace the placeholder SVG files in `public/images/wedding/` with your own images while keeping the same filenames:

- `hero.svg`: home and event header
- `rsvp.svg`: RSVP header and gallery item
- `story-coffee.svg`, `story-mountain.svg`, `story-proposal.svg`: story timeline
- `gallery-portrait.svg`, `gallery-detail.svg`: gallery items
- `map.svg`: event location map

The components use these paths directly, so replacing a file does not require code changes. JPG, PNG, or WebP files are also supported when the corresponding path in the component is updated.

The RSVP form currently demonstrates local validation and success state only. Its submit boundary can later be connected to a server action or API.

The project uses `next/font` to load Playfair Display and Plus Jakarta Sans.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
