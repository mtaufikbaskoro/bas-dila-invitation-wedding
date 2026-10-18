import { createHmac, randomInt, randomUUID, timingSafeEqual } from "node:crypto";

const challengeLifetimeSeconds = 5 * 60;
const signingSecret = () => {
  const secret = process.env.RSVP_CAPTCHA_SECRET || (process.env.NODE_ENV !== "production" ? "local-development-only-rsvp-captcha-secret" : undefined);
  if (!secret || secret.length < 32) throw new Error("RSVP_CAPTCHA_SECRET must contain at least 32 characters");
  return secret;
};

export type ChallengePayload = { answer: number; expires: number; id: string };

function sign(payload: string) {
  return createHmac("sha256", signingSecret()).update(payload).digest("base64url");
}

export function createChallenge() {
  const left = randomInt(1, 10);
  const right = randomInt(1, 10);
  const payload = Buffer.from(JSON.stringify({ answer: left + right, expires: Math.floor(Date.now() / 1000) + challengeLifetimeSeconds, id: randomUUID() } satisfies ChallengePayload)).toString("base64url");
  return { question: `${left} + ${right} = ?`, token: `${payload}.${sign(payload)}` };
}

export function verifyChallenge(token: unknown, answer: unknown): boolean {
  if (typeof token !== "string" || token.length > 512 || typeof answer !== "string" || !/^\d{1,2}$/.test(answer)) return false;
  const parts = token.split(".");
  if (parts.length !== 2 || !/^[A-Za-z0-9_-]+$/.test(parts[0]) || !/^[A-Za-z0-9_-]+$/.test(parts[1])) return false;
  try {
    const expected = Buffer.from(sign(parts[0]));
    const actual = Buffer.from(parts[1]);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;
    const payload = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8")) as ChallengePayload;
    return Number.isInteger(payload.answer) && Number.isInteger(payload.expires) && typeof payload.id === "string" && payload.expires >= Math.floor(Date.now() / 1000) && Number(answer) === payload.answer;
  } catch {
    return false;
  }
}

const blockedEnglish = ["asshole", "bastard", "bitch", "fuck", "shit", "stupid"];
const blockedIndonesian = ["anjing", "bangsat", "brengsek", "kontol", "memek", "tolol"];
const allowlist = new Set(["Scunthorpe"]);

export function containsBlockedLanguage(value: string, field: "name" | "email" | "notes") {
  const normalized = value.normalize("NFKC").toLocaleLowerCase("id-ID");
  if (field === "name" && allowlist.has(value.normalize("NFKC"))) return false;
  const words = [...blockedEnglish, ...blockedIndonesian];
  return words.some((word) => {
    const pattern = [...word].map((character) => `${character}(?:[\\s._!*\\-]*)`).join("");
    const boundary = field === "email" ? "(?<![\\p{L}\\p{N}])" + pattern + "(?![\\p{L}\\p{N}])" : "(?<![\\p{L}\\p{N}])" + pattern + "(?![\\p{L}\\p{N}])";
    return new RegExp(boundary, "iu").test(normalized);
  });
}
