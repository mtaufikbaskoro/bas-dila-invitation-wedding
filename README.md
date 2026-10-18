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

### Gallery

Add gallery photos to `public/gallery/`. Supported formats are JPG, JPEG, PNG, WebP, AVIF, and SVG. Every supported image file in this folder is displayed automatically on `/galeri`; no code changes are needed.

Use simple filenames without slashes, and keep each file directly inside `public/gallery/`. Hidden files, unsupported files, and subfolders are ignored. The folder is scanned by the Next.js server when the gallery page is requested, so files added during development appear after refreshing the page.

Replace the placeholder SVG files in `public/images/wedding/` with your own images while keeping the same filenames:

- `hero.svg`: home and event header
- `rsvp.svg`: RSVP header and gallery item
- `story-coffee.svg`, `story-mountain.svg`, `story-proposal.svg`: story timeline
- `gallery-portrait.svg`, `gallery-detail.svg`: original gallery items
- `map.svg`: event location map

The remaining components use these paths directly, so replacing a file does not require code changes. The gallery uses the separate `public/gallery/` folder described above. On deployments where files are packaged at build time, add the images before building or redeploy after adding new images.

## RSVP submissions

RSVPs are submitted to this project's Next.js Node.js runtime. Configure `DATABASE_URL` for MySQL and `RSVP_CAPTCHA_SECRET` to a private random value of at least 32 characters (generate one with `openssl rand -base64 32`). In non-production local development only, the CAPTCHA uses a fixed development secret if the environment variable is absent. Production requires the secret to be configured. The arithmetic challenge is first-party and expires after five minutes. Challenges are stateless and can be replayed until expiry; in-memory rate limits are per process and reset on restart.

Validated responses are stored in MySQL through Prisma. Set `DATABASE_URL`, then run `npm run db:generate` and `npm run db:migrate` to create/update the `rsvps` table. Each normalized email has one RSVP; subsequent submissions update the existing record.

The server checks curated English and Indonesian terms in names, email addresses, and notes. The initial list is project-maintained and deliberately small; it is a moderation aid rather than a complete language inventory. Review it periodically for false positives and regional usage. Values are validated, stored as data, and rendered through React's escaped text handling.

The runtime rate limit is 10 submission attempts per 10 minutes per observed client IP; a reverse proxy must provide a trustworthy `x-forwarded-for` header. Request bodies are capped at 8 KiB and cross-origin submissions are rejected.

The project uses `next/font` to load Playfair Display and Plus Jakarta Sans.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
