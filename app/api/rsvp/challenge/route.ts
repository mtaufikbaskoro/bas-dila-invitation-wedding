import { createChallenge } from "@/lib/rsvp-security";

export const runtime = "nodejs";

export async function GET() {
  try {
    return Response.json(createChallenge(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Unable to prepare confirmation." }, { status: 503 });
  }
}
