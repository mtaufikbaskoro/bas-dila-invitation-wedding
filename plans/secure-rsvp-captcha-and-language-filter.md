# Secure RSVP, CAPTCHA, and input-language filtering plan

## Goals

- Make the attendance-confirmation form submit to a trusted server-side handler and persist valid responses.
- Add bot protection implemented entirely inside this Next.js project, without a CAPTCHA vendor, external verification service, separate CAPTCHA server, account, or API key.
- Reject abusive/offensive language in user-editable text fields, using maintainable English and Indonesian word lists.
- Treat input filtering as a moderation measure, not as protection from injection. Keep server-side validation, parameterized persistence, and safe output encoding regardless of CAPTCHA or word-list results.

## CAPTCHA recommendation: first-party challenge in this Next.js project

Implement a small CAPTCHA directly in the application. The browser displays the challenge, while the same Next.js application generates and verifies it on the server. It must not call an external CAPTCHA service or a separate CAPTCHA server.

Recommended initial challenge: a simple, accessible arithmetic question with randomized operands and a short expiration. Generate the expected answer server-side and bind it to a signed, time-limited token using a server-only secret. The client receives the prompt and signed token, but not the expected answer. On RSVP submission, the server verifies the token, expiration, and submitted answer before processing the RSVP. Use a cryptographically secure random generator for challenge creation and a constant-time signature comparison where applicable.

Implementation outline:

1. Add a same-origin Next.js route or server action to issue a challenge. It returns only the question and a signed, short-lived token.
2. Keep the signing secret on the server in an environment variable; generate and document it for deployment. Never include it in client bundles.
3. Add an answer input to the RSVP form and submit its value and challenge token with the RSVP.
4. Verify the signature, expiry, token format, and answer server-side before filtering or persistence. Reject missing, malformed, expired, or incorrect challenges with a generic retry message.
5. Prevent replay where practical, for example by using a one-time challenge identifier stored with a short TTL in the application's existing persistence/rate-limit store. If no shared store is available, document that stateless signed challenges can be reused until expiration and rely on rate limits as well.
6. Keep request-size limits, same-origin/origin checks where applicable, and rate limiting. The challenge is an abuse layer, not a replacement for these controls.
7. Provide accessible instructions and error/retry states. Do not show success until the RSVP is persisted.

This design needs a server runtime for the Next.js application, but no separate CAPTCHA host or external CAPTCHA connection. It is a modest bot deterrent, not a guarantee: automated clients can solve simple arithmetic. If abuse is observed, increase challenge difficulty or use an in-project proof-of-work challenge, still generated and verified by the application itself. A static-only deployment cannot securely verify a CAPTCHA; the submission needs a trusted server-side runtime in the same project.

## Profanity and offensive-language filter

### Scope and realistic guarantee

There is no complete, universally agreed list of every offensive word in English or Bahasa Indonesia. Lists differ by region and context, and new spellings, slang, code-switching, transliteration, spacing, punctuation, and intentional misspellings can evade matching. The feature should be described as a maintained filter that blocks known terms, not as a guarantee that all offensive content is impossible.

### Sources and maintenance

- Use a maintained English word list and a separately reviewed Bahasa Indonesia list. Candidate English source: `LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words`; it is licensed CC-BY-4.0, so retain attribution and license information if its data is incorporated.
- Review source data before adoption, including scope, quality, false positives, update cadence, and licensing. Do not assume a third-party list is complete or appropriate for Indonesian usage.
- Create a project-owned, versioned word-list data file with source/attribution and a documented review process. Prefer curated data over downloading a mutable remote list at runtime.
- Maintain a separate allowlist/exception process only when a demonstrated false positive needs it; do not allow user-controlled allowlist entries.

### Fields and matching behavior

- Apply the same server-side text policy to every free-text RSVP field: name, email (only where a match is clearly a standalone offensive token; avoid rejecting ordinary address substrings), and notes. Attendance choices are fixed enum values, not user-authored text.
- Apply checks on the server as the authoritative boundary. Optionally mirror them in the client for immediate feedback, but never rely on client checks.
- Trim inputs and enforce per-field length and format limits before matching. Normalize Unicode (NFKC), case-fold, normalize common separators, and use Unicode-aware token boundaries.
- Match whole words/known variants rather than naïve substring matching, to reduce accidental rejection of legitimate names and email addresses. Add carefully scoped checks for common punctuation/spacing obfuscation without collapsing text so aggressively that ordinary names become false positives.
- Do not mutate or silently censor user text. Reject the submission with a neutral message and ask the guest to revise it.
- Keep filtering separate from injection defenses: validate field types/lengths/enums, use parameterized database operations, and render stored strings as escaped text.

### Testing and operations

- Add focused tests for representative reviewed English and Indonesian entries, capitalization, Unicode normalization, punctuation/spacing variants, and word-boundary behavior.
- Add false-positive tests for ordinary Indonesian and English names, email addresses, and benign words that contain similar substrings.
- Test direct requests to the server action/route to ensure client-side bypass does not bypass filtering.
- Do not include explicit offensive terms in test names or public error messages; use fixture references or safely isolated test data.
- Review and update the lists periodically, recording provenance, license, and changes. Keep the lists private to server code where practical so the full blocked vocabulary is not unnecessarily exposed to automated probing.

## RSVP submission and persistence work

1. Select and configure the persistence backend before implementation; keep credentials in environment variables.
2. Add a server-only submission boundary shared by both RSVP entry points (`/undangan` and the invitation shell).
3. Validate the exact accepted fields (`name`, `email`, `attendance`, `notes`), lengths, and attendance enum on the server; reject unknown or malformed values.
4. Verify the first-party CAPTCHA token and answer, enforce rate limits and request-size limits, apply the text filter, then persist validated data using parameterized database/ORM calls.
5. Decide duplicate policy (for example, update the existing RSVP by normalized email) and encode it in a database constraint/transaction where appropriate.
6. Update the form to show submitting, success, and error states; preserve entries on failure, disable repeated submits while pending, and announce status accessibly.
7. Return generic client-facing errors; avoid leaking database details, whether an email already exists, CAPTCHA internals, or stack traces.

## Verification checklist

- Valid attending and declining RSVPs persist and show success only after persistence succeeds.
- Invalid/missing fields, excessive lengths, unsupported attendance values, unknown fields, and invalid CAPTCHA tokens/answers are rejected server-side.
- CAPTCHA signature validation, expiration, incorrect answers, malformed tokens, and replay behavior are verified.
- The browser makes no requests to external CAPTCHA or verification services; challenge generation and verification run through this project's Next.js server runtime.
- Rate limits and body-size limits reject abusive submissions.
- Reviewed English and Indonesian terms are rejected in free-text fields; benign names, email addresses, and substring lookalikes remain accepted.
- Unicode, punctuation, spacing, and case variants are covered, with documented limitations for deliberate evasions.
- Database operations are parameterized, and stored user content is safely rendered as text.
- Both RSVP entry points use the same submission logic.
- Run `npm run lint` and `npm run build`, plus direct HTTP/server-handler tests for malformed and abusive requests.
