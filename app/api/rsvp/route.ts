import { createHash } from "node:crypto";
import { containsBlockedLanguage, verifyChallenge } from "@/lib/rsvp-security";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const limits = new Map<string, { count: number; start: number }>();
const maxBodyBytes = 8_192;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try { if (new URL(origin).origin !== new URL(request.url).origin) return Response.json({ error: "Unable to submit. Please try again." }, { status: 403 }); }
    catch { return Response.json({ error: "Unable to submit. Please try again." }, { status: 403 }); }
  }
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maxBodyBytes) return Response.json({ error: "Unable to submit. Please try again." }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  const bucket = limits.get(key);
  if (bucket && now - bucket.start < 10 * 60_000 && bucket.count >= 10) return Response.json({ error: "Unable to submit. Please try again later." }, { status: 429 });
  limits.set(key, bucket && now - bucket.start < 10 * 60_000 ? { ...bucket, count: bucket.count + 1 } : { start: now, count: 1 });

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) return Response.json({ error: "Unable to submit. Please try again." }, { status: 413 });
    body = JSON.parse(rawBody);
  } catch { return Response.json({ error: "Unable to submit. Please try again." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "Unable to submit. Please try again." }, { status: 400 });
  const data = body as Record<string, unknown>;
  const allowedFields = new Set(["name", "email", "attendance", "notes", "answer", "challengeToken"]);
  const keys = Object.keys(data);
  if (keys.length !== allowedFields.size || keys.some((key) => !allowedFields.has(key))) return Response.json({ error: "Please review your details and try again." }, { status: 400 });
  if (Object.entries(data).some(([keyName, value]) => keyName !== "attendance" && typeof value !== "string")) return Response.json({ error: "Please review your details and try again." }, { status: 400 });
  const name = (data.name as string).normalize("NFKC").trim();
  const email = (data.email as string).normalize("NFKC").trim();
  const notes = (data.notes as string).normalize("NFKC").trim();
  if (name.length < 1 || name.length > 100 || email.length < 3 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || notes.length > 1000 || !["attending", "declining"].includes(data.attendance as string)) return Response.json({ error: "Please review your details and try again." }, { status: 400 });
  if (!verifyChallenge(data.challengeToken, data.answer)) return Response.json({ error: "Confirmation could not be verified. Please try again." }, { status: 400 });
  if (containsBlockedLanguage(name, "name") || containsBlockedLanguage(email, "email") || containsBlockedLanguage(notes, "notes")) return Response.json({ error: "Please revise the text in your response and try again." }, { status: 400 });
  try {
    await prisma.rsvp.upsert({
      where: { email: email.toLocaleLowerCase("en-US") },
      create: { name, email: email.toLocaleLowerCase("en-US"), attendance: data.attendance as "attending" | "declining", notes },
      update: { name, attendance: data.attendance as "attending" | "declining", notes },
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unable to save your response right now. Please try again." }, { status: 500 });
  }
}
