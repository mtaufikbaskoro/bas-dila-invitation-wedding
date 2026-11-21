import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getGuestName, getGuestNameFromQueryString, sanitizeGuestName } from "../lib/guest.ts";

describe("guest name parser", () => {
  it("parses unencoded ampersand split query parameters (?to=Nabila Sagita & Partner)", () => {
    // When URL is ?to=Nabila Sagita & Partner, Next.js / URL parser generates:
    const params = { to: "Nabila Sagita ", " Partner": "" };
    assert.equal(getGuestName(params), "Nabila Sagita & Partner");
  });

  it("parses multiple unencoded ampersands (?to=Nabila Sagita & Partner & Family)", () => {
    const params = { to: "Nabila Sagita ", " Partner ": "", " Family": "" };
    assert.equal(getGuestName(params), "Nabila Sagita & Partner & Family");
  });

  it("parses correctly encoded ampersand (?to=Nabila Sagita %26 Partner)", () => {
    const params = { to: "Nabila Sagita & Partner" };
    assert.equal(getGuestName(params), "Nabila Sagita & Partner");
  });

  it("parses array to parameter (?to=Nabila Sagita&to=Partner)", () => {
    const params = { to: ["Nabila Sagita", "Partner"] };
    assert.equal(getGuestName(params), "Nabila Sagita & Partner");
  });

  it("ignores tracking query parameters that follow the guest name", () => {
    const params = {
      to: "Nabila Sagita ",
      " Partner": "",
      utm_source: "whatsapp",
      fbclid: "abcdef123",
    };
    assert.equal(getGuestName(params), "Nabila Sagita & Partner");
  });

  it("handles simple single guest names", () => {
    assert.equal(getGuestName({ to: "Nabila Sagita" }), "Nabila Sagita");
    assert.equal(getGuestName({ to: "  Budi Santoso  " }), "Budi Santoso");
  });

  it("handles empty or missing parameters", () => {
    assert.equal(getGuestName({}), "");
    assert.equal(getGuestName(undefined), "");
    assert.equal(getGuestName({ to: "" }), "");
  });

  it("parses client-side query strings via getGuestNameFromQueryString", () => {
    assert.equal(getGuestNameFromQueryString("?to=Nabila Sagita & Partner"), "Nabila Sagita & Partner");
    assert.equal(getGuestNameFromQueryString("?to=Nabila%20Sagita%20&%20Partner"), "Nabila Sagita & Partner");
    assert.equal(getGuestNameFromQueryString("?to=Nabila%20Sagita%20%26%20Partner"), "Nabila Sagita & Partner");
    assert.equal(getGuestNameFromQueryString("?to=Nabila%20Sagita%20&%20Partner&utm_source=wa"), "Nabila Sagita & Partner");
    assert.equal(getGuestNameFromQueryString(""), "");
  });

  it("sanitizes control characters and enforces length limits", () => {
    assert.equal(sanitizeGuestName("Budi\u0000\u001f"), "Budi");
    const longName = "A".repeat(150);
    assert.equal(sanitizeGuestName(longName).length, 100);
  });
});
