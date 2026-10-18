import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createChallenge, verifyChallenge, containsBlockedLanguage } from "../lib/rsvp-security.ts";

process.env.RSVP_CAPTCHA_SECRET ||= "test-only-secret-that-is-at-least-32-characters-long";

describe("RSVP CAPTCHA", () => {
  it("accepts a valid answer and rejects wrong or malformed answers", () => {
    const challenge = createChallenge();
    const numbers = challenge.question.match(/\d+/g) || [];
    const answer = numbers.reduce((sum, value) => sum + Number(value), 0);
    assert.equal(verifyChallenge(challenge.token, String(answer)), true);
    assert.equal(verifyChallenge(challenge.token, String(answer + 1)), false);
    assert.equal(verifyChallenge("malformed", String(answer)), false);
  });
});

describe("moderation filter", () => {
  it("normalizes text and matches reviewed English and Indonesian entries", () => {
    assert.equal(containsBlockedLanguage("FUCK!", "notes"), true);
    assert.equal(containsBlockedLanguage("b a n g s a t", "name"), true);
    assert.equal(containsBlockedLanguage("ordinary message", "notes"), false);
  });

  it("keeps benign substrings, names, and email addresses", () => {
    assert.equal(containsBlockedLanguage("Scunthorpe", "name"), false);
    assert.equal(containsBlockedLanguage("classic@example.com", "email"), false);
    assert.equal(containsBlockedLanguage("assistant", "notes"), false);
    assert.equal(containsBlockedLanguage("Ayu Sari", "name"), false);
  });
});
