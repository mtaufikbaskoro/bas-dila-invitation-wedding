export type SearchParamsLike =
  | Record<string, string | string[] | undefined>
  | { [key: string]: string | string[] | undefined }
  | { to?: string | string[] }
  | null
  | undefined;

const KNOWN_NON_GUEST_PARAMS = /^(utm_|fbclid|gclid|ref|source|lang|theme|debug|v|page|sort|filter)/i;

/**
 * Sanitizes and normalizes a guest name:
 * - Removes control characters
 * - Normalizes consecutive spaces
 * - Trims leading/trailing whitespace
 * - Slices to max 100 characters
 */
export function sanitizeGuestName(name: string | undefined | null): string {
  if (!name) return "";
  return name
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

/**
 * Parses and reconstructs the guest name from search parameters.
 *
 * Handles:
 * 1. Standard single name: `?to=Nabila Sagita`
 * 2. Proper percent-encoded ampersand: `?to=Nabila Sagita %26 Partner`
 * 3. Unencoded ampersand in URLs: `?to=Nabila Sagita & Partner`
 *    Where URL parsers split by `&`, turning " Partner" into a separate key with an empty value.
 * 4. Multiple unencoded ampersands: `?to=Nabila Sagita & Partner & Family`
 * 5. Repeated parameter arrays: `?to=Nabila Sagita&to=Partner`
 */
export function getGuestName(
  params?: SearchParamsLike | string | string[]
): string {
  if (!params) return "";

  if (typeof params === "string") {
    return sanitizeGuestName(params);
  }

  if (Array.isArray(params)) {
    return sanitizeGuestName(
      params
        .map((p) => (typeof p === "string" ? p.trim() : ""))
        .filter(Boolean)
        .join(" & ")
    );
  }

  const entries = Object.entries(params);
  const toEntryIndex = entries.findIndex(([key]) => key.trim().toLowerCase() === "to");

  if (toEntryIndex === -1) {
    return "";
  }

  const [, toValue] = entries[toEntryIndex];
  const baseParts: string[] = [];

  if (Array.isArray(toValue)) {
    baseParts.push(...toValue.map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean));
  } else if (typeof toValue === "string" && toValue.trim()) {
    baseParts.push(toValue.trim());
  }

  // Check if subsequent keys were created by unencoded '&' in the URL query string
  // (e.g. ?to=Nabila Sagita & Partner creates { to: "Nabila Sagita ", " Partner": "" })
  const additionalParts: string[] = [];
  for (let i = toEntryIndex + 1; i < entries.length; i++) {
    const [rawKey, val] = entries[i];
    const key = rawKey.trim();

    // A key is part of the split parameter if it has no value (empty string or undefined)
    const isValueless = val === "" || val === undefined;
    const isKnownParam = KNOWN_NON_GUEST_PARAMS.test(key);

    if (isValueless && !isKnownParam && key.length > 0) {
      additionalParts.push(key);
    } else {
      // Stopped by a param that has a value or is an explicit tracking/system param
      break;
    }
  }

  const allParts = [...baseParts, ...additionalParts];
  if (allParts.length === 0) return "";

  // Combine parts with '&' and normalize whitespace around ampersands
  const combined = allParts.join(" & ");
  const normalized = combined
    .replace(/\s*&\s*/g, " & ")
    .replace(/(?:^ & | & $)/g, "");

  return sanitizeGuestName(normalized);
}

/**
 * Extracts and reconstructs the guest name directly from a raw query string
 * (e.g. `window.location.search`).
 */
export function getGuestNameFromQueryString(search: string): string {
  if (!search) return "";
  const query = search.startsWith("?") ? search.slice(1) : search;
  if (!query) return "";

  const sp = new URLSearchParams(query);
  const params: Record<string, string | string[]> = {};
  for (const [key, val] of sp.entries()) {
    if (key in params) {
      const existing = params[key];
      if (Array.isArray(existing)) {
        existing.push(val);
      } else {
        params[key] = [existing, val];
      }
    } else {
      params[key] = val;
    }
  }

  return getGuestName(params);
}
